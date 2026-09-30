from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def _flag_enabled(name: str) -> bool:
    return os.environ.get(name, 'false').strip().lower() in {'1', 'true', 'yes', 'on'}


if _flag_enabled('PD_STORAGE_ENABLED'):
    raise RuntimeError('режим хранения ПДн не разрешён этим ТЗ')


def _cors_origins() -> list[str]:
    raw = os.environ.get('CORS_ORIGINS', '')
    origins = [item.strip() for item in raw.split(',') if item.strip() and item.strip() != '*']
    if not origins:
        logger.warning('CORS_ORIGINS is unset or wildcard; using local dev origins only')
        return ['http://localhost:3000', 'http://127.0.0.1:3000']
    return origins


app = FastAPI()
api_router = APIRouter(prefix="/api")


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


@api_router.get("/")
async def root():
    return {"message": "Hello World", "pd_storage": "disabled"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    logger.info("status_request accepted storage=disabled")
    return StatusCheck(client_name=input.client_name)

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    return []

@api_router.post("/partner-request")
async def create_partner_request(data: PartnerRequest):
    logger.info("partner_request accepted storage=disabled")
    return {
        "id": str(uuid.uuid4()),
        "status": "ok",
        "message": "Заявка на партнёрство отправлена",
    }

@api_router.post("/cost-request")
async def create_cost_request(data: CostRequest):
    prices = {
        "design": 3000,
        "realization": 8000,
        "supervision": 1500,
    }
    price_per_m2 = prices.get(data.service, 3000)
    estimated_cost = price_per_m2 * data.area
    logger.info(
        "cost_request accepted storage=disabled service=%s area=%s",
        data.service,
        data.area,
    )
    return {
        "id": str(uuid.uuid4()),
        "status": "ok",
        "estimated_cost": estimated_cost,
        "price_per_m2": price_per_m2,
        "message": "Расчёт стоимости выполнен",
    }

@api_router.post("/contact")
async def create_contact(data: ContactRequest):
    logger.info("contact_request accepted storage=disabled")
    return {
        "id": str(uuid.uuid4()),
        "status": "ok",
        "message": "Сообщение отправлено",
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=_cors_origins(),
    allow_methods=["*"],
    allow_headers=["*"],
)
