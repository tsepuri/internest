import datetime
import dataclasses
from fastapi import APIRouter, HTTPException
from app.util.types import Session
from app.routers.clerk import verifyClerk

from app.db.db import DB
router = APIRouter(
    prefix="/user",
)

@dataclasses.dataclass
class Entry:
    entry: str
    session: Session

@router.post("/{user_id}/journal")
async def create_user_journal(user_id: str, entry: Entry):
    """
    create new journal in graphmap
    :return:
    """
    print(entry)
    #await verifyClerk(entry.session.sessionId, entry.session.sessionToken, user_id)
    db = DB()
    print(entry.entry)
    objID = await db.insert_journal_entry(user_id, entry.entry)
    # extract keywords
    # ask es server keyword
    ## if score is too low, we can ask ai to categorize
    return {"objectID": objID}

# expected values for time threshold are 1d, 1w or 1m
@router.get("/{user_id}/graph-map")
async def get_user_graph_map(user_id: str):
    """
    get all nested document related to user
    :return:
    """
    pass
    return {"graph-map": "something"}
