from pymongo import MongoClient
from config import MONGO_URI
from datetime import datetime

client = MongoClient(MONGO_URI)
db = client["github_events"]
collection = db["events"]

def save_event(data):
    collection.insert_one(data)

def get_recent_events():
    return list(collection.find().sort("timestamp", -1).limit(20))