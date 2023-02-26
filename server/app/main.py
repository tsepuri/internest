import uvicorn
from fastapi import FastAPI

from dependencies import get_token_header
from routers import clerk, user
from es_client import get_es_client

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/{user_id}/graph-map")
async def get_user_graph_map():
    """
    get all nested document related to user
    :return:
    """
    pass
    return {"graph-map": "something"}


@app.post("/journal")
async def create_user_journal():
    """
    create new journal in graphmap
    :return:
    """
    pass
    return {"something": "something"}



@app.post("/keyword")
async def create_keyword_docs_in_es():
    """
    Store keywords in journal docs in elasticsearch server
    :return:
    """
    user_id = "Ike"
    doc_id = "doc123"

    es_client = get_es_client()
    keywords = ["people", "food", "place", "emotion", "self-improvement"]
    es_client.create_keyword_doc(user_id, doc_id, keywords)
    return None


@app.get("/keyword")
async def get_similar_keywords_in_es():
    es_client = get_es_client()
    keywords = ["fireman", "pasta"]
    result = es_client.get_relevant_doc_bulk(keywords, 5)
    return result

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

