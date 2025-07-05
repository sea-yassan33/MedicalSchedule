import warnings
warnings.filterwarnings("ignore")
import random
from faker import Faker
from datetime import datetime, timedelta
import pandas as pd
import json
import pykakasi
fake = Faker('ja_JP')
# 性別の選択肢
genders = ['Men', 'Female']
## 漢字を平仮名に変換
def convert_to_hiragana(text):
    kakasi = pykakasi.kakasi()
    kakasi.setMode('J', 'H')  # 漢字を平仮名に変換
    kakasi.setMode('K', 'H')  # カタカナを平仮名に変換
    converter = kakasi.getConverter()
    return converter.do(text)
# ダミーデータ生成関数
def generate_dummy_data(num_records=10):
  data = []
  num_int = 0
  for _ in range(num_records):
    num_int += 1
    # 名前を生成
    name = fake.name()
    # 平仮名に変換
    kana_name = convert_to_hiragana(name)
    created_at = fake.date_time_this_decade()
    updated_at = fake.date_time_between_dates(datetime_start=created_at, datetime_end=datetime.now())
    record = {
      "id": num_int,
      "name": name,
      "kana": kana_name,
      "age": random.randint(5, 99),
      "duration": random.randint(1, 5),
      "gender": random.choice(genders) if random.random() > 0.2 else None,
      "phone_number": fake.phone_number() if random.random() > 0.2 else None,
      "email": fake.email() if random.random() > 0.2 else None,
      "first_visit_date": None,
      "last_visit_date": None,
      "memo": fake.text(max_nb_chars=100) if random.random() > 0.2 else None,
      "created_at": created_at.isoformat(),
      "updated_at": updated_at.isoformat()
    }
    data.append(record)
    #with open('dummy_data.json', 'w', encoding='utf-8') as f:
    #  json.dump(data, f, ensure_ascii=False, indent=2)
    ## データフレーム作成
    df = pd.DataFrame(data)
    ## 型変換
    df = df.astype({
      "id": "int64",
      "name": "string",
      "kana": "string",
      "age": "int64",
      "duration": "int64",
      "gender": "string",
      "phone_number": "string",
      "email": "string",
      "first_visit_date": "datetime64[ns]",
      "last_visit_date": "datetime64[ns]",
      "memo": "string",
      "created_at": "datetime64[ns]",
      "updated_at": "datetime64[ns]"
    })
  return df