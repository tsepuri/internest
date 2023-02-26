from typing import List
from util.types import Session
from pydantic import BaseModel


class ParseUserJournalRequest(BaseModel):
    userId: str = ""
    entry: str = ""
    session: Session

class RegisterValidatedKeywordsRequest(BaseModel):
    userId: str = ""
    keywords: List[str]
    session: Session
