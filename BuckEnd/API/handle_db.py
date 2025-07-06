# -*- encoding: utf-8 -*-
import sys
import models
import databases
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