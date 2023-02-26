from typing import List

from pydantic import BaseModel


class ParseUserJournalRequest(BaseModel):
    userId: str = ""
    content: str = ""

class RegisterValidatedKeywordsRequest(BaseModel):
    userId: str = ""
    keywords: List[str]
