from sqlalchemy import Column, Integer, String, DateTime, CHAR, VARCHAR, DATETIME
from sqlalchemy.ext.declarative import declarative_base
import uuid
import datetime

Base = declarative_base()

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
    first_visit_date = Column(DateTime)
    last_visit_date = Column(DateTime)
    profession_ids = Column(VARCHAR(255))
    memo = Column(VARCHAR(255))
    delet_flag = Column(Integer)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)

    def __init__(self):
        self.id = str(uuid.uuid4())