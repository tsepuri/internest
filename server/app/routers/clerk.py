from fastapi import APIRouter, HTTPException
import requests
import os
from dotenv import load_dotenv

load_dotenv()
router = APIRouter(
    prefix="/clerk",
    responses={404: {"description": "Not found"}},
)

headers = {"Authorization": f"Bearer {os.getenv('CLERK_SECRET_TOKEN')}"}
@router.post("/{session_id}/verify")
async def verifyClerk(session_id:str, token:str, inputUserID:str):
    res = await requests.post(f"https://api.clerk.dev/v1/sessions/{session_id}/verify", json={
        'token': token
    }, headers=headers)
    print(res)
    return res.data.user_id == inputUserID

@router.get("/users/{user_id}")
async def getUser(user_id:str):
    res = await requests.get(f"https://api.clerk.dev/v1/users/{user_id}", headers=headers)
    return res
