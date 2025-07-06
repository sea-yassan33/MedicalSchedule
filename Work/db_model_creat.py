import myfunc as mf
import re
def create_model_from_sql(sql_file):
  with open(sql_file, encoding="utf-8") as f:
    sql = f.read()
  sql = sql.replace(" ENGINE=InnoDB DEFAULT CHARSET=utf8mb4", "").replace("ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;", "")
  table_match = re.search(r'CREATE TABLE\s+`?(\w+)`?\s*\((.*?)\);', sql, re.DOTALL | re.IGNORECASE)
  if table_match:
    table_name = table_match.group(1)
    column_lines = table_match.group(2).splitlines()
    columns = []
    for line in column_lines:
      col = mf.parse_column(line)
      if col:
        columns.append(col)
    #print(convert_to_model(table_name, columns))
    # ファイルに書き出し
    with open(f"./out/{table_name}.py", "w", encoding="utf-8") as f:
      f.write(mf.convert_to_model(table_name, columns))
  else:
    print("テーブル定義のパースに失敗しました。")
    exit(1)
## ===実行フェーズ===
sql_model_list = [
  'create_customer_data.sql',
  'create_room_data.sql',
  'create_specialty_data.sql',
  'm_create_appoint_data.sql'
]
for sql_file in sql_model_list:
  sql_file_path = f"./sql_folder/{sql_file}"
  create_model_from_sql(sql_file_path)