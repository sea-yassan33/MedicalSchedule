from sqlalchemy import create_engine
from sqlalchemy.orm import (sessionmaker, relationship, scoped_session)
import sys
import os
sys.dont_write_bytecode = True
from dotenv import load_dotenv
load_dotenv()    
host=os.environ['DB_HOST']
user=os.environ['DB_USER']
password=os.environ['DB_PASSWORD']
database=os.environ['DB_NAME']
# setting db connection
url = f"mysql+mysqlconnector://{user}:{password}@{host}:3306/{database}?charset=utf8"
engine = create_engine(url, echo=False, pool_recycle=10)
# create session
def create_new_session():
    return  scoped_session(sessionmaker(autocommit=False, autoflush=True, expire_on_commit=False, bind=engine))