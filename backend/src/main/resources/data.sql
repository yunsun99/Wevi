INSERT INTO `do` (do_id, do_name) VALUES
    (1, '서울'), (2, '인천'), (3, '대전'), (4, '대구'), (5, '광주'), (6, '부산'), (7, '울산'), (8, '세종특별자치시'),
    (31, '경기도'), (32, '강원도'), (33, '충청북도'), (34, '충청남도'), (35, '경상북도'), (36, '경상남도'), (37, '전라북도'),
    (38, '전라남도'), (39, '제주도');

INSERT INTO `sigungu` (sigungu_id, do_id, sigungu_name) VALUES
    -- 서울 (do_region_id = 1)
    (1, 1, '강남구'), (2, 1, '강동구'), (3, 1, '강북구'), (4, 1, '강서구'), (5, 1, '관악구'),
    (6, 1, '광진구'), (7, 1, '구로구'), (8, 1, '금천구'), (9, 1, '노원구'), (10, 1, '도봉구'),
    (11, 1, '동대문구'), (12, 1, '동작구'), (13, 1, '마포구'), (14, 1, '서대문구'), (15, 1, '서초구'),
    (16, 1, '성동구'), (17, 1, '성북구'), (18, 1, '송파구'), (19, 1, '양천구'), (20, 1, '영등포구'),
    (21, 1, '용산구'), (22, 1, '은평구'), (23, 1, '종로구'), (24, 1, '중구'), (25, 1, '중랑구'),

    -- 인천 (do_region_id = 2)
    (1, 2, '강화군'), (2, 2, '계양구'), (3, 2, '미추홀구'), (4, 2, '남동구'), (5, 2, '동구'),
    (6, 2, '부평구'), (7, 2, '서구'), (8, 2, '연수구'), (9, 2, '옹진군'), (10, 2, '중구'),

    -- 대전 (do_region_id = 3)
    (1, 3, '대덕구'), (2, 3, '동구'), (3, 3, '서구'), (4, 3, '유성구'), (5, 3, '중구'),

    -- 대구 (do_region_id = 4)
    (1, 4, '남구'), (2, 4, '달서구'), (3, 4, '달성군'), (4, 4, '동구'), (5, 4, '북구'),
    (6, 4, '서구'), (7, 4, '수성구'), (8, 4, '중구'),

    -- 광주 (do_region_id = 5)
    (1, 5, '광산구'), (2, 5, '남구'), (3, 5, '동구'), (4, 5, '북구'), (5, 5, '서구'),

    -- 부산 (do_region_id = 6)
    (1, 6, '강서구'), (2, 6, '금정구'), (3, 6, '기장군'), (4, 6, '남구'), (5, 6, '동구'),
    (6, 6, '동래구'), (7, 6, '부산진구'), (8, 6, '북구'), (9, 6, '사상구'), (10, 6, '사하구'),
    (11, 6, '서구'), (12, 6, '수영구'), (13, 6, '연제구'), (14, 6, '영도구'), (15, 6, '중구'),
    (16, 6, '해운대구'),

    -- 울산 (do_region_id = 7)
    (1, 7, '중구'), (2, 7, '남구'), (3, 7, '동구'), (4, 7, '북구'), (5, 7, '울주군'),

    -- 세종 (do_region_id = 8)
    (1, 8, '세종특별자치시'),

    -- 경기도 (do_region_id = 31)
    (1, 31, '가평군'), (2, 31, '고양시'), (3, 31, '과천시'), (4, 31, '광명시'), (5, 31, '광주시'),
    (6, 31, '구리시'), (7, 31, '군포시'), (8, 31, '김포시'), (9, 31, '남양주시'), (10, 31, '동두천시'),
    (11, 31, '부천시'), (12, 31, '성남시'), (13, 31, '수원시'), (14, 31, '시흥시'), (15, 31, '안산시'),
    (16, 31, '안성시'), (17, 31, '안양시'), (18, 31, '양주시'), (19, 31, '양평군'), (20, 31, '여주시'),
    (21, 31, '연천군'), (22, 31, '오산시'), (23, 31, '용인시'), (24, 31, '의왕시'), (25, 31, '의정부시'),
    (26, 31, '이천시'), (27, 31, '파주시'), (28, 31, '평택시'), (29, 31, '포천시'), (30, 31, '하남시'),
    (31, 31, '화성시'),

    -- 강원도 (do_region_id = 32)
    (1, 32, '강릉시'), (2, 32, '고성군'), (3, 32, '동해시'), (4, 32, '삼척시'), (5, 32, '속초시'),
    (6, 32, '양구군'), (7, 32, '양양군'), (8, 32, '영월군'), (9, 32, '원주시'), (10, 32, '인제군'),
    (11, 32, '정선군'), (12, 32, '철원군'), (13, 32, '춘천시'), (14, 32, '태백시'), (15, 32, '평창군'),
    (16, 32, '홍천군'), (17, 32, '화천군'), (18, 32, '횡성군'),

    -- 제주도 (do_region_id = 39)
    (1, 39, '남제주군'), (2, 39, '북제주군'), (3, 39, '서귀포시'), (4, 39, '제주시');

