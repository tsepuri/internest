import os
import asyncio
from dotenv import load_dotenv
import motor.motor_asyncio
from routers.clerk import getUser

load_dotenv()

class DB():
    def __init__(self):
        self.client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGODB_URL"))
        self.db = self.client['db']

    async def insert_journal_entry(self, user_id=str, entry=str):
        existingUser = await self.db.User.find({"clerk_user_id": user_id}).to_list(length=1)
        if len(existingUser) == 0:
            existingUser = await self.create_user(user_id)
        else:
            existingUser = existingUser[0]
        result = await self.db.Journal.insert_one({'user': existingUser, 'content': entry})
        journals = await self.db.Journal.find().to_list(length=2)
        breakpoint()
        print(f"result: {repr(result.inserted_id)}")
    async def create_user(self, user_id:str):
        userObj = await getUser(user_id)
        await self.db.User.insert_one({'name': userObj.name, 'email': userObj.email, 'clerk_user_id': user_id})
        return (await self.db.User.find({"clerk_user_id": user_id}).to_list(length=1))[0]

        
    

db = DB()
asyncio.run(db.insert_journal_entry(user_id="user_2MFXmmQvAZgLxerQ9alstC9RdCm", entry="My first message!"))