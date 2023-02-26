from pydantic import BaseModel


class ParseUserJournalRequest(BaseModel):
    userId: str = ""
    content: str = ""