INSERT INTO `categories` VALUES (1, 'weddinghall'), (2, 'studio'), (3, 'dress'), (4, 'makeup'), (5, 'others');

INSERT INTO `users` (
    user_id, created_at, updated_at, dtype, auth_id, auth_provider, email, password, status
) VALUES
      (1,'2025-02-08 12:38:34.630324',NULL,'customer',NULL,NULL,'test@test.com','$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi','ACTIVE'),
      (2,'2025-02-09 07:15:56.089971',NULL,'vendor',NULL,NULL,'weddinghall1@test.com','$2a$10$7yYA5GzV0Z8g1uQ/B91Gd.S4LxIg5jzKmVXg7bJOLX9evY1OEHGUm','ACTIVE'),
      (3,'2025-02-09 07:16:04.319151',NULL,'vendor',NULL,NULL,'weddinghall2@test.com','$2a$10$Mm9/rEzAMw8mMiNjmtO.QeqIM4NFNxeXaoTgpSnRuB7DCdBfkbH/K','ACTIVE'),
      (4,'2025-02-09 07:16:10.844163',NULL,'vendor',NULL,NULL,'studio1@test.com','$2a$10$6JIYC5foDU.EZ1hsOcQZeuI0LWHrLPeq1eHfRXvrGXoejjbNxD0FO','ACTIVE'),
      (5,'2025-02-09 07:16:16.561169',NULL,'vendor',NULL,NULL,'dress1@test.com','$2a$10$JMQTGnLmjAyeoGILmk8vbue1BLsYjPYYuU4CSnRMYSS3x2MisMxKi','ACTIVE'),
      (6,'2025-02-09 07:16:28.266947',NULL,'vendor',NULL,NULL,'makeup1@test.com','$2a$10$jft0KaGIiJnMKQX2c6WJ1uYPJeaZKEDTuufVbQJsQvK0eYjvyxEF.','ACTIVE'),
      (7,'2025-02-09 07:19:51.992539',NULL,'vendor',NULL,NULL,'studio2@test.com','$2a$10$FVSh.gO8oOah8LGGPaTdxOZttjam9vgrP4Yfg8ILiVCFyWLI/dBgi','ACTIVE'),
      (9,'2025-02-09 07:20:56.299648',NULL,'vendor',NULL,NULL,'makeup2@test.com','$2a$10$bUO9mDoi/ABtze2g6hy2keCFrQRDjiJKqFsGBgVV4FtghladupoGW','ACTIVE'),
      (10,'2025-02-09 07:21:10.449670',NULL,'vendor',NULL,NULL,'dress2@test.com','$2a$10$2LpSCbUmtBUyR2MezprunORJxC//a0OZ55pSiKZDr9Vi1TkVTfJXW','ACTIVE'),
      (11,'2025-02-09 07:21:10.449670',NULL,'customer',NULL,NULL,'spouse@test.com','$2a$10$2LpSCbUmtBUyR2MezprunORJxC//a0OZ55pSiKZDr9Vi1TkVTfJXW','ACTIVE');

INSERT INTO customers (user_id, spouse_id, address_detail, auto_road_address, name, nickname, phone, zonecode)
VALUES
    (1, null, '1123', '서울 양천구 목동2서로1길 1', '김싸피', '김싸피', '010-1234-5678', '01234'),
    (11, null, '101동 101호', '서울 양천구 목동서로1길 1', '정윤선', '쟈몽', '010-1234-5678', '01234');
UPDATE customers SET spouse_id = 11 WHERE user_id = 1;
UPDATE customers SET spouse_id = 1 WHERE user_id = 11;
INSERT INTO couple_requests (couple_request_id, sender_id, receiver_id, status, created_at, updated_at)
VALUES (1, 1, 11, 'ACCEPTED', NOW(), NOW());

