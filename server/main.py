from fastapi import FastAPI

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
