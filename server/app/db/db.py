import datetime
import os

from dotenv import load_dotenv
import motor.motor_asyncio

from routers.clerk import getUser
from db.models import Keyword, User, Journal

load_dotenv()

class DB():
    def __init__(self):
        self.client = motor.motor_asyncio.AsyncIOMotorClient(os.getenv("MONGODB_URL"))
        self.db = self.client['db']

    async def insert_journal_entry(self, user_id=str, entry=str) -> str:
        user = await self.get_or_create_user(user_id)
        result = await self.db.Journal.insert_one({
            'user': user,
            'content': entry,
        })
        return repr(result.inserted_id)

    async def get_or_create_user(self, user_id: str) -> User:
        user = await self.db.User.find({"clerk_user_id": user_id}).to_list(length=1)
        if len(user) == 0:
            user = await self.create_user(user_id)
        else:
            user = user[0]
        return user

    async def create_user(self, user_id:str):
        userObj = await getUser(user_id)
        await self.db.User.insert_one({'name': userObj.name, 'email': userObj.email, 'clerk_user_id': user_id})
        return (await self.db.User.find({"clerk_user_id": user_id}).to_list(length=1))[0]

    async def get_keyword_related_journals(self, user_id:str, keyword:str):
        user = await self.get_or_create_user(user_id)
        journals = await self.db.Keyword.find_all(
            {'user':user, 'name':keyword},
            {'journals': 1}
        )
        return journals

    async def insert_keyword(self, user_id:str, name:str, journal:Journal=None, parent:Keyword=None):
        user = await self.get_or_create_user(user_id)
        keywordObj = await self.db.Keyword.find({"user": user, "name": name}).limit(1)
        if len(keywordObj) == 0:
            result = await self.create_keyword(user, name, journal, parent)
            if parent is not None:
                parent.children.append(keywordObj)
                await self.update_keyword(parent)
        else:
            keywordObj.frequency += 1
            keywordObj.journals.append(journal)
            result = await self.update_keyword(keywordObj)
        return result

    async def create_keyword(self, user:User, name:str, journal:Journal, parent:Keyword=None) -> str:
        result = await self.db.User.insert_one({
            'user': user,
            'name': name,
            'frequency': 1,
            'parent': parent,
            'journals': [journal],
            'mentions': [journal.createdAt]
        })
        return result.inserted_id
    
    async def update_keyword(self, keywordObj: Keyword):
        result = await self.db.Keyword.replace_one(
            {'_id': keywordObj.id}, # filter for get origin one
            {
                'frequency': keywordObj.frequency,
                'journals': keywordObj.journals,
                'children': keywordObj.children,
                'mentions': keywordObj.mentions,
            }
        )
        return result.updated_id

    
    async def get_graph(self, user_id=str, time_threshold=datetime):
        user = await self.db.User.find({'_id': user_id})
        filter = {"mentions": {"$gte": time_threshold}}
        keywords = await self.db.Keyword.find_all(filter)
        # we have to join graph column with time filter
        return user['graph']


        
    

#db = DB()
#asyncio.run(db.insert_journal_entry(user_id="user_2MFXmmQvAZgLxerQ9alstC9RdCm", entry="My first message!"))
