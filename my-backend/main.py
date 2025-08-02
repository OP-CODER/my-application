from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Only static data here; timestamps will be injected per request
items = [
    {"id": 1, "name": "Item One", "source": "Backend FastAPI"},
    {"id": 2, "name": "Item Two", "source": "Backend FastAPI"},
    {"id": 3, "name": "Item Three", "source": "Backend FastAPI"}
]

class Item(BaseModel):
    name: str
    value: int

@app.get("/items")
def get_items():
    # Inject fresh timestamp for every item on every request
    return [
        {**item, "timestamp": str(datetime.now())}
        for item in items
    ]

@app.post("/items")
def create_item(item: Item):
    new_item = {
        "id": len(items) + 1,
        "name": item.name,
        "value": item.value,
        "source": "Backend FastAPI",
        "timestamp": str(datetime.now())
    }
    items.append(new_item)
    return {"message": "Item added from backend!", "item": new_item}
