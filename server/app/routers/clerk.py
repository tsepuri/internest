from fastapi import APIRouter, HTTPException
import requests
import os
import json
from dotenv import load_dotenv
from app.db.models import User
from app.util.types import InternalUser

load_dotenv()
router = APIRouter(
    prefix="/clerk",
    responses={404: {"description": "Not found"}},
)

headers = {"Authorization": f"Bearer {os.getenv('CLERK_SECRET_TOKEN')}"}
@router.post("/{session_id}/verify")
async def verifyClerk(session_id:str, token:str, inputUserID:str):
    res = requests.post(f"https://api.clerk.dev/v1/sessions/{session_id}/verify", json={
        'token': token
    }, headers=headers)
    content = json.loads(res.content)
    print(content)
    if 'user_id' in content and content['user_id'] == inputUserID:
        return True
    else:
        raise HTTPException(status_code=401, detail="Unauthorized")

@router.get("/users/{user_id}")
async def getUser(user_id:str):
    res = requests.get(f"https://api.clerk.dev/v1/users/{user_id}", headers=headers)
    content = json.loads(res.content)
    if "first_name" not in content:
        raise HTTPException(status_code=400, detail="Invalid user ID")
    user = InternalUser(name=content["first_name"]+" "+content["last_name"], email=content["email_addresses"][0]["email_address"], clerk_user_id=user_id)
    return user
