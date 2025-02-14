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



-------------------------------------------------------------------------------------------------------------



INSERT INTO `users` (
    user_id, created_at, updated_at, dtype, auth_id, auth_provider, email, password, status
) VALUES
--       (1,'2025-02-08 12:38:34.630324',NULL,'customer',NULL,NULL,'test@test.com','$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi','ACTIVE'),
--       (2,'2025-02-09 07:15:56.089971',NULL,'vendor',NULL,NULL,'weddinghall1@test.com','$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi','ACTIVE'),
--       (3,'2025-02-09 07:16:04.319151',NULL,'vendor',NULL,NULL,'weddinghall2@test.com','$2a$10$Mm9/rEzAMw8mMiNjmtO.QeqIM4NFNxeXaoTgpSnRuB7DCdBfkbH/K','ACTIVE'),
--       (4,'2025-02-09 07:16:10.844163',NULL,'vendor',NULL,NULL,'studio1@test.com','$2a$10$6JIYC5foDU.EZ1hsOcQZeuI0LWHrLPeq1eHfRXvrGXoejjbNxD0FO','ACTIVE'),
--       (5,'2025-02-09 07:16:16.561169',NULL,'vendor',NULL,NULL,'dress1@test.com','$2a$10$JMQTGnLmjAyeoGILmk8vbue1BLsYjPYYuU4CSnRMYSS3x2MisMxKi','ACTIVE'),
--       (6,'2025-02-09 07:16:28.266947',NULL,'vendor',NULL,NULL,'makeup1@test.com','$2a$10$jft0KaGIiJnMKQX2c6WJ1uYPJeaZKEDTuufVbQJsQvK0eYjvyxEF.','ACTIVE'),
--       (7,'2025-02-09 07:19:51.992539',NULL,'vendor',NULL,NULL,'studio2@test.com','$2a$10$FVSh.gO8oOah8LGGPaTdxOZttjam9vgrP4Yfg8ILiVCFyWLI/dBgi','ACTIVE'),
--       (9,'2025-02-09 07:20:56.299648',NULL,'vendor',NULL,NULL,'makeup2@test.com','$2a$10$bUO9mDoi/ABtze2g6hy2keCFrQRDjiJKqFsGBgVV4FtghladupoGW','ACTIVE'),
--       (10,'2025-02-09 07:21:10.449670',NULL,'vendor',NULL,NULL,'dress2@test.com','$2a$10$2LpSCbUmtBUyR2MezprunORJxC//a0OZ55pSiKZDr9Vi1TkVTfJXW','ACTIVE'),
--       (11,'2025-02-09 07:21:10.449670',NULL,'customer',NULL,NULL,'spouse@test.com','$2a$10$2LpSCbUmtBUyR2MezprunORJxC//a0OZ55pSiKZDr9Vi1TkVTfJXW','ACTIVE');
(1, '2025-02-10 10:15:34', NULL, 'customer', NULL, NULL, 'customer1@naver.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(2, '2025-02-10 11:20:40', NULL, 'customer', NULL, NULL, 'customer2@gmail.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(3, '2025-02-10 12:30:15', NULL, 'customer', NULL, NULL, 'customer3@hanmail.net', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(4, '2025-02-10 13:45:50', NULL, 'customer', NULL, NULL, 'customer4@daum.net', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(5, '2025-02-10 14:05:22', NULL, 'customer', NULL, NULL, 'customer5@gmail.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(6, '2025-02-10 15:10:30', NULL, 'customer', NULL, NULL, 'customer6@naver.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(7, '2025-02-10 16:25:40', NULL, 'customer', NULL, NULL, 'customer7@daum.net', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(8, '2025-02-10 17:35:55', NULL, 'customer', NULL, NULL, 'customer8@hanmail.net', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(9, '2025-02-10 18:50:20', NULL, 'customer', NULL, NULL, 'customer9@naver.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(10, '2025-02-10 19:15:30', NULL, 'customer', NULL, NULL, 'customer10@gmail.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(11, '2025-02-10 20:30:40', NULL, 'customer', NULL, NULL, 'customer11@daum.net', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(12, '2025-02-10 21:45:50', NULL, 'customer', NULL, NULL, 'customer12@hanmail.net', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(13, '2025-02-10 22:00:00', NULL, 'customer', NULL, NULL, 'customer13@naver.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(14, '2025-02-10 22:00:00', NULL, 'customer', NULL, NULL, 'customer14@hanmail.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(15, '2025-02-10 22:00:00', NULL, 'customer', NULL, NULL, 'customer15@naver.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(16, '2025-02-10 22:00:00', NULL, 'vendor', NULL, NULL, 'vendor16@hanmail.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(17, '2025-02-10 22:00:00', NULL, 'vendor', NULL, NULL, 'vendor17@naver.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(18, '2025-02-10 22:00:00', NULL, 'vendor', NULL, NULL, 'vendor18@hanmail.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(19, '2025-02-10 22:00:00', NULL, 'vendor', NULL, NULL, 'vendor19@gmail.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(20, '2025-02-10 22:00:00', NULL, 'vendor', NULL, NULL, 'vendor20@naver.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(21, '2025-02-10 22:00:00', NULL, 'vendor', NULL, NULL, 'vendor21@naver.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(22, '2025-02-10 22:00:00', NULL, 'vendor', NULL, NULL, 'vendor22@naver.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(23, '2025-02-10 22:00:00', NULL, 'vendor', NULL, NULL, 'vendor23@gmail.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(24, '2025-02-11 10:00:00', NULL, 'vendor', NULL, NULL, 'vendor24@naver.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(25, '2025-02-11 10:05:30', NULL, 'vendor', NULL, NULL, 'vendor25@gmail.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(26, '2025-02-11 10:10:45', NULL, 'vendor', NULL, NULL, 'vendor26@hanmail.net', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(27, '2025-02-11 10:15:50', NULL, 'vendor', NULL, NULL, 'vendor27@daum.net', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(28, '2025-02-11 10:20:30', NULL, 'vendor', NULL, NULL, 'vendor28@gmail.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(29, '2025-02-11 10:25:40', NULL, 'vendor', NULL, NULL, 'vendor29@naver.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(30, '2025-02-11 10:30:50', NULL, 'vendor', NULL, NULL, 'vendor30@daum.net', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(31, '2025-02-11 10:35:55', NULL, 'vendor', NULL, NULL, 'vendor31@hanmail.net', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(32, '2025-02-11 10:40:20', NULL, 'vendor', NULL, NULL, 'vendor32@naver.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(33, '2025-02-11 10:45:30', NULL, 'vendor', NULL, NULL, 'vendor33@gmail.com', '$2a$10$kRY19qCSG/Dt8CQYzt06YuACQgxLzvMG3GviCOHVKZLPh1bflbcPi', 'ACTIVE'),
(34, '2024-03-15 00:00:00.0', '2024-03-20 13:52:18.0', 'vendor', NULL, NULL, 'traviswang@hanmail.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(35, '2024-02-14 00:00:00.0', '2024-02-16 04:17:55.0', 'vendor', NULL, NULL, 'xbrown@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(36, '2024-11-25 00:00:00.0', '2024-11-27 07:14:43.0', 'vendor', NULL, NULL, 'jennifermiller@naver.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(37, '2024-12-03 00:00:00.0', '2024-12-04 15:00:39.0', 'vendor', NULL, NULL, 'myerstodd@gmail.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(38, '2024-05-06 00:00:00.0', '2024-05-12 21:15:24.0', 'vendor', NULL, NULL, 'robinwalker@naver.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(39, '2024-11-14 00:00:00.0', '2024-11-14 16:06:06.0', 'vendor', NULL, NULL, 'jeffrey84@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(40, '2024-03-11 00:00:00.0', '2024-03-11 06:25:41.0', 'vendor', NULL, NULL, 'molly78@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(41, '2024-03-13 00:00:00.0', '2024-03-18 17:10:18.0', 'vendor', NULL, NULL, 'blackdavid@gmail.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(42, '2024-02-11 00:00:00.0', '2024-02-13 19:49:21.0', 'vendor', NULL, NULL, 'charlottemorris@naver.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(43, '2024-07-21 00:00:00.0', '2024-07-25 13:43:12.0', 'vendor', NULL, NULL, 'nicole85@gmail.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(44, '2024-02-26 00:00:00.0', '2024-02-27 05:30:08.0', 'vendor', NULL, NULL, 'kingnatasha@hanmail.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(45, '2024-06-18 00:00:00.0', '2024-06-21 23:31:48.0', 'vendor', NULL, NULL, 'wesley37@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(46, '2024-05-09 00:00:00.0', '2024-05-13 02:05:15.0', 'vendor', NULL, NULL, 'frhodes@hanmail.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(47, '2024-06-05 00:00:00.0', '2024-06-08 04:43:53.0', 'vendor', NULL, NULL, 'rebeccarubio@naver.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(48, '2024-03-30 00:00:00.0', '2024-04-04 16:26:20.0', 'vendor', NULL, NULL, 'kendra92@naver.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(49, '2024-04-18 00:00:00.0', '2024-04-19 23:12:05.0', 'vendor', NULL, NULL, 'davidbrown@hanmail.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(50, '2024-02-18 00:00:00.0', '2024-02-19 08:38:36.0', 'vendor', NULL, NULL, 'nealbryan@hanmail.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(51, '2024-04-21 00:00:00.0', '2024-04-26 11:45:56.0', 'vendor', NULL, NULL, 'oobrien@naver.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(52, '2024-05-24 00:00:00.0', '2024-05-27 15:29:40.0', 'vendor', NULL, NULL, 'smithandre@hanmail.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(53, '2024-10-12 00:00:00.0', '2024-10-17 00:49:18.0', 'vendor', NULL, NULL, 'stevenfischer@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(54, '2024-10-12 00:00:00.0', '2024-10-18 21:49:21.0', 'vendor', NULL, NULL, 'jpeterson@hanmail.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(55, '2024-08-13 00:00:00.0', '2024-08-17 09:20:12.0', 'vendor', NULL, NULL, 'zwilson@hanmail.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(56, '2024-05-03 00:00:00.0', '2024-05-07 08:59:35.0', 'vendor', NULL, NULL, 'moniquecrawford@hanmail.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(57, '2024-04-26 00:00:00.0', '2024-04-29 03:15:03.0', 'vendor', NULL, NULL, 'pfischer@gmail.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(58, '2024-11-12 00:00:00.0', '2024-11-16 09:43:45.0', 'vendor', NULL, NULL, 'kimberly11@naver.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(59, '2024-04-18 00:00:00.0', '2024-04-24 07:27:36.0', 'vendor', NULL, NULL, 'andersendenise@naver.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(60, '2026-01-08 00:00:00.0', '2026-01-14 13:18:28.0', 'vendor', NULL, NULL, 'jchan@gmail.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(61, '2024-07-12 00:00:00.0', '2024-07-16 11:46:57.0', 'vendor', NULL, NULL, 'jamie59@naver.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(62, '2026-01-06 00:00:00.0', '2026-01-11 22:46:46.0', 'vendor', NULL, NULL, 'chambersamanda@hanmail.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(63, '2024-07-28 00:00:00.0', '2024-07-31 21:58:17.0', 'vendor', NULL, NULL, 'iguerrero@gmail.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(64, '2024-09-12 00:00:00.0', '2024-09-13 19:22:30.0', 'vendor', NULL, NULL, 'msantos@hanmail.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(65, '2026-01-29 00:00:00.0', '2026-02-04 10:03:18.0', 'vendor', NULL, NULL, 'qstone@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(66, '2024-11-10 00:00:00.0', '2024-11-11 08:20:36.0', 'vendor', NULL, NULL, 'heather65@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(67, '2024-07-03 00:00:00.0', '2024-07-09 10:11:39.0', 'vendor', NULL, NULL, 'jamiewatts@naver.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(68, '2024-09-26 00:00:00.0', '2024-09-28 01:43:56.0', 'vendor', NULL, NULL, 'barrymitchell@gmail.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(69, '2024-10-02 00:00:00.0', '2024-10-06 20:04:52.0', 'vendor', NULL, NULL, 'ghaney@gmail.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(70, '2024-10-17 00:00:00.0', '2024-10-18 09:12:07.0', 'vendor', NULL, NULL, 'martinezvanessa@gmail.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(71, '2024-11-18 00:00:00.0', '2024-11-20 06:54:15.0', 'vendor', NULL, NULL, 'ann33@hanmail.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(72, '2024-03-31 00:00:00.0', '2024-04-02 02:36:22.0', 'vendor', NULL, NULL, 'theresagreen@gmail.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(73, '2024-11-02 00:00:00.0', '2024-11-06 11:56:14.0', 'vendor', NULL, NULL, 'cgreen@gmail.com', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(74, '2024-04-25 00:00:00.0', '2024-04-30 21:29:59.0', 'vendor', NULL, NULL, 'adam72@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(75, '2024-06-28 00:00:00.0', '2024-06-28 22:40:47.0', 'vendor', NULL, NULL, 'xmartin@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(76, '2024-06-28 00:00:00.0', '2024-06-28 22:40:47.0', 'vendor', NULL, NULL, 'zzxxcc@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(77, '2024-06-28 00:00:00.0', '2024-06-28 22:40:47.0', 'vendor', NULL, NULL, 'psge12@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(78, '2024-06-28 00:00:00.0', '2024-06-28 22:40:47.0', 'vendor', NULL, NULL, 'hsibs@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(79, '2024-06-28 00:00:00.0', '2024-06-28 22:40:47.0', 'vendor', NULL, NULL, 'sdwds@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(80, '2024-06-28 00:00:00.0', '2024-06-28 22:40:47.0', 'vendor', NULL, NULL, 'hanbatuniversity@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE');


INSERT INTO customers (user_id, spouse_id, address_detail, auto_road_address, name, nickname, phone, zonecode)
VALUES
--     (1, null, '1123', '서울 양천구 목동2서로1길 1', '김싸피', '김싸피', '010-1234-5678', '01234'),
--     (11, null, '101동 101호', '서울 양천구 목동서로1길 1', '정윤선', '쟈몽', '010-1234-5678', '01234');
-- UPDATE customers SET spouse_id = 11 WHERE user_id = 1;
-- UPDATE customers SET spouse_id = 1 WHERE user_id = 11;
-- INSERT INTO couple_requests (couple_request_id, sender_id, receiver_id, status, created_at, updated_at)
-- VALUES (1, 1, 11, 'ACCEPTED', NOW(), NOW());
(1, NULL, '101호', '서울특별시 강남구 테헤란로 123', '신동운', '운동', '010-1234-5678', '06164'),
(2, NULL, '202호', '서울특별시 서초구 서초대로 77길 55', '운동신', '서연', '010-2345-6789', '06651'),
(3, NULL, '305호', '서울특별시 종로구 종로3길 29', '박지훈', '지훈', '010-3456-7890', '03188'),
(4, NULL, '403호', '부산광역시 해운대구 해운대로 790', '최유진', '유진', '010-4567-8901', '48059'),
(5, NULL, '501호', '대전광역시 중구 중앙로 121', '정다은', '다은', '010-5678-9012', '34924'),
(6, NULL, '102호', '대구광역시 수성구 동대구로 89', '한도현', '도현', '010-6789-0123', '42033'),
(7, NULL, '7층', '인천광역시 연수구 센트럴로 89', '김하늘', '하늘', '010-7890-1234', '21998'),
(8, NULL, '201호', '광주광역시 서구 상무중앙로 65', '이정훈', '정훈', '010-8901-2345', '61949'),
(9, NULL, '902호', '울산광역시 남구 삼산로 223', '조수진', '수진', '010-9012-3456', '44708'),
(10, NULL, '8층', '경기도 성남시 분당구 불정로 65', '최민수', '민수', '010-0123-4567', '13598'),
(11, NULL, '103호', '서울특별시 강남구 테헤란로 123', '황성일', '일성김', '010-2345-6789', '06164'),
(12, NULL, '203호', '서울특별시 서초구 서초대로 77길 55', '강준호', '준호', '010-3456-7890', '06651'),
(13, NULL, '502호', '대전광역시 중구 중앙로 121', '이지은', '지은', '010-4567-8901', '34924'),
(14, NULL, '903호', '울산광역시 남구 삼산로 223', '장민혁', '민혁', '010-5678-9012', '44708'),
(15, NULL, '405호', '제주특별자치도 제주시 연동 240', '김다솜', '다솜', '010-6789-0123', '63124');

UPDATE customers SET spouse_id = 11 WHERE user_id = 1;
UPDATE customers SET spouse_id = 1 WHERE user_id = 11;
UPDATE customers SET spouse_id = 12 WHERE user_id = 2;
UPDATE customers SET spouse_id = 2 WHERE user_id = 12;
UPDATE customers SET spouse_id = 13 WHERE user_id = 3;
UPDATE customers SET spouse_id = 3 WHERE user_id = 13;
UPDATE customers SET spouse_id = 14 WHERE user_id = 4;
UPDATE customers SET spouse_id = 4 WHERE user_id = 14;

INSERT INTO couple_requests (couple_request_id, sender_id, receiver_id, status, created_at, updated_at)
VALUES
    (1, 1, 11, 'ACCEPTED', NOW(), NOW()),
    (2, 2, 12, 'ACCEPTED', NOW(), NOW()),
    (3, 3, 13, 'ACCEPTED', NOW(), NOW()),
    (4, 4, 14, 'ACCEPTED', NOW(), NOW());

INSERT INTO `vendors` (
    category_id, do_id, is_indoor, min_price, sigungu_code, user_id, address_detail, auto_road_address,
    business_hour, details, homepage, name, owner_name, owner_phone, parkinglot, phone, price,
    registration_number, subway, zonecode
) VALUES
      (1,1,0,1000000,15,16,'5층','서울특별시 서초구 강남대로 323','10:00 - 22:00','럭셔리한 웨딩홀, 다양한 연회 메뉴 제공','http://www.lavenderwedding.com','임페리얼팰리스서울','박준영','010-1111-2222','주차 가능 100대','02-1234-5678','홀 대여 1,000,000원| 식대 50,000원','123-45-67890','강남역 2호선','06164'),
      (1,1,0,1200000,1,17,'2층','서울특별시 강남구 가로수길 5 (신사동)','09:00 - 21:00','모던한 인테리어와 최신 음향 시설','http://www.grandwedding.com','상록아트홀','이서연','010-2222-3333','주차 가능 80대','032-5678-1234','홀 대여 1,200,000원| 식대 55,000원','234-56-78901','신사역 3호선','21431'),
      (2,1,1,500000,24,18,'청담웨딩프라자 3층','서울특별시 강남구 도산대로 434 (청담동)','10:00 - 20:00','화이트 컨셉 촬영 전문 스튜디오','http://www.whitestudio.com','화이트 스튜디오','정민수','010-4444-5555','주차 가능 30대','02-9876-5432','촬영 패키지 500,000원','345-67-89012','압구정로데오역 수인분당선','04547'),
      (3,31,0,200000,23,19,'3층','서울특별시 강남구 선릉로162길 12 (청담동)','11:00 - 19:00','고급 맞춤 웨딩드레스 대여 및 판매','http://www.princessdress.com','프린세스 드레스','김하영','010-6666-7777','주차 가능 20대','031-2345-6789','드레스 대여 200,000원','456-78-90123','압구정로데오역 수인분당선','41222'),
      (4,6,0,150000,16,20,'1층','서울특별시 강남구 압구정로60길 21 (청담동)','10:00 - 18:00','신부 웨딩 메이크업 및 헤어 스타일링 전문','http://www.beautymakeup.com','뷰티 메이크업','박지현','010-8888-9999','주차 가능 10대','051-3456-7890','웨딩 메이크업 150,000원','567-89-01234','압구정로데오역 수인분당선','48059'),
      (2,2,1,200000,3,21,'3층','인천광역시 미추홀구 예술로 456','10:00 - 20:00','감성적인 촬영을 제공하는 스튜디오입니다.','http://www.style-studio.com','스타일 스튜디오','이민호','010-3456-7890','전용 주차장 10대 가능','032-9876-1234','촬영 200,000원| 앨범 300,000원','210-56-12345','인천시청역 1호선','13579'),
      (4,3,0,100000,2,22,'2층','대전광역시 동구 중앙로 567','09:30 - 19:30','전문 아티스트가 맞춤 메이크업을 제공합니다.','http://www.beauty-makeup.com','박뷰티 메이크업','박예은','010-5678-9012','공용 주차장 이용 가능','042-1234-5678','신부 화장 150,000원| 일반 화장 100,000원','310-78-54321','중앙로역 대전1호선','54321'),
      (3,4,0,300000,1,23,'5층','대구광역시 남구 패션로 789','10:00 - 21:00','고급스러운 디자인의 웨딩 드레스 전문점입니다.','http://www.elegance-dress.com','엘레강스 드레스','김하늘','010-6789-0123','주차 타워 이용 가능','053-7890-1234','웨딩 드레스 500,000원| 턱시도 300,000원','410-98-76543','대구역 대구2호선','67890'),

      (1,1,1,1000000,15,24,'5층','서울특별시 서초구 강남대로 123','10:00 - 22:00','럭셔리한 웨딩홀, 다양한 연회 메뉴 제공','http://www.lavenderwedding.com','엘로라 인 가든','박준영','010-1111-2222','주차 가능 100대','02-1234-5678','홀 대여 1,000,000원| 식대 50,000원','123-45-67890','강남역 2호선','06164'),
      (1,2,0,1200000,8,25,'2층','인천광역시 연수구 센트럴로 45','09:00 - 21:00','모던한 인테리어와 최신 음향 시설','http://www.grandwedding.com','르비르모어 선릉','이서연','010-2222-3333','주차 가능 80대','032-5678-1234','홀 대여 1,200,000원| 식대 55,000원','234-56-78901','인천대입구역 1호선','21431'),
      (1,1,0,900000,16,26,'1층','서울특별시 성동구 광나루로 250 (성수동2가)','10:00 - 21:00','클래식한 분위기의 웨딩홀','http://www.classicwedding.com','현대웨딩홀','김도훈','010-3333-4444','주차 가능 60대','02-5678-9101','홀 대여 900,000원| 식대 45,000원','345-78-91023','성수역 2호선','04795'),
      (1,1,0,1300000,20,27,'3층','서울특별시 영등포구 시흥대로 599 (대림동)','10:30 - 21:30','프리미엄 웨딩홀, 최신 조명시설','http://www.premiumwedding.com','대림동웨딩홀','최지훈','010-4444-5555','주차 가능 90대','053-1234-5678','홀 대여 1,300,000원| 식대 60,000원','678-45-67890','대림역 1호선','07445'),
      (1,4,0,950000,4,28,'2층','대구광역시 동구 동대구로 418 (신천동)','09:30 - 20:00','바다 전망 웨딩홀, 감각적인 인테리어','http://www.oceanwedding.com','문화웨딩홀','박하나','010-5555-6666','주차 가능 50대','051-5678-4321','홀 대여 950,000원| 식대 52,000원','789-12-34567','동대구역 대구1호선','41253'),
      (1,2,0,1100000,3,29,'1층','인천광역시 미추홀구 미추홀대로 730 (주안동)','10:00 - 22:00','트렌디한 인테리어, 다양한 연회 메뉴 제공','http://www.trendywedding.com','고려웨딩홀','이지은','010-6666-7777','주차 가능 70대','062-2345-6789','홀 대여 1,100,000원| 식대 58,000원','890-23-45678','주안역 인천1호선','22135'),
      (1,5,0,1050000,2,30,'B1','광주광역시 남구 효덕로 299 (진월동)','10:00 - 21:00','모던한 인테리어, 실내 웨딩홀','http://www.modernwedding.com','유토피아웨딩홀','장우진','010-7777-8888','주차 가능 40대','052-3456-7890','홀 대여 1,050,000원| 식대 48,000원','901-34-56789','상무역 광주1호선','61742'),
      (1,5,0,1250000,5,31,'4층','광주광역시 서구 죽봉대로 12 (농성동)','09:00 - 20:30','화려한 조명과 인테리어','http://www.luxurywedding.com','라페스타웨딩홀','한수진','010-8888-9999','주차 가능 80대','042-6789-1234','홀 대여 1,250,000원| 식대 57,000원','012-45-67890','농성역 광주1호선','61935'),
      (1,1,0,1020000,16,32,'2층','서울특별시 성동구 고산자로 202 (행당동)','10:00 - 21:30','자연과 함께하는 웨딩홀','http://www.naturewedding.com','골든웨딩프라자예식장','오현우','010-9999-0000','주차 가능 30대','064-2345-6789','홀 대여 1,020,000원| 식대 49,000원','123-56-78901','왕십리역 2호선','04745'),
      (1,6,0,1150000,2,33,'1층','부산광역시 금정구 중앙대로1719번길 47 (부곡동)','10:00 - 21:00','현대적인 감각의 웨딩홀, 프리미엄 서비스 제공','http://www.elegantwedding.com','베뉴비안','신재훈','010-1122-3344','주차 가능 100대','02-7654-3210','홀 대여 1,150,000원| 식대 55,000원| 꽃장식 패키지 200,000원| 드레스 대여 500,000원','234-67-89123','남산정역 부산4호선','46277'),
      (1,6,0,980000,5,34,'B2','부산광역시 동구 중앙대로 201 (초량동)','09:00 - 20:30','해변과 가까운 로맨틱 웨딩홀','http://www.seasidewedding.com','더화이트베일','강하늘','010-2233-4455','주차 가능 80대','051-7654-3210','홀 대여 980,000원| 식대 50,000원| 특급 연회 메뉴 250,000원| 야외 웨딩 패키지 600,000원','345-67-89234','부산역 부산1호선','48816'),
      (1,6,0,1220000,6,35,'4층','부산광역시 동래구 충렬대로 63 (온천동)','10:00 - 22:00','럭셔리 인테리어, 최신 조명/음향 시스템','http://www.grandhallwedding.com','로얄호텔','윤서준','010-3344-5566','주차 가능 120대','053-6789-1234','홀 대여 1,220,000원| 식대 60,000원| 웨딩드레스 패키지 700,000원| 플라워 아트 300,000원','456-78-90345','온천장역 부산1호선','47724'),

      (2,1,0,500000,24,36,'B1','서울특별시 중구 남대문로 25 유준빌딩 3층','10:00 - 20:00','라틴어로 “입맞춤”이라는 뜻을 지닌 “Basium”은 순수하고 서정적인 로맨틱함을 고객님들의 사진 속에 담아 드리자 라는 뜻으로 만들어지게 되었습니다. 깔끔하고 심플한 인물위주의 촬영. 어린시절의 추억을.. 순수한 마음으로 사진에 다가가겠습니다.','http://www.lamangstudio.com','바시움 스튜디오','정민수','010-4444-5555','주차 가능 30대','02-9876-5432','촬영 패키지 500,000원| 액자 400,000원| 야외촬영 추가금 500,000원','345-67-89012','서울역 1호선','04547'),
      (2,1,0,600000,1,37,'2층','서울특별시 강남구 논현로136길 14 (논현동)','09:00 - 19:00','두 분의 스토리를 담는 웨딩스튜디오입니다. 커스터마이징을 통한 두 분 만의 사진을 , 스튜디오 샘플촬영처럼 시안제작 , 헤어메이크업 밀착케어 , 디렉터 참여 하여 만족도 높은 사진을 만듭니다.','http://www.modernstudio.com','듀안 스튜디오','이서연','010-5555-6666','주차 가능 50대','032-5678-4321','촬영 패키지 600,000원| 원본 사진 300,000원| 메이크업 추가 200,000원','234-78-90123','인천대입구역 1호선','21431'),
      (2,1,1,550000,1,38,'1층','서울특별시 강남구 강남대로128길 676층','10:30 - 21:30','간결함 속, 감성 가득한 사진 한장!! 당신이 생각하는 웨딩사진을 우리가 만들어드립니다.','http://studiofia.com/','빈티지 스튜디오','김도훈','010-6666-7777','주차 가능 40대','02-8765-4321','촬영 패키지 550,000원| 액자 300,000원| 스냅 추가 250,000원','678-45-67890','미아역 4호선','01023'),
      (2,1,0,750000,1,39,'3층','서울특별시 강남구 봉은사로 16길 37','09:00 - 18:30','로맨틱 감성 웨딩 촬영','http://www.romanticstudio.com','메종드힐','최지훈','010-7777-8888','주차 가능 60대','053-6789-5678','촬영 패키지 750,000원| 원본 사진 500,000원| 야외 촬영 400,000원','789-34-56789','중앙로역 1호선','41923'),
      (2,3,0,650000,3,40,'2층','대전광역시 서구 둔산중로 38 둔산메트로존','10:00 - 20:00','심플 모던 웨딩 촬영','http://www.simplewedding.com','아이엠스냅','박하나','010-8888-9999','주차 가능 30대','051-8765-4321','촬영 패키지 650,000원| 스냅 300,000원| 앨범 제작 450,000원','890-12-34567','시청역 대전1호선','48523'),
      (2,3,0,700000,3,41,'B1','대전광역시 서구 계룡로 568','09:30 - 21:30','빈티지 우아한 웨딩 촬영','http://www.elegantstudio.com','라마리에','이지은','010-9999-0000','주차 가능 35대','062-3456-9876','촬영 패키지 700,000원| 원본 사진 600,000원| 야외 촬영 350,000원','901-34-67890','탄방역 대전1호선','35269'),
      (2,3,0,800000,2,42,'1층','대전광역시 동구 대전로 494','10:00 - 20:00','클래식 감성 웨딩 촬영','http://www.classicwedding.com','클래식 웨딩 스튜디오','장우진','010-1111-2222','주차 가능 50대','052-6543-8765','촬영 패키지 800,000원| 원본 사진 500,000원| 메이크업 200,000원','012-45-67891','자차 이용 추천','45012'),
      (2,3,0,820000,5,43,'4층','대전광역시 중구 대종로 120','09:00 - 21:00','감각적인 무드의 웨딩 촬영. 웨딩 사진의 품격을 높이는 독창적인 컨셉과 최신 트렌드를 반영한 세련된 연출을 제공합니다. 웨딩 앨범을 더욱 특별하게 만드는 촬영 기법과 다채로운 소품 활용으로 차별화된 촬영 경험을 제공합니다.','http://www.creativestudio.com','크리에이티브 스튜디오','한예진','010-2222-3333','주차 가능 45대','042-6789-1234','촬영 패키지 820,000원| 원본 사진 550,000원| 프리미엄 앨범 700,000원| 야외 촬영 500,000원','345-67-89045','대전역 1호선', '32045'),
      (2,1,0,850000,15,44,'지하1층','서울 서초구 바우뫼로41길 38-3','09:30 - 21:00','스타일리시하면서도 감각적인 웨딩 촬영. 유니크한 연출과 세련된 컬러 톤을 활용하여 개성 넘치는 웨딩 사진을 제공합니다.','https://trend.modoo.at','트렌디 스튜디오','서지훈','010-3333-4444','주차 가능 60대','031-9876-5432','촬영 패키지 850,000원| 원본 사진 600,000원| 고급 앨범 750,000원| 야외 촬영 550,000원','456-78-90123','정자역 신분당선','13605'),
      (2,4,0, 700000, 8, 46, '5층', '대구광역시 중구 동덕로 16', '10:00 - 20:00', '인물과 배경 사진이 조화된 스튜디오입니다.', 'http://www.madivestudio.com', '스튜디오 샤이', '이철수', '010-2345-6789', '주차 가능 30대', '02-2345-6789', '촬영 패키지 700,000원| 액자 350,000원', '234-56-78901', '대봉교역 대구1호선', '06620'),
      (2,4,0, 550000, 8, 47, '5층', '대구광역시 중구 동덕로8길 14-6', '09:30 - 18:30', '모던한 인테리어와 최신 장비를 갖춘 스튜디오입니다.', 'http://www.modernstudio.com', '지민 스튜디오', '박미영', '010-3456-7890', '주차 가능 25대', '02-3456-7890', '촬영 패키지 550,000원| 액자 250,000원', '345-67-89012', '경대병원역 대구2호선', '05510'),
      (2,4,0, 650000, 8, 48, '5층', '대구광역시 중구 동덕로 33 청운맨션 상가 303호', '10:00 - 19:00', '빈티지한 분위기의 독특한 스튜디오입니다.', 'http://www.vintagestudio.com', '필루체', '최은주', '010-4567-8901', '주차 가능 15대', '02-4567-8901', '촬영 패키지 650,000원| 액자 300,000원', '456-78-90123', '대봉교역 대구1호선', '04050'),
      (2,6,0, 600000, 16, 49, '초이스빌딩 1, 3, 5, 7, 9층', '부산광역시 해운대구 송정광어골로 19-1 ', '09:00 - 18:00', '자연광을 활용한 따뜻한 분위기의 스튜디오입니다.', 'http://cafe.naver.com/busandals', '부산달빛스쿠터스튜디오', '김하늘', '010-5678-9012', '주차 가능 20대', '02-5678-9012', '촬영 패키지 600,000원| 액자 280,000원', '567-89-01234', '서울역 1호선', '04350'),
      (2,6,0, 750000, 7, 50, '5층', '부산광역시 부산진구 양지로5번길 6', '10:00 - 20:00', '럭셔리한 분위기의 프리미엄 스튜디오입니다.', 'http://celloi.com/', '첼로사진 스튜디오', '이수진', '010-6789-0123', '주차 가능 30대', '02-6789-0123', '촬영 패키지 750,000원| 액자 400,000원', '678-90-12345', '천호역 5호선', '05320');


INSERT INTO `vendors` (
    category_id, do_id, is_indoor, min_price, sigungu_code, user_id, address_detail, auto_road_address,
    business_hour, details, homepage, name, owner_name, owner_phone, parkinglot, phone, price,
    registration_number, subway, zonecode
) VALUES
      (3,1,0,200000,1,51,'1층 비비드블랑','서울 강남구 선릉로137길 5 (논현동)','11:00 - 19:00','클래식하고 고급스러운 라인부터 사랑스럽고 로맨틱한 라인 세련되고 트렌디한 라인까지 두루 만나실수 있습니다','www.bbdeblanc.com','비비드블랑','김하영','010-6666-7777','주차 가능 20대','031-2345-6789','드레스 대여 200,000원','456-78-90123','강남구청역 2호선','41222'),
      (3,1,0, 300000, 1, 52, '5층', '서울특별시 강남구 선릉로 727', '10:00 - 20:00', '클래식하고 고급스러운 드레스 라인 제공', 'http://www.brideyoung.com', '브라이드영', '김영희', '02-543-4729', '발렛파킹 가능', '02-543-4729', '드레스 대여 300,000원| 맞춤 제작 1,500,000원| 악세서리 대여 50,000원', '123-45-67890', '선릉역 2호선', '06150'),
      (3,1,0, 250000, 1, 53, '2층', '서울특별시 강남구 논현로 123', '11:00 - 19:00', '로맨틱하고 사랑스러운 드레스 컬렉션', 'http://www.romancedress.com', '로맨스드레스', '이수진', '010-1234-5678', '주차 가능 10대', '02-1234-5678', '드레스 대여 250,000원| 맞춤 제작 1,200,000원| 베일 대여 30,000원', '234-56-78901', '논현역 7호선', '06250'),
      (3,2,0, 280000, 4, 54, '3층', '인천광역시 남동구 예술로 198', '10:00 - 18:00', '모던하고 세련된 드레스 디자인 제공', 'http://www.moderndress.com', '모던드레스', '박지현', '010-2345-6789', '주차 가능 20대', '032-234-5678', '드레스 대여 280,000원| 맞춤 제작 1,300,000원| 티아라 대여 40,000원', '345-67-89012', '예술회관역 인천1호선', '21550'),
      (3,3,0, 320000, 3, 55, '1층', '대전광역시 서구 둔산로 123', '09:00 - 20:00', '우아하고 고전적인 드레스 컬렉션', 'http://www.elegantdress.com', '엘레강트드레스', '최은영', '010-3456-7890', '주차 가능 15대', '042-345-6789', '드레스 대여 320,000원| 맞춤 제작 1,400,000원| 장갑 대여 20,000원', '456-78-90123', '시청역 대전1호선', '35250'),
      (3,4,0, 350000, 7, 56, '2층', '대구광역시 수성구 동대구로 45', '10:00 - 19:00', '화려하고 독특한 드레스 디자인 제공', 'http://www.uniquedress.com', '유니크드레스', '김민주', '010-4567-8901', '주차 가능 25대', '053-456-7890', '드레스 대여 350,000원| 맞춤 제작 1,600,000원| 슈즈 대여 60,000원', '567-89-01234', '범어역 2호선', '42150'),
      (3,6,0, 270000, 16, 57, '3층', '부산광역시 해운대구 해운대로 570', '11:00 - 20:00', '심플하고 모던한 드레스 라인 제공', 'http://www.simpledress.com', '심플드레스', '박서연', '010-5678-9012', '주차 가능 30대', '051-567-8901', '드레스 대여 270,000원| 맞춤 제작 1,250,000원| 헤어피스 대여 35,000원', '678-90-12345', '해운대역 2호선', '48050'),
      (3,7,0, 290000, 2, 58, '1층', '울산광역시 남구 삼산로 200', '10:00 - 18:00', '빈티지하고 레트로한 드레스 컬렉션', 'http://www.vintagedress.com', '빈티지드레스', '이하은', '010-6789-0123', '주차 가능 20대', '052-678-9012', '드레스 대여 290,000원| 맞춤 제작 1,350,000원| 브로치 대여 25,000원', '789-01-23456', '삼산역 2호선', '44650'),
      (3,5,0, 310000, 5, 59, '2층', '광주광역시 서구 상무대로 100', '09:00 - 19:00', '세련되고 트렌디한 드레스 디자인 제공', 'http://www.trendydress.com', '트렌디드레스', '정예린', '010-7890-1234', '주차 가능 35대', '062-789-0123', '드레스 대여 310,000원| 맞춤 제작 1,450,000원| 이어링 대여 30,000원', '890-12-34567', '상무역 1호선', '61950'),
      (3,31,0, 310000, 12, 60, '1층', '경기도 성남시 분당구 황새울로 200', '10:00 - 19:30', '유럽 스타일 감성 드레스 전문', 'http://www.europeandress.com', '유럽드레스', '이소연', '010-1122-3344', '주차 가능 20대', '031-789-0123', '드레스 대여 310,000원| 맞춤 제작 1,500,000원| 베일 대여 40,000원', '789-12-34567', '서현역 분당선', '13650'),
      (3,32,0, 330000, 13, 61, '2층', '강원도 춘천시 중앙로 125', '09:00 - 18:30', '내추럴한 감성의 드레스 전문', 'http://www.naturaldress.com', '내추럴드레스', '김진희', '010-2233-4455', '주차 가능 15대', '033-987-6543', '드레스 대여 330,000원| 맞춤 제작 1,350,000원| 플라워 액세서리 대여 30,000원', '890-23-45678', '춘천역 경춘선', '24350'),
      (3,32,0, 290000, 13, 62, '3층', '강원도 춘천시 중앙로 125', '10:00 - 19:00', '심플하고 모던한 웨딩드레스', 'http://www.simplemodern.com', '심플모던드레스', '박지수', '010-3344-5566', '주차 가능 25대', '041-567-8901', '드레스 대여 290,000원| 맞춤 제작 1,250,000원| 헤어 장식 대여 35,000원', '901-34-56789', '천안아산역 1호선', '31050'),
    (3,3,0, 320000, 3, 63, '101호', '대전광역시 서구 도안중로305번안길 25', '10:00 - 20:30', '우아하고 럭셔리한 드레스 라인', 'http://www.luxurydress.com', '온다웨딩스튜디오', '한유진', '010-4455-6677', '주차 가능 30대', '063-789-0123', '드레스 대여 320,000원| 맞춤 제작 1,500,000원| 특별 장식 대여 50,000원', '012-45-67890', '탄방역 대전1호선', '55050'),
    (3,39,0, 340000, 4, 64, '4층', '제주특별자치도 제주시 중앙로 140', '09:30 - 19:30', '제주 자연과 함께하는 웨딩드레스', 'http://www.jejudress.com', '제주드레스', '오수연', '010-5566-7788', '주차 가능 20대', '064-234-5678', '드레스 대여 340,000원| 맞춤 제작 1,400,000원| 헤어밴드 대여 30,000원', '234-56-78901', '제주역 제주선', '63150'),
    (3,3,0, 340000, 4, 65, '3층', '대전광역시 유성구 봉명서로 11-9', '09:30 - 19:30', '최고의 사진을 선사합니다.', 'https://blog.naver.com/barabom_wedding', '바라봄웨딩스튜디오', '오수연', '010-5566-7788', '주차 가능 20대', '064-234-5678', '드레스 대여 340,000원| 맞춤 제작 1,400,000원| 헤어밴드 대여 30,000원', '234-56-78901', '제주역 제주선', '63150'),

      (4,1,0,150000,1,66,'7층','서울특별시 강남구 삼성로133길 15 (청담동, 근정 빌딩)','10:00 - 18:00','순수한 모습 그대로 아름다움을 연출하는 유림 메이크업 앤 헤어','http://www.beautymakeup.com','유림','박지현','010-8888-9999','주차 불가','051-3456-7890','웨딩 메이크업 150,000원','567-89-01234','강남역 2호선','48059'),
      (4,1,0,200000,1,67,'2층','서울특별시 강남구 도산대로 45길 10','09:00 - 19:00','트렌디한 스타일링을 제공하는 이엘 헤어메이크업','http://www.elhairmakeup.com','이엘 헤어메이크업','김은정','010-1234-5678','주차 가능 10대','02-1234-5678','웨딩 메이크업 200,000원','123-45-67890','압구정로데오역 분당선','06010'),
      (4,1,0,220000,1,68,'3층','서울특별시 강남구 선릉로 152길 18','10:00 - 20:00','럭셔리한 분위기의 메이크업 서비스를 제공하는 이가자헤어비스 청담본점','http://www.ikaja.com','이가자헤어비스 청담본점','이가자','010-2345-6789','주차 가능 15대','02-2345-6789','웨딩 메이크업 220,000원','234-56-78901','청담역 7호선','06020'),
      (4,1,0,250000,1,69,'4층','서울특별시 강남구 압구정로 80길 22','09:30 - 19:30','자연스러운 메이크업으로 유명한 제니하우스 청담힐','http://www.jennyhouse.co.kr','제니하우스 청담힐','제니김','010-3456-7890','주차 가능 20대','02-3456-7890','웨딩 메이크업 250,000원','345-67-89012','압구정역 3호선','06030'),
      (4,1,0,180000,1,70,'5층','서울특별시 강남구 논현로 175길 12','10:00 - 18:00','모던하고 세련된 스타일을 연출하는 라뷰티코아 청담점','http://www.labeautycore.com','라뷰티코아 청담점','라희정','010-4567-8901','주차 가능 12대','02-4567-8901','웨딩 메이크업 180,000원','456-78-90123','신사역 3호선','06040'),
      (4,1,0,210000,1,71,'6층','서울특별시 강남구 학동로 97길 8','09:00 - 20:00','클래식한 메이크업을 지향하는 손윤희 메이크업','http://www.sonyoonhee.com','손윤희 메이크업','손윤희','010-5678-9012','주차 가능 8대','02-5678-9012','웨딩 메이크업 210,000원','567-89-01234','학동역 7호선','06050'),
      (4,1,0,230000,1,72,'7층','서울특별시 강남구 도산대로 57길 16','10:30 - 19:30','우아하고 고급스러운 메이크업을 제공하는 정샘물 인스피레이션','http://www.jungsaemmool.com','정샘물 인스피레이션','정샘물','010-6789-0123','주차 가능 20대','02-6789-0123','웨딩 메이크업 230,000원','678-90-12345','신사역 3호선','06060'),
      (4,1,0,190000,1,73,'8층','서울특별시 강남구 언주로 164길 20','09:00 - 19:00','내추럴한 메이크업을 선호하는 이희 헤어앤메이크업','http://www.leehairmakeup.com','이희 헤어앤메이크업','이희','010-7890-1234','주차 가능 15대','02-7890-1234','웨딩 메이크업 190,000원','789-01-23456','언주역 9호선','06070'),
      (4,2,0,160000,2,74,'2층','인천광역시 남동구 예술로 198','10:00 - 18:00','모던하고 세련된 메이크업을 제공하는 모던뷰티','http://www.modernbeauty.com','모던뷰티','박지현','010-2345-6789','주차 가능 20대','032-234-5678','웨딩 메이크업 160,000원','345-67-89012','예술회관역 인천1호선','21550'),
      (4,3,0,170000,3,75,'3층','대전광역시 서구 둔산로 123','09:00 - 20:00','우아하고 고전적인 메이크업을 제공하는 엘레강트뷰티','http://www.elegantbeauty.com','엘레강트뷰티','최은영','010-3456-7890','주차 가능 15대','042-345-6789','웨딩 메이크업 170,000원','456-78-90123','시청역 대전1호선','35250'),
    (4,6,0,190000,16,76,'1층','부산광역시 해운대구 해운대로 570','10:00 - 19:30','프리미엄 메이크업 서비스를 제공하는 루미에르 뷰티살롱','http://www.lumierebeauty.com','루미에르 뷰티살롱','박서연','010-5678-9012','주차 가능 30대','051-567-8901','웨딩 메이크업 190,000원','678-90-12345','해운대역 2호선','48050'),
    (4,5,0,200000,5,77,'2층','광주광역시 서구 상무대로 100','09:30 - 18:30','내추럴한 아름다움을 강조하는 레이첼 뷰티살롱','http://www.rachelbeauty.com','레이첼 뷰티살롱','이하은','010-6789-0123','주차 가능 20대','062-678-9012','웨딩 메이크업 200,000원','789-01-23456','상무역 1호선','61950'),
    (4,7,0,185000,2,78,'3층','울산광역시 남구 삼산로 200','10:00 - 20:00','트렌디한 스타일링을 제공하는 보떼헤어메이크업','http://www.beautehm.com','보떼 헤어메이크업','정예린','010-7890-1234','주차 가능 35대','052-789-0123','웨딩 메이크업 185,000원','890-12-34567','삼산역 2호선','44650'),
    (4,31,0,195000,12,79,'1층','경기도 성남시 분당구 황새울로 200','10:00 - 19:30','우아한 스타일을 연출하는 벨르 뷰티살롱','http://www.bellebeauty.com','벨르 뷰티살롱','이소연','010-1122-3344','주차 가능 20대','031-789-0123','웨딩 메이크업 195,000원','789-12-34567','서현역 분당선','13650'),
    (4,39,0,210000,4,80,'2층','제주특별자치도 제주시 중앙로 140','09:00 - 18:30','제주의 자연과 함께하는 웨딩 메이크업 전문, 하이앤드 뷰티','http://www.highendbeauty.com','하이앤드 뷰티','김진희','010-2233-4455','주차 가능 15대','064-987-6543','웨딩 메이크업 210,000원','890-23-45678','제주역 제주선','63150');



INSERT INTO schedules (schedule_id, start_date_time, end_date_time, title, customer_id, vendor_id, dtype, category_id) VALUES
 -------------본인 상담---------------
    (1, '2025-02-10 10:00:00', '2025-02-10 12:00:00', '웨딩 촬영 상담', 1, 16, 'consultation', 2),

    (2, '2025-02-15 14:00:00', '2025-02-15 16:00:00', '웨딩홀 계약 완료', 1, 16, 'contract', 1),
    (3, '2025-02-20 13:00:00', '2025-02-20 15:00:00', '웨딩홀 계약 완료', 1, 16, 'middle_process', 1),
    (4, '2026-02-20 13:00:00', '2025-02-20 15:00:00', '웨딩홀 점검', 1, 16, 'middle_process', 1),
    (5, '2026-03-21 13:00:00', '2025-02-20 15:00:00', '웨딩홀 리허설', 1, 16, 'middle_process', 1),
    (6, '2026-03-22 09:00:00', '2026-03-22 15:00:00', '본식', 1, 16, 'middle_process', 1),
    (7, '2025-02-15 14:00:00', '2025-02-15 16:00:00', '메이크업 상담', 11, 20, 'consultation', 4),
    (8, '2025-02-20 13:00:00', '2025-02-20 15:00:00', '기타 일정', 1, null, 'other_schedule', 5),
    (9, '2025-02-20 13:00:00', '2025-02-20 15:00:00', '웨딩홀 상담', 1, 16, 'consultation', 1),

    (10, '2025-02-25 14:00:00', '2025-02-25 16:00:00', '스튜디오 계약', 1, 18, 'contract', 2),
    (11, '2025-02-25 13:00:00', '2025-02-25 15:00:00', '계약 완료', 1, 18, 'middle_process', 2),
    (12, '2025-04-20 13:00:00', '2025-04-20 15:00:00', '웨딩촬영용 드레스 셀렉', 1, 18, 'middle_process', 2),
    (13, '2025-05-24 13:00:00', '2025-05-24 15:00:00', '웨딩촬영용 드레스 가봉', 1, 18, 'middle_process', 2),
    (14, '2025-07-12 13:00:00', '2025-07-12 15:00:00', '배송중', 1, 18, 'middle_process', 2),
    (15, '2025-09-24 13:00:00', '2025-09-24 15:00:00', '배송완료', 1, 18, 'middle_process', 2),
    (16, '2025-10-03 13:00:00', '2025-10-03 15:00:00', '본식용 드레스 셀렉', 1, 18, 'middle_process', 2),
    (17, '2025-12-20 13:00:00', '2025-12-20 15:00:00', '본식용 드레스 가봉', 1, 18, 'middle_process', 2),
    (18, '2026-01-20 13:00:00', '2026-01-20 15:00:00', '배송중', 1, 18, 'middle_process', 2),
    (19, '2026-02-21 13:00:00', '2026-02-21 15:00:00', '배송완료', 1, 18, 'middle_process', 2),
    (20, '2026-03-22 09:00:00', '2026-03-23 15:00:00', '본식', 1, 18, 'middle_process', 2),

    (21, '2025-02-25 14:00:00', '2025-02-25 16:00:00', '드레스 계약', 1, 19, 'contract', 3),
    (22, '2025-02-25 13:00:00', '2025-02-25 15:00:00', '계약 완료', 1, 19, 'middle_process', 3),
    (23, '2025-04-20 13:00:00', '2025-04-20 15:00:00', '웨딩쵤영', 1, 19, 'middle_process', 3),
    (24, '2025-05-24 13:00:00', '2025-05-24 15:00:00', '사진 셀렉', 1, 19, 'middle_process', 3),
    (25, '2025-07-12 13:00:00', '2025-07-12 15:00:00', '사진 수정', 1, 19, 'middle_process', 3),
    (26, '2025-09-24 13:00:00', '2025-09-24 15:00:00', '2차 수정', 1, 19, 'middle_process', 3),
    (27, '2025-10-03 13:00:00', '2025-10-03 15:00:00', '액자/앨범 제작 완료', 1, 19, 'middle_process', 3),
    (28, '2025-12-20 13:00:00', '2025-12-20 15:00:00', '계약 액자/앨범 수령', 1, 19, 'middle_process', 3),
    (29, '2026-03-23 09:00:00', '2026-03-23 15:00:00', '본식 스냅', 1, 19, 'middle_process', 3),

    (30, '2025-07-22 14:00:00', '2025-07-22 16:00:00', '메이크업 계약', 1, 20, 'contract', 4),
    (31, '2025-05-21 13:00:00', '2026-05-22 13:00:00', '계약 완료', 1, 20, 'middle_process', 4),
    (32, '2025-05-30 13:00:00', '2026-05-30 13:00:00', '웨딩촬영 메이크업', 1, 20, 'middle_process', 4),
    (33, '2026-03-23 09:00:00', '2026-03-23 15:00:00', '본식 메이크업', 1, 20, 'middle_process', 4),

---------------- 커플 상담 -----------------
 (34, '2025-03-23 13:00:00', '2025-03-23 14:00:00', '웨딩홀 상담', 11, 24, 'consultation', 1),
 (35, '2025-04-07 10:00:00', '2025-04-07 11:00:00', '스튜디오 상담', 11, 36, 'consultation', 2),
 (36, '2025-03-25 13:00:00', '2025-03-25 14:00:00', '드레스 상담', 11, 51, 'consultation', 3),
 (37, '2025-03-23 13:00:00', '2025-03-23 14:00:00', '메이크업 상담', 11, 66, 'consultation', 4),
 (38, '2025-03-25 13:00:00', '2025-03-25 14:00:00', '웨딩홀 상담', 11, 25, 'consultation', 1),
 (39, '2025-03-26 14:00:00', '2025-03-26 15:00:00', '스튜디오 상담', 11, 37, 'consultation', 2),
 (40, '2025-04-02 15:00:00', '2025-04-02 16:00:00', '드레스 상담', 11, 52, 'consultation', 3),
 (41, '2025-04-03 16:00:00', '2025-04-03 17:00:00', '메이크업 상담', 11, 67, 'consultation', 4),
(42, '2025-03-25 17:00:00', '2025-03-25 18:00:00', '웨딩홀 상담', 11, 26, 'consultation', 1),
(43, '2025-05-22 14:00:00', '2025-03-22 15:00:00', '스튜디오 상담', 11, 38, 'consultation', 2),
(44, '2025-04-02 13:00:00', '2025-04-02 13:00:00', '드레스 상담', 11, 53, 'consultation', 3),
(45, '2025-05-04 13:00:00', '2025-05-04 13:00:00', '메이크업 상담', 11, 68, 'consultation', 4);

INSERT INTO consultations (schedule_id, request) VALUES
    (1, '드레스 선택과 메이크업 상담을 원합니다.'),
    (9, '메이크업 해줘잉.'),
    (34, '웨딩홀 대관 시 최소 보증 인원과 최대 수용 인원 정보를 원합니다.'),
    (35, '웨딩 촬영 패키지 종류와 포함된 서비스 설명이 필요합니다.'),
    (36, '액세서리(베일, 장갑, 티아라 등) 대여 여부를 확인하고 싶습니다.'),
    (37, '웨딩 촬영용 메이크업과 본식 메이크업 차이를 알고 싶습니다.'),
    (38, '예식 진행 방식(동시예식, 분리예식, 단독예식) 안내가 필요합니다.'),
    (39, '촬영 가능 시간과 소요 시간을 알고 싶습니다.'),
    (40, '신랑 예복 대여 또는 맞춤 제작 옵션을 알고 싶습니다.'),
    (41, '피부톤과 어울리는 메이크업 스타일 추천을 받고 싶습니다.'),
    (42, '주차 가능 대수 및 이용 요금을 확인하고 싶습니다.'),
    (43, '메이크업 및 헤어 스타일링 서비스 포함 여부를 알고 싶습니다.'),
    (44, '드레스 컬렉션을 둘러보고 상담받고 싶습니다.'),
    (45, '웨딩 메이크업 및 헤어 스타일링 상담을 원합니다.');

INSERT INTO contracts (schedule_id, price, detail) VALUES
    (2, 5000000, '웨딩 홀'),
    (10, 5000000, '스튜디오'),
    (21, 5000000, '드레스!'),
    (30, 5000000, '메이크업');


INSERT INTO middle_processes (schedule_id, middle_process_step_id, status, detail, contract_id, complete_date_time) VALUES
-- 웨딩홀 관련 진행 단계
(3, 1, 'COMPLETED', '계약 완료', 2, '2025-02-25 13:00:00'),
(4, 2, 'COMPLETED', '웨딩홀 점검', 2, '2025-02-20 13:00:00'),
(5, 3, 'PENDING', '웨딩홀 리허설', 2, null),
(6, 4, 'PENDING', '본식', 2, null),

-- 📸 스튜디오 (category_id = 2)
(11, 11, 'COMPLETED', '계약 완료', 10, '2025-04-20 13:00:00'),
(12, 12, 'COMPLETED', '웨딩촬영용 드레스 셀렉', 10, '2025-05-24 13:00:00'),
(13, 13, 'COMPLETED', '웨딩촬영용 드레스 가봉', 10, '2025-07-12 13:00:00'),
(14, 14, 'PENDING', '배송중', 10, null),
(15, 15, 'PENDING', '배송완료', 10, null),
(16, 16, 'PENDING', '본식용 드레스 셀렉', 10, null),
(17, 17, 'PENDING', '본식용 드레스 가봉', 10, null),
(18, 18, 'PENDING', '배송중', 10, null),
(19, 19, 'PENDING', '배송완료', 10, null),
(20, 20, 'PENDING', '본식', 10, null),

-- -- 👗 드레스 (category_id = 3)
(22, 21, 'COMPLETED', '계약 완료', 21, '2025-02-25 13:00:00'),
(23, 22, 'COMPLETED', '웨딩촬영', 21, '2025-04-20 13:00:00'),
(24, 23, 'COMPLETED', '사진 셀렉', 21, '2025-05-24 13:00:00'),
(25, 24, 'PENDING', '사진 수정', 21, null),
(26, 25, 'PENDING', '2차 수정', 21, null),
(27, 26, 'PENDING', '액자/앨범 제작 완료', 21, null),
(28, 27, 'PENDING', '계약 액자/앨범 수령', 21, null),
(29, 28, 'PENDING', '본식 스냅', 21, null),

-- 💄 메이크업 (category_id = 4)
(31, 31, 'COMPLETED', '계약 완료', 30, '2025-05-21 13:00:00'),
(32, 32, 'PENDING', '웨딩촬영 메이크업', 30, null),
(33, 33, 'PENDING', '본식 메이크업', 30, null);

INSERT INTO other_schedules (schedule_id, detail) VALUES
    (8, '신혼여행 일정 논의');

INSERT INTO `reviews` (review_id, customer_id, vendor_id, created_at, updated_at, content) VALUES
    (1,1,16,'2025-02-10 06:46:22.998077',NULL,'분위기도 좋고 음식도 좋았는데 무엇보다 금액대가 정말정말 파격적이었어요ㅎㅎ 놓치기 싫어서 우선 바로 홀딩해놨고 특이사항없으면 바로 계약 할것같아요ㅎㅎ'),
    (2,2,16,'2025-02-10 06:46:43.161904',NULL,'밝은 소규모 하우스웨딩을 선호해서 멀리 생활권이 아닌 강동까지 가게 되었는데요 생화도 예쁘고 아기자기해서 좋았어요 상담도 너무 친절하시고 버진로드도 직접 걸어볼 수 있게 해주셨어요! 둘 중에는 어두운 홀이 호불호가 적을 것으로 보입니다!'),
    (3,3,16,'2025-02-10 06:46:54.005500',NULL,'예비신랑이 하객으로 예전에 왔을때 층고가 낮았다고 해서 큰 기대는 안했었는데 최근에 마이더스홀 층고를 높였더라구요!! 어두운홀을 선호해서 블랙스톤홀 보고 마이더스홀 봤는데 너무너무 이뻐서 생각이 바로 바뀌었어요ㅋㅋㅋㅋㅋ 내년 7월-8월에 블랙스톤홀도 층고 높이는 공사 들어간다고 해서 기대가 되요!!'),
    (4,4,16,'2025-02-10 06:46:54.005500',NULL,'구성은 되게 많더라구요! 연회장이 2층, 4층으로 분리되어있는데 2층은 350석씩 반반 나뉘어져 있어서 다른 하객분들끼리 부딪힐 일은 거의 없어보여서 좋았고 4층은 400석으로 단독으로 쓴다구 하시더라구요!음식은 맛있다고 들었어요'),
    (5,5,16,'2025-02-10 06:46:54.005500',NULL,'음식 구성은 생각보다 다양하지는 않고 메인 메뉴가 애매해서 결정하는 데 큰 역할을 했어요 다만 상담할 때 주신 다과와 서비스는 너무 감사했습니다 디저트는 특히 맛있어 보였어요'),
    (6,6,16,'2025-02-10 06:46:54.005500',NULL,'강동에서 제일 유명한 예식장이라서 그런지 사람도 많고건물 일부분만 사용한 예식장인데도 깔끔해서 분리된 예식장 분위기가 났어요!!'),
    (7,7,16,'2025-02-10 06:46:54.005500',NULL,'서비스가 진짜 너무너무 좋으셨어요 예식이 많은 정신없는 주말에 상담을 갔는데도 상담하는 공간이 분리가 잘 되어있어서 편하개 상담 받을 수 있었고 과일이랑 차도 주셨어용'),
    (8,8,16,'2025-02-10 06:46:54.005500',NULL,'아직 홀 투어를 끝내지 못해 계약을 하게 될지는 모르겠으나 예약금은 걸어둔 식장입니다. 저는 결혼식은 하는거에 의미를 두려고해서 최대한 힘빼고 하려는 파여서 가격적인 메리트가 가장 컸고 거기에 식사까지 맛있으니 금상첨화라고 생각했지만 막상 다른 업체 홀들을 보니 확실히 아쉬움이 느껴져 고민하고 있습니다.'),
    (9,9,16,'2025-02-10 06:46:54.005500',NULL,'가성비 너무나 좋은 홀이라고 생각해요. 위치와 가격이 너무 좋고. 무엇보다 음식도요. 홀 분위기도 마음에 들구요. 투어 아예 안하고 여기 한 곳 다녀오고 바로 예약했어요.'),
    (10,10,16,'2025-02-10 06:46:54.005500',NULL,'저희는 화이트홀로 보고있어 마이더스홀로 계약했어요! 천고가 낮아서 고민했는데 7~8월에 리모델링? 들어가서 천고가 조금은 높아진다고 하더라구용 🙂'),
    (11,11,16,'2025-02-10 06:46:54.005500',NULL,'저희가 투어갔던 곳중 금액이나 혜택면에서는 가장 파격적이고 좋은 견적을 주셨는데 홀투어 했던 곳중 위치상 더 가깝고 좋은 선택지가 있어서 아쉽지만 선택하지 않았어요.'),
    (12,12,16,'2025-02-10 06:46:54.005500',NULL,'들러주신 하객분들이 만족할만한 결혼식장 찾으신다면 적극추천합니다. 이전에 제가 하객으로 방문했을때 밥이 맛있어서 결혼식에 대한 전반적인 인상이 좋았던 기억이 있거든요. 가격도 합리적이고 지방에 본가가 있으신 분들에게도 위치가 무척 좋은 곳이라고 생각해요.'),
    (13,13,16,'2025-02-10 06:46:54.005500',NULL,'서울 역세권이지만 진짜 말도 안되는 대관료에 상담해주시는 실장님도 친절하시고 음식도 괜찮더라구요 강동 예식장 고민하시는분들 상담이라도 받아보세요^^'),
    (14,14,16,'2025-02-10 06:46:54.005500',NULL,'다른 좋다는 후기를 보고 갔어도 제 눈으로 봐야지 정확한거니까! 방문해보니 위치도 좋았고, 직원분들도 친절하셨고, 연회장도 넓고 최종계약한거 만족합니다!'),
    (15,15,16,'2025-02-10 06:46:54.005500',NULL,'웨딩홀에 대해서 설명해주신 남자 직원분은 친절도 하시고 자세하게 알려주시고 안내해주셔서 감사했고, 상담실장님도 친절하셨어요~'),
    (16,14,16,'2025-02-10 06:46:54.005500',NULL,'2개의 홀이있었는데 전체적으로 많이 크고 웅장한 느낌은 아니었지만 밝은 홀과 어두운홀이 있는데 어두운홀인 블랙스톤홀이 마음에 들어서 계약했습니다^^'),
    (17,13,16,'2025-02-10 06:46:54.005500',NULL,'지방 하객이 많아 교통편만 보고 갔지만 전체적으로 다 작은 느낌을 받았아요 100명 정도 스몰웨딩 원하시는 분들은 정말정말 만족 하실거에요 식장, 로비,연회장 다 작습니다^^'),
    (18,12,16,'2025-02-10 06:46:54.005500',NULL,'우선 저는 평일에 상담을 갔는데요 기업행사 때문에 식장을 못본다는 제일 큰 단점이 있었어요 다행이도(?) 문이 열려있어서 공간은 볼수 있었는데 하객 정말 적은 스몰웨딩 원하시는 분들이 하셔야 할거 같아요 정말 작아요 그리고 신부입장시 대기실에서 바로 입장인데 바로 버진로드가 아니라 꺾어 들어가야 하는 부분도 좀 아쉬웠네요'),
    (19,11,16,'2025-02-10 06:46:54.005500',NULL,'음식은 먹어보지는 않았지만 후기에는 맛있다고들 하는것 같아요 다만 연회장 느낌이라기 보단 약간 작은 호텔 레스토랑 느낌이라 너무 붐빌것 같아요'),
    (20,10,16,'2025-02-10 06:46:54.005500',NULL,'상담직원이 항상 있는건 아닌가봐요 아무도 없어서 좀 기다렸다가 상담받았어요 그치만 친절하셨고 가격 대비 홀이 아쉬워서 계약은 안했습니다!'),
    (21,9,16,'2025-02-10 06:46:54.005500',NULL,'장점 1. 가성비 호텔 결혼식 할 수 있음 2. 호텔이 너무 깔끔하고 신식에다가 가는 곳마다 향기남 3. 광명역 근처라 지방 하객도 편하게 모실 수 있음 4. 광명이라 도로도 넓직하고 번잡스럽지 않음 5. 꽃 장식이 너무 예쁨 단점 1. 홀이 너무 작음.... 애초에 컨퍼런스룸으로 만든 곳 웨딩홀로 개조한거 같음... 직장+친구+친척 절대 못 올 크기.. 하지만 오히려 100명 안쪽으로 스몰웨딩 하고 싶으신 분들은 좋을 수도! 2. 신부 입장문이 정중앙이 아니고 오른편에 치우친 느낌. 그래서 사알짝 쪽방에서 나오는 그런 느낌...'),
    (22,8,16,'2025-02-10 06:46:54.005500',NULL,'진짜 식장이 작은거만 빼면 정말 정말 너무너무 하고 싶은 곳이에요. 조잡한 예식장이 아니라, 깔끔하고 세련된 호텔 내 웨딩홀이어서 아주 마음에 들었어요ㅜㅜ 인테리어도 너무 예쁘고, 꽃 장식도 너무 풍성하고, 향기도 너무 좋았고요ㅜㅠ 근데 식장이 작은게... 이게 저한테는 너무 큰 단점이었어요.. 200명정도 수용 가능하다고 하시는데 앉는 테이블이 12테이블, 앉을 수 있는 인원이 총 120명이어서.. 인싸가 아닌 저도 작아서 못할거 같은 크기에요ㅠㅠ.. 그리고 뒷 공간도 좁아서 나머지 서 있는 인원들도 구겨져서 보셔야할거 같아요ㅠㅠ 식장이 애초에 웨딩홀을 목적으로 만들어진게 아니라 큰 컨퍼런스룸? 으로 만들어진 느낌이에요ㅜㅜ 그리고 신부 입장문이 정중앙이 아니고 오른편에 치우쳐 있어서 가뜩이나 좁은데 사람들 비켜서 버진로드를 걸어야할 거 같은 느낌.. ㅠㅠ 이것만 빼면 진짜 너무너무 여기서 하고 싶어요..'),
    (23,7,16,'2025-02-10 06:46:54.005500',NULL,'지방하객이 있고 경기권에 거주하고 있어 찾던 중 KTX광명과 가까운 테이크호텔에 방문했습니다. 전체적으로 여유로운 공간이 좋았고, 단독홀이라 그 점도 마음에 들었습니다. 홀은 꽃장식이 매우 인상깊었고 신부대기실의 꽃도 마음에 들었습니다. 상담사분이 말씀해주신 것처럼 150-250명 정도가 딱 웨딩하기 좋아 보였습니다. 다만 버진로드가 조금 더 길면 좋겠다는 생각은 했습니다. 음식은 호텔에 있는 레스토랑을 이용하는거라 음식 퀄리티가 좋았습니다. 레스토랑 천고도 높고 통창인 점도 장점인거같습니다. 주차는 지하8층까지 3000대 주차가 가능하다고 하니 주차 걱정은 안해도 될거같더라구요. 호텔 대비 금액대가 괜찮은데.. 음주류가 별도라 그 점은 좀 아쉽습니다.'),
    (25,6,16,'2025-02-10 06:46:54.005500',NULL,'주차와 밥에 대한 장점이 큰 웨딩홀입니다. (주차 약 3000대 이상 단독홀, 뷔페 퀄리티) 로비도 넉넉하고 깔끔해서 북적거리지 않아서 좋아요. 150명 보증인원 가능하고 23년 24년 견적이 많이 달라서 꼭 비교해보세요~ 신부입장은 실크커튼을 열고 나와서 당황했네요. 버진로드에서부터 시작할 수도 있다고하지만 단점이네요. (사진상 꽃은 꽃포장 나간 뒤 상태라고하네요)');

-- Review Image
INSERT INTO `images` (image_id, order_index, review_id, vendor_id, created_at, image_url, image_type)
VALUES (1, 1, 1, null, null, 'https://my-vendor-images.s3.ap-northeast-2.amazonaws.com/IMG_1171.png', 'REVIEW'),
       (2, 2, 1, null, null, 'https://my-vendor-images.s3.ap-northeast-2.amazonaws.com/IMG_1171.png', 'REVIEW'),
       (3, 1, 2, null, null, 'https://my-vendor-images.s3.ap-northeast-2.amazonaws.com/IMG_1171.png', 'REVIEW');

-- Vendor Image
INSERT INTO `images` (image_id, order_index, review_id, vendor_id, created_at, image_url, image_type)
VALUES (4, 1, null, 16, null, 'https://my-vendor-images.s3.ap-northeast-2.amazonaws.com/IMG_1171.png', 'VENDOR'),
       (5, 2, null, 16, null, 'https://my-vendor-images.s3.ap-northeast-2.amazonaws.com/IMG_1171.png', 'PANORAMA'),
       (6, 3, null, 16, null, 'https://my-vendor-images.s3.ap-northeast-2.amazonaws.com/IMG_1171.png', 'PANORAMA');

