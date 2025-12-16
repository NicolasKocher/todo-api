from datetime import datetime, timedelta
from jose import jwt 
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError
import bcrypt

SECRET_KEY = "super-secret-dev-key"
ALGORITHM = "HS256"
TOKEN_EXPIRE_MIN = 30

security = HTTPBearer()

def create_access_token(data: dict):
  to_encode = data.copy()
  expire = datetime.utcnow() + timedelta(minutes=TOKEN_EXPIRE_MIN)
  to_encode.update({"exp": expire})
  return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
  token = credentials.credentials
  try: 
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return payload["sub"]
  except JWTError:
    raise HTTPException(status_code=401, detail="Ungültiger Token")
  
# Passwort hashen

def hash_password(password: str):
  password_bytes = password.encode('utf-8')
  salt = bcrypt.gensalt()
  return bcrypt.hashpw(password_bytes, salt).decode('utf-8')

def verify_password(password: str, hash: str):
  password_bytes = password.encode('utf-8')
  hash_bytes = hash.encode('utf-8')
  return bcrypt.checkpw(password_bytes, hash_bytes)