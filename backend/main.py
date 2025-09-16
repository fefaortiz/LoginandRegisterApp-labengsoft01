# backend/main.py
import os
import certifi
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from models import UserIn, UserLog, UserOut, Token
from security import get_password_hash, verify_password, create_access_token

load_dotenv()

app = FastAPI()

# --- CORS Middleware (Allows frontend to connect) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], # Your React app's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Database Connection ---
@app.on_event("startup")
async def startup_db_client():
    ca = certifi.where()
    app.mongodb_client = AsyncIOMotorClient(os.getenv("MONGO_URI"), tlsCAFile=ca)
    app.mongodb = app.mongodb_client["MyAPPLogin"]

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

# --- API Endpoints ---
@app.post("/api/auth/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def register_user(user: UserIn):
    # Check if user already exists
    if await app.mongodb.users.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(user.password)
    user_dict = user.dict()
    user_dict["password"] = hashed_password

    await app.mongodb.users.insert_one(user_dict)
    return user_dict

@app.post("/api/auth/login", response_model=Token)
async def login_for_access_token(form_data: UserLog):
    user = await app.mongodb.users.find_one({"email": form_data.email})
    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    access_token = create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}