INSERT INTO `vendors` (
    category_id, do_id, is_indoor, min_price, sigungu_code, user_id, address_detail, auto_road_address,
    business_hour, details, homepage, name, owner_name, owner_phone, parkinglot, phone, price,
    registration_number, subway, zonecode
) VALUES
      (1,1,_binary '\0',1000000,15,2,'5층','서울특별시 서초구 강남대로 123','10:00 - 22:00','럭셔리한 웨딩홀, 다양한 연회 메뉴 제공','http://www.lavenderwedding.com','라벤더 웨딩홀','박준영','010-1111-2222','주차 가능 100대','02-1234-5678','홀 대여 1,000,000원, 식대 50,000원','123-45-67890','강남역 2호선','06164'),
      (1,2,_binary '\0',1200000,8,3,'2층','인천광역시 연수구 센트럴로 45','09:00 - 21:00','모던한 인테리어와 최신 음향 시설','http://www.grandwedding.com','그랜드 웨딩','이서연','010-2222-3333','주차 가능 80대','032-5678-1234','홀 대여 1,200,000원, 식대 55,000원','234-56-78901','인천대입구역 1호선','21431'),
      (2,1,_binary '\0',500000,24,4,'B1','서울특별시 중구 남대문로 25','10:00 - 20:00','화이트 컨셉 촬영 전문 스튜디오','http://www.whitestudio.com','화이트 스튜디오','정민수','010-4444-5555','주차 가능 30대','02-9876-5432','촬영 패키지 500,000원','345-67-89012','서울역 1호선','04547'),
      (3,31,_binary '\0',200000,23,5,'3층','경기도 용인시 수지구 포은대로 55','11:00 - 19:00','고급 맞춤 웨딩드레스 대여 및 판매','http://www.princessdress.com','프린세스 드레스','김하영','010-6666-7777','주차 가능 20대','031-2345-6789','드레스 대여 200,000원','456-78-90123','수지구청역 신분당선','41222'),
      (4,6,_binary '\0',150000,16,6,'1층','부산광역시 해운대구 해운대로 789','10:00 - 18:00','신부 웨딩 메이크업 및 헤어 스타일링 전문','http://www.beautymakeup.com','뷰티 메이크업','박지현','010-8888-9999','주차 가능 10대','051-3456-7890','웨딩 메이크업 150,000원','567-89-01234','해운대역 2호선','48059'),
      (2,2,_binary '\0',200000,3,7,'3층','인천광역시 미추홀구 예술로 456','10:00 - 20:00','감성적인 촬영을 제공하는 스튜디오입니다.','http://www.style-studio.com','스타일 스튜디오','이민호','010-3456-7890','전용 주차장 10대 가능','032-9876-1234','촬영 200,000원, 앨범 300,000원','210-56-12345','인천시청역 1호선','13579'),
      (4,3,_binary '\0',100000,2,9,'2층','대전광역시 동구 중앙로 567','09:30 - 19:30','전문 아티스트가 맞춤 메이크업을 제공합니다.','http://www.beauty-makeup.com','박뷰티 메이크업','박예은','010-5678-9012','공용 주차장 이용 가능','042-1234-5678','신부 화장 150,000원, 일반 화장 100,000원','310-78-54321','대전역 1호선','54321'),
      (3,4,_binary '\0',300000,1,10,'5층','대구광역시 남구 패션로 789','10:00 - 21:00','고급스러운 디자인의 웨딩 드레스 전문점입니다.','http://www.elegance-dress.com','엘레강스 드레스','김하늘','010-6789-0123','주차 타워 이용 가능','053-7890-1234','웨딩 드레스 500,000원, 턱시도 300,000원','410-98-76543','대구역 2호선','67890');

