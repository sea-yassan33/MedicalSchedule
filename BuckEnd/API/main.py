# -*- encoding: utf-8 -*-
from fastapi import FastAPI, Depends, Path, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import models
import handle_db
from datetime import datetime

app = FastAPI()

origins = ["http://localhost:3000","http://127.0.0.1:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get(path="/")
async def FastAPI():
    return { "message" : "Hello Fast API" }

## 患者顧客リスト取得
@app.get(path="/api/customers")
async def get_list_user():
  result = handle_db.select_all_customer()
  return {
    "status": "OK",
    "data": result
  }
## 患者顧客情報取得
@app.get(path="/api/customers/{customer_id}")
async def get_user(customer_id: str):
  result = handle_db.select_customer(customer_id)
  if result == 1:
    raise HTTPException(status_code=404, detail="Query Error!!")
  return {
    "status": "OK",
    "data": result
  }
## 予約データ取得
@app.get(path="/api/appoints/{start_date}")
async def get_appoints(start_date: str):
  dt = datetime.strptime(start_date, '%Y-%m-%d')
  start_date_str = dt.strftime('%Y-%m-%d %H:%M:%S')
  print(f"[log]Start Date: {start_date_str}")
  result = handle_db.slect_appoints_date(start_date_str)
  #result = []
  if result == 1:
    raise HTTPException(status_code=404, detail="Query Error!!")
  return {
    "status": "OK",
    "data": result
  }
## 予約データ取得(新患のみ)
@app.get(path="/api/appoints/{start_date}/new")
async def get_appoints(start_date: str):
  dt = datetime.strptime(start_date, '%Y-%m-%d')
  start_date_str = dt.strftime('%Y-%m-%d %H:%M:%S')
  print(f"[log]Start Date: {start_date_str}")
  result = handle_db.slect_new_appoints_date(start_date_str)
  #result = []
  if result == 1:
    raise HTTPException(status_code=404, detail="Query Error!!")
  return {
    "status": "OK",
    "data": result
  }