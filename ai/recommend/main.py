# pip install fastapi[all] sentence-transformers pymysql pydantic mysql
# 서버 실행 uvicorn main:app --host 0.0.0.0 --port 8000 --reload

from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional, Dict
import pymysql
from sentence_transformers import SentenceTransformer, util
import torch
import json

with open("config.json", "r") as config_file:
    config = json.load(config_file)

# FastAPI 인스턴스 생성
app = FastAPI()

# 사전 학습된 NLP 모델 로드
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# MySQL 연결 정보
DB_CONFIG = {
    "host": config['DB_HOST'],
    "user": config['DB_USER_NAME'],
    "password": config['DB_PASSWORD'],
    "database": config['DB_NAME'],
    "charset": "utf8mb4",
    "cursorclass": pymysql.cursors.DictCursor
}
# # DB 연결 테스트
# try:
#     connection = pymysql.connect(**DB_CONFIG)
#     print("✅ MySQL 연결 성공!")
    
#     with connection.cursor() as cursor:
#         cursor.execute("SHOW TABLES;")  # ✅ 현재 존재하는 테이블 확인
#         tables = cursor.fetchall()
#         print(f"📌 현재 DB의 테이블 목록: {tables}")

#         cursor.execute("SELECT * FROM vendors LIMIT 5;")  # ✅ `vendors` 테이블 조회
#         rows = cursor.fetchall()
#         print(f"📌 vendors 테이블 데이터: {rows}")

# except pymysql.MySQLError as e:
#     print(f"❌ MySQL 연결 실패: {e}")
# finally:
#     if 'connection' in locals() and connection.open:
#         connection.close()

# 데이터베이스 연결 함수
def get_db_connection():
    return pymysql.connect(**DB_CONFIG)


# 키워드를 기반으로 가장 적합한 업체 찾기
def get_best_match(user_keyword: str, category_id: int):
    connection = get_db_connection()
    with connection.cursor() as cursor:
        # 해당 카테고리에 속한 업체 조회
        cursor.execute("SELECT user_id as vendor_id, name FROM vendors WHERE category_id = %s", (category_id,))
        vendors = cursor.fetchall()

            # ✅ vendors 데이터 확인
        print(f"Fetched vendors: {vendors}")

        if not vendors:
            return None  # 해당 카테고리에 업체가 없으면 None 반환

        # ✅ vendors 리스트 안에 어떤 키가 있는지 확인
        if vendors:
            print(f"Vendors keys: {vendors[0].keys()}")

        # 해당 카테고리의 리뷰 조회
        cursor.execute("SELECT vendor_id, content FROM reviews WHERE vendor_id IN (%s)" %
                       ",".join(str(v["vendor_id"]) for v in vendors))
        reviews = cursor.fetchall()

        if not reviews:
            return None  # 리뷰가 없으면 추천 불가
            

        # 키워드와 리뷰 임베딩 변환
        user_embedding = model.encode(user_keyword, convert_to_tensor=True)
        review_embeddings = model.encode([r["content"] for r in reviews], convert_to_tensor=True)

        # 코사인 유사도 계산
        similarities = util.pytorch_cos_sim(user_embedding, review_embeddings)
        best_index = torch.argmax(similarities).item()
        best_vendor_id = reviews[best_index]["vendor_id"]

        # return next(v["name"] for v in vendors if v["vendor_id"] == best_vendor_id)
        return best_vendor_id

# 요청 데이터 모델 정의
class RecommendationRequest(BaseModel):
    wedding_hall: Optional[str] = None
    studio: Optional[str] = None
    dress: Optional[str] = None
    makeup: Optional[str] = None

# 추천 API 엔드포인트
@app.post("/recommend")
def recommend(request: RecommendationRequest):
    user_keywords = {
        "1": request.wedding_hall,
        "2": request.studio,
        "3": request.dress,
        "4": request.makeup
    }

    recommendations = {
        category_id: get_best_match(keyword, category_id) if keyword else None
        for category_id, keyword in user_keywords.items()
    }

    return {"recommendations": recommendations}


@app.get("/test-db")
def test_db():
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("SELECT vendor_id, content FROM reviews WHERE vendor_id IN (16, 17);")
            vendors = cursor.fetchall()
        return {"status": "success", "vendors": vendors}
    except pymysql.MySQLError as e:
        return {"status": "error", "message": str(e)}