INSERT INTO schedules (schedule_id, start_date_time, end_date_time, title, customer_id, vendor_id, dtype, category_id) VALUES
    (1, '2025-02-10 10:00:00', '2025-02-10 12:00:00', '웨딩 촬영 상담', 1, 2, 'consultation', 2),
    (2, '2025-02-15 14:00:00', '2025-02-15 16:00:00', '웨딩홀 계약', 1, 2, 'contract', 1),
    (3, '2025-02-15 14:00:00', '2025-02-15 16:00:00', '스튜디오 계약', 1, 2, 'contract', 2),
    (4, '2025-02-15 14:00:00', '2025-02-15 16:00:00', '드레스 계약', 1, 2, 'contract', 3),
    (5, '2025-02-15 14:00:00', '2025-02-15 16:00:00', '메이크업 계약', 1, 2, 'contract', 4),
    (6, '2025-02-15 14:00:00', '2025-02-15 16:00:00', '메이크업 상담', 11, 6, 'consultation', 4),
    (7, '2025-02-20 13:00:00', '2025-02-20 15:00:00', '기타 일정', 1, 2, 'other_schedule', 5),
    (8, '2025-02-20 13:00:00', '2025-02-20 15:00:00', '웨딩홀 중간과정', 1, 2, 'middle_process', 1),
    (9, '2025-02-20 13:00:00', '2025-02-20 15:00:00', '웨딩홀 중간과정', 1, 2, 'middle_process', 1),
    (10, '2025-02-20 13:00:00', '2025-02-20 15:00:00', '웨딩홀 중간과정', 1, 2, 'middle_process', 1),
    (11, '2025-02-20 13:00:00', '2025-02-20 15:00:00', '웨딩홀 중간과정', 1, 2, 'middle_process', 1),
    (12, '2025-02-20 13:00:00', '2025-02-20 15:00:00', '웨딩홀 상담', 1, 2, 'consultation', 1);

INSERT INTO consultations (schedule_id, request) VALUES
    (1, '드레스 선택과 메이크업 상담을 원합니다.'),
    (12, '메이크업 해줘잉.');

INSERT INTO contracts (schedule_id, price, detail, contract_date) VALUES
    (2, 5000000, '웨딩 홀', '2025-02-20 13:00:00'),
    (3, 5000000, '스튜디오', '2025-02-20 13:00:00'),
    (4, 5000000, '드레스!', '2025-02-20 13:00:00'),
    (5, 5000000, '메이크업', '2025-02-20 13:00:00');

INSERT INTO middle_process_steps (middle_process_step_id, name, category_id, is_visit)
VALUES
-- 🏛️ 웨딩홀 (category_id = 1)
(1, '계약 완료', 1, true),
(2, '웨딩홀 점검', 1, false),
(3, '웨딩홀 리허설', 1, true),
(4, '본식', 1, true),

-- 📸 스튜디오 (category_id = 2)
(11, '계약 완료', 2, true),
(12, '웨딩촬영용 드레스 셀렉', 2, true),
(13, '웨딩촬영용 드레스 가봉', 2, true),
(14, '배송중', 2, false),
(15, '배송완료', 2, false),
(16, '본식용 드레스 셀렉', 2, true),
(17, '본식용 드레스 가봉', 2, true),
(18, '배송중', 2, false),
(19, '배송완료', 2, false),
(20, '본식', 2, true),

-- 👗 드레스 (category_id = 3)
(21, '계약 완료', 3, true),
(22, '웨딩쵤영', 3, true),
(23, '사진 셀렉', 3, true),
(24, '사진 수정', 3, true),
(25, '2차 수정', 3, true),
(26, '액자/앨범 제작 완료', 3, false),
(27, '계약 액자/앨범 수령', 3, true),
(28, '본식 스냅', 3, true),

-- 💄 메이크업 (category_id = 4)
(31, '계약 완료', 4, true),
(32, '웨딩촬영 메이크업', 4, true),
(33, '본식 메이크업', 4, true);

-- ✅ middle_processes 테이블 수정 (contract_id 값을 실제 존재하는 schedule_id로 변경)
INSERT INTO middle_processes (schedule_id, middle_process_step_id, status, detail, contract_id) VALUES
-- 웨딩홀 관련 진행 단계
(8, 1, 'COMPLETED', '웨딩홀 중간과정', 2),
(9, 2, 'COMPLETED', '웨딩홀 중간과정', 2),
(10, 3, 'PENDING', '웨딩홀 중간과정', 2),
(11, 4, 'PENDING', '웨딩홀 중간과정', 2);

INSERT INTO other_schedules (schedule_id, detail) VALUES
    (7, '신혼여행 일정 논의');

INSERT INTO `reviews` (customer_id, review_id, vendor_id, created_at, updated_at, content) VALUES
    (1,1,2,'2025-02-10 06:46:22.998077',NULL,'좋은 서비스였습니다!'),
    (1,2,2,'2025-02-10 06:46:43.161904',NULL,'맛있어요요요!'),
    (1,3,2,'2025-02-10 06:46:54.005500',NULL,'주차가 편리해요!');