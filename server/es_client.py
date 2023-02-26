from functools import lru_cache
from typing import List

import numpy as np
from elasticsearch import Elasticsearch

from app.util.tagging import nlp


class ElasticsearchClient:
    es_server: Elasticsearch
    index_name = "keywords"

    def __init__(self, es_host: str = "localhost", es_port: int = 9200):
        super().__init__()
        self.es_server = Elasticsearch(f"http://{es_host}:{es_port}")

    def _create_word_vec(self, keyword: str) -> np.array:
        return nlp.vocab[keyword].vector

    def _create_word_vecs(self, keywords: List[str]) -> List[np.array]:
        word_vecs = [ self._create_word_vec(keyword) for keyword in keywords ]
        return word_vecs

    def _get_structured_search_query(self, query_vector: np.array, topk: int) -> dict:
        query = {
            "query": {
                "script_score": {
                    "query": {"match_all": {}},
                    "script": {
                        "source": "dotProduct(params.query_vector, doc['dense_vector'])",
                        "params": {
                            "query_vector": query_vector
                        }
                    }
                }
            },
            "sort": "_score",
            "size": topk  # Limits the size of the result to 5
        }
        return query

    def _request_search(self, index_name: str, query: dict, topk: int) -> List[int]:
        result = self.es_server.search(index=index_name, body=query, size=topk)
        keyword_recommendations = []
        for hit in result["hits"]["hits"]:
            source = hit["_source"]
            keyword_recommendations.append({
                "score": hit["_score"],
                "doc_id": source["doc_id"],
                "keyword": source["keyword"]
            })
        return keyword_recommendations

    def get_relevant_doc_bulk(self, keywords: List[str], topk: int) -> np.ndarray:
        relevant_docs = []
        for keyword in keywords:
            query_vector = self._create_word_vec(keyword)
            structured_query = self._get_structured_search_query(query_vector, topk)
            doc_indices = self._request_search(self.index_name, query=structured_query, topk=topk)
            relevant_docs.append(doc_indices)
        # return np.array(list(map(int, relevant_docs)))
        return relevant_docs

    def create_keyword_doc(self, user_id: str, doc_id: str, keywords: List[str]) -> dict:
        word_vecs = self._create_word_vecs(keywords)
        mapping = {
          "mappings" : {
              "properties" : {
                  "doc_id" : {
                      "type" : "text"
                  },
                  "user_id" : {
                      "type" : "text"
                  },
                  "keyword": {
                      "type": "keyword",
                      "ignore_above": 256
                  },
                  "dense_vector": {
                      "type": "dense_vector",
                      "dims": 300
                  }
              }
          }
        }
        if not self.es_server.indices.exists(index=self.index_name):
            self.es_server.indices.create(index=self.index_name, body=mapping)
        for i, keyword in enumerate(keywords):
            doc = {
                "doc_id": "abcde",
                "user_id": user_id,
                "keyword": keyword,
                "dense_vector": word_vecs[i]
            }

            self.es_server.index(index=self.index_name, body=doc)

@lru_cache
def get_es_client():
    es_client = ElasticsearchClient()
    return es_client
