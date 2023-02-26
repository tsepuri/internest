from datetime import datetime
from typing import ForwardRef, List

from bson import ObjectId
from pydantic import BaseModel, Field, EmailStr

from db import PyObjectId


class TimestampedModel(BaseModel):
    createdAt: datetime
    updatedAt: datetime


class User(TimestampedModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    email: EmailStr
    graph: list = Field(default_factory=list)

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda dt: dt.isoformat(),
            ObjectId: str
        }
        schema_extra = {
            "exampleUser": {
                "name": "Simba",
                "email": "simba@example.com",
                "graphMap": ["keyword1", {"keyword2": ["keyword3", "keyword4"]}, "keyword5"]
            }
        }

class Journal(TimestampedModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user: User
    content: str

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda dt: dt.isoformat(),
            ObjectId: str
        }
        schema_extra = {
            "exampleJournal": {
                datetime: lambda dt: dt.isoformat(),
                ObjectId: str
            }
        }
        
Keyword = ForwardRef('Keyword')

class Keyword(TimestampedModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user: User
    name: str
    parent: Keyword = None
    journals: List[Journal] = Field(default_factory=list)
    children: List[Keyword] = Field(default_factory=list)

    schema_extra = {
        "exampleKeyword": {
            "name": "restaurant",
            "frequency": 2,
            "parent": "place",
            "journals": ["4309320"],
            "children": ["Chipotle", "BIBIBOP"]
        }
    }



