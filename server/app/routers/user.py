from fastapi import APIRouter, HTTPException
router = APIRouter(
    prefix="/user",
)


@router.post("/{user_id}/journal")
async def create_user_journal(user_id: str, entry: str):
    """
    create new journal in graphmap
    :return:
    """
    print()
    pass
    return {"something": "something"}

@router.get("/{user_id}/graph-map")
async def get_user_graph_map(user_id: str):
    """
    get all nested document related to user
    :return:
    """
    pass
    return {"graph-map": "something"}