from fastapi import Header, HTTPException
import os
from dotenv import load_dotenv

load_dotenv()
async def get_token_header(Authorization: str = Header()):
    if Authorization.split(" ")[1] != os.getenv("CLERK_SECRET_TOKEN"):
        raise HTTPException(status_code=400, detail="Bearer Token header invalid")