# API設計書

## 本日の患者

- 【URL】 /api/patients/{date} ※dateはYYYY-MM-DD形式
- 【Method】 GET
- 【レスポンス例（形式：json）】
  ```json
  {"status":"OK",
    "data":[
      {
        "id":1,
        "start_time":"2025-07-04T10:00:00",
        "customer_id":1,
        "customer_name":"山田 陽子",
        "customer_kana":"やまだ ようこ",
        "room_id":1,
        "room_name":"診療室A"
      },・・・
    ]}
  ```

### SQL
```sql
SELECT
  appoint_data.id
  , appoint_data.start_time as start_time
  , customer_data.id as customer_id
  , customer_data.name as customer_name
  , customer_data.kana as customer_kana
  , room_data.id as room_id
  , room_data.name as room_name 
FROM
  appoint_data 
  INNER JOIN customer_data 
    ON appoint_data.customer_id = customer_data.id 
  INNER JOIN room_data 
    ON appoint_data.room_id = room_data.id 
WHERE
  appoint_data.start_time >= '2025/07/04 00:00:00' 
  AND appoint_data.start_time < '2025/07/05 00:00:00';
```

### レスポンス項目

|No.|変数名|型|例|備考|
|:----|:----|:----|:----|:----|
|1|id|String|1||
|2|start_time|String|2025-07-04T10:00:00||
|3|customer_id|String|1||
|4|customer_name|String|山田　陽子||
|5|customer_kana|String|やまだ　ようこ||
|6|room_id|String|1||
|7|room|String|診察室A||


## 新患リスト
- 【URL】 /api/patients/{date}/new ※dateはYYYY-MM-DD形式
- 【Method】 GET
- 【レスポンス例（形式：json）】
  ```json
  {"status":"OK",
    "data":[
      {
        "id":1,
        "start_time":"2025-07-04T10:00:00",
        "customer_id":1,
        "customer_name":"山田 陽子",
        "customer_kana":"やまだ ようこ",
        "room_id":1,
        "room_name":"診療室A"
      },・・・
    ]}
  ```

### SQL
```sql
SELECT
  appoint_data.id
  , appoint_data.start_time as start_time
  , customer_data.id as customer_id
  , customer_data.name as customer_name
  , customer_data.kana as customer_kana
  , room_data.id as room_id
  , room_data.name as room_name 
FROM
  appoint_data 
  INNER JOIN customer_data 
    ON appoint_data.customer_id = customer_data.id 
  INNER JOIN room_data 
    ON appoint_data.room_id = room_data.id 
WHERE
  appoint_data.start_time >= '2025/07/04 00:00:00' 
  AND appoint_data.start_time < '2025/07/05 00:00:00';
  And appoint_data.remarks LIKE '%新患%';
```

### レスポンス項目

|No.|変数名|型|例|備考|
|:----|:----|:----|:----|:----|
|1|id|String|1||
|2|start_time|String|2025-07-04T10:00:00||
|3|customer_id|String|1||
|4|customer_name|String|山田　陽子||
|5|customer_kana|String|やまだ　ようこ||
|6|room_id|String|1||
|7|room|String|診察室A||