import uvicorn
from fastapi import Depends, FastAPI
from app.routers.clerk import verifyClerk
from app.db.db import DB
from app.schemas.requests import ParseUserJournalRequest, RegisterValidatedKeywordsRequest
from app.util.tagging import tag
from app.es_client import get_es_client
from app.routers import clerk, user
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost",
    "http://localhost:3000",
]


app = FastAPI()
app.include_router(clerk.router)
app.include_router(user.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/{user_id}/graph-map")
async def get_user_graph_map():
    """
    get all nested document related to user
    :return:
    """

    return {
        "graph": [
            {"relationship": []},
            {"location" : ["OSU", "Cincinnati"]},
            {"food": []}
        ],
        "frequency": {
            "relationship" : 3,
            "location": 5,
            "OSU": 1,
            "Cincinnati": 2,
            "food": 3
        }
    }


@app.post("/parse-journal")
async def parse_user_journal(request: ParseUserJournalRequest):
    """
    parse user input journal and create journal document.
    extract main keywords in journal and return them to client for user validation.
    :return:
    """
    # user auth(skip)
    print(request)
    user_id, journal_content = request.userId, request.entry
    await verifyClerk(request.session.sessionId, request.session.sessionToken, user_id)
    # openai model extracts keyword from journal
    db = DB()
    objID = await db.insert_journal_entry(user_id, journal_content)
    result = tag.keywords(journal_content)
    return {"extractedKeywords": result.get("keywords")}


@app.post("/validated-keywords")
async def register_validated_keywords(request: RegisterValidatedKeywordsRequest):
    # user auth (skip)
    user_id, keywords = request.userId, request.keywords

    # get similar existing keywords recommendation for decide parent node(categorize)
    es_client = get_es_client()
    result = es_client.get_relevant_doc_bulk(keywords, 1)
    print(result)

    # update keywords and update graphmap
    graph = ["keyword1", {"keyword2": ["keyword3", "keyword4"]}, "keyword5" ]
    frequency = {"keyword1": 3, "keyword2": 1, "keyword3": 5, "keyword4": 1, "keyword5": 1}
    return {
        "graph": graph,
        "frequency": frequency
    }

@app.get("/{user_id}/{keyword}")
async def get_keyword_related_documents(user_id:str, keyword:str):
    db = DB()
    journals = await db.get_keyword_related_journals(user_id, keyword)
    return journals

@app.post("/keyword")
async def create_keyword_docs_in_es():
    """
    Store keywords in journal docs in elasticsearch server
    :return:
    """
    user_id = "Ike"
    doc_id = "doc123"

    es_client = get_es_client()
    keywords = ["entertainment", "sports", "food", "work", "relationship", "location"]
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

