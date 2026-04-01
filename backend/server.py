from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class PartnerRequest(BaseModel):
    name: str
    company: str
    phone: str
    email: str
    message: Optional[str] = ""

class CostRequest(BaseModel):
    name: str
    phone: str
    email: str
    service: str
    area: float
    message: Optional[str] = ""

class ContactRequest(BaseModel):
    name: str
    phone: str
    email: str
    message: str


# Routes
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.post("/partner-request")
async def create_partner_request(data: PartnerRequest):
    doc = data.model_dump()
    doc['id'] = str(uuid.uuid4())
    doc['created_at'] = datetime.now(timezone.utc).isoformat()
    await db.partner_requests.insert_one(doc)
    return {"id": doc['id'], "status": "ok", "message": "Заявка на партнёрство отправлена"}

@api_router.post("/cost-request")
async def create_cost_request(data: CostRequest):
    prices = {
        "design": 3000,
        "realization": 8000,
        "supervision": 1500,
    }
    price_per_m2 = prices.get(data.service, 3000)
    estimated_cost = price_per_m2 * data.area

    doc = data.model_dump()
    doc['id'] = str(uuid.uuid4())
    doc['created_at'] = datetime.now(timezone.utc).isoformat()
    doc['estimated_cost'] = estimated_cost
    doc['price_per_m2'] = price_per_m2
    await db.cost_requests.insert_one(doc)

    return {
        "id": doc['id'],
        "status": "ok",
        "estimated_cost": estimated_cost,
        "price_per_m2": price_per_m2,
        "message": "Расчёт стоимости выполнен",
    }

@api_router.post("/contact")
async def create_contact(data: ContactRequest):
    doc = data.model_dump()
    doc['id'] = str(uuid.uuid4())
    doc['created_at'] = datetime.now(timezone.utc).isoformat()
    await db.contacts.insert_one(doc)
    return {"id": doc['id'], "status": "ok", "message": "Сообщение отправлено"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
