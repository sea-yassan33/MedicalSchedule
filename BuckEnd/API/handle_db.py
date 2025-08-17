# -*- encoding: utf-8 -*-
import sys
import models
import databases
from datetime import datetime, timedelta
sys.dont_write_bytecode = True
## 患者顧客リスト取得
def select_all_customer():
  session = databases.create_new_session()
  customer_list = session.query(models.Customer_data).all()
  if customer_list == None:
    customer_list = []
  return customer_list
## 患者顧客情報取得
def select_customer(customer_id):
  session = databases.create_new_session()
  user = session.query(models.Customer_data).\
      filter(models.Customer_data.id == customer_id).\
      first()           
  if user == None:
      user = ""
  return user
## 予約データ取得
def slect_appoints_date(start_date):
  # 次の日を作成
  dt_next = datetime.strptime(start_date, '%Y-%m-%d %H:%M:%S')
  dt_next += timedelta(days=1)
  next_date = dt_next.strftime('%Y-%m-%d %H:%M:%S')
  print(f"[log]Next Date: {next_date}")
  # dbアクセス
  session = databases.create_new_session()
  results = session.query(
    models.Appoint_data.id,
    models.Appoint_data.start_time.label("start_time"),
    models.Customer_data.id.label("customer_id"),
    models.Customer_data.name.label("customer_name"),
    models.Customer_data.kana.label("customer_kana"),
    models.Room_data.id.label("room_id"),
    models.Room_data.name.label("room_name"),
    ).join(
      models.Customer_data, models.Appoint_data.customer_id == models.Customer_data.id
    ).join(
      models.Room_data, models.Appoint_data.room_id == models.Room_data.id
    ).filter(
      models.Appoint_data.start_time >= start_date,
      models.Appoint_data.start_time < next_date
    ).all()
  if results == None:
    results = []
  # タプルでカラムの出力
  # print(results[0]._fields)
  return [dict(r._mapping) for r in results]
## 予約データ取得(新患のみ)
def slect_new_appoints_date(start_date):
  # 次の日を作成
  dt_next = datetime.strptime(start_date, '%Y-%m-%d %H:%M:%S')
  dt_next += timedelta(days=1)
  next_date = dt_next.strftime('%Y-%m-%d %H:%M:%S')
  print(f"[log]Next Date: {next_date}")
  # dbアクセス
  session = databases.create_new_session()
  results = session.query(
    models.Appoint_data.id,
    models.Appoint_data.start_time.label("start_time"),
    models.Customer_data.id.label("customer_id"),
    models.Customer_data.name.label("customer_name"),
    models.Customer_data.kana.label("customer_kana"),
    models.Room_data.id.label("room_id"),
    models.Room_data.name.label("room_name"),
    ).join(
      models.Customer_data, models.Appoint_data.customer_id == models.Customer_data.id
    ).join(
      models.Room_data, models.Appoint_data.room_id == models.Room_data.id
    ).filter(
      models.Appoint_data.start_time >= start_date,
      models.Appoint_data.start_time < next_date,
      # 新患の条件(remarksに"新患"が含まれる)
      models.Appoint_data.remarks.like('%新患%')
    ).all()
  if results == None:
    results = []
  # タプルでカラムの出力
  # print(results[0]._fields)
  return [dict(r._mapping) for r in results]