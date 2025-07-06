# -*- encoding: utf-8 -*-
import datetime
import uuid
import sys
from sqlalchemy import (Column, String,Integer, Text, ForeignKey,CHAR, VARCHAR, INT, create_engine, MetaData, DECIMAL, DATETIME, exc, event, Index, and_)
from sqlalchemy.ext.declarative import declarative_base
sys.dont_write_bytecode = True
## SQLAlchemyのベースクラスを定義  
Base = declarative_base()
## Customer_dataモデルクラスの定義
class Customer_data(Base):
  __tablename__ = 'customer_data'
  id = Column(Integer, primary_key=True)
  name = Column(VARCHAR(255))
  kana = Column(VARCHAR(255))
  age = Column(Integer)
  duration = Column(Integer)
  gender = Column(VARCHAR(255))
  phone_number = Column(VARCHAR(255))
  email = Column(VARCHAR(255))
  first_visit_date = Column(DATETIME)
  last_visit_date = Column(DATETIME)
  profession_ids = Column(VARCHAR(255))
  memo = Column(VARCHAR(255))
  delet_flag = Column(Integer)
  created_at = Column(DATETIME)
  updated_at = Column(DATETIME)
  def __init__(self):
    self.id = str(uuid.uuid4())
    now_data_time = str(datetime.datetime.now().strftime("%Y%m%d%H%M%S"))
    self.create_at =  now_data_time
    self.update_at =  now_data_time
## Specialty_dataモデルクラスの定義
class Specialty_data(Base):
  __tablename__ = 'specialty_data'
  id = Column(Integer, primary_key=True)
  name = Column(VARCHAR(255))
  kana = Column(VARCHAR(255))
  specialty = Column(Integer)
  delet_flag = Column(Integer)
  create_date = Column(DATETIME)
  update_date = Column(DATETIME)
  def __init__(self):
    self.id = str(uuid.uuid4())
    now_data_time = str(datetime.datetime.now().strftime("%Y%m%d%H%M%S"))
    self.create_at =  now_data_time
    self.update_at =  now_data_time
## Room_dataモデルクラスの定義
class Room_data(Base):
  __tablename__ = 'room_data'
  id = Column(Integer, primary_key=True)
  name = Column(VARCHAR(255))
  remake = Column(VARCHAR(255))
  create_date = Column(DATETIME)
  update_date = Column(DATETIME)
  def __init__(self):
    self.id = str(uuid.uuid4())
    now_data_time = str(datetime.datetime.now().strftime("%Y%m%d%H%M%S"))
    self.create_at =  now_data_time
    self.update_at =  now_data_time
## Appoint_dataモデルクラスの定義
class Appoint_data(Base):
  __tablename__ = 'appoint_data'
  id = Column(Integer, primary_key=True)
  customer_id = Column(Integer)
  room_id = Column(Integer)
  start_time = Column(DATETIME)
  remarks = Column(VARCHAR(255))
  delet_flag = Column(Integer)
  create_date = Column(DATETIME)
  update_date = Column(DATETIME)
  def __init__(self):
    self.id = str(uuid.uuid4())
    now_data_time = str(datetime.datetime.now().strftime("%Y%m%d%H%M%S"))
    self.create_at =  now_data_time
    self.update_at =  now_data_time
