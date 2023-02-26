from fastapi import FastAPI
from fastapi import Depends, FastAPI

from dependencies import get_token_header
from routers import clerk, user

app = FastAPI(dependencies=[Depends(get_token_header)])


app.include_router(clerk.router)
app.include_router(user.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}



