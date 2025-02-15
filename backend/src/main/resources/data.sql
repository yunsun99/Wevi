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
(80, '2024-06-28 00:00:00.0', '2024-06-28 22:40:47.0', 'vendor', NULL, NULL, 'hanbatuniversity@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(81, '2024-06-28 00:00:00.0', '2024-06-28 22:40:47.0', 'customer', NULL, NULL, 'customer81@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(82, '2024-06-28 00:00:00.0', '2024-06-28 22:40:47.0', 'customer', NULL, NULL, 'customer82@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(83, '2024-06-28 00:00:00.0', '2024-06-28 22:40:47.0', 'customer', NULL, NULL, 'customer83@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(84, '2024-06-28 00:00:00.0', '2024-06-28 22:40:47.0', 'customer', NULL, NULL, 'custome84@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(85, '2024-06-28 00:00:00.0', '2024-06-28 22:40:47.0', 'customer', NULL, NULL, 'customer85@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(86, '2024-06-28 00:00:00.0', '2024-06-28 22:40:47.0', 'customer', NULL, NULL, 'customer86@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(87, '2024-06-28 00:00:00.0', '2024-06-28 22:40:47.0', 'customer', NULL, NULL, 'customer87@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(88, '2024-06-28 00:00:00.0', '2024-06-28 22:40:47.0', 'customer', NULL, NULL, 'customer88@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(89, '2024-06-28 00:00:00.0', '2024-06-28 22:40:47.0', 'customer', NULL, NULL, 'customer89@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE'),
(90, '2024-06-28 00:00:00.0', '2024-06-28 22:40:47.0', 'customer', NULL, NULL, 'customer90@daum.net', '$2b$12$U//f0dZQVdYxl3k/Spodoee.uxol1raohEAhnrq9FtfDl575v02ya', 'ACTIVE');


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
(15, NULL, '405호', '제주특별자치도 제주시 연동 240', '다솜', '다솜', '010-6789-0123', '63124'),
(81, NULL, '405호', '제주특별자치도 제주시 연동 240', '오오호옹', '오오호옹', '010-6789-0123', '63124'),
(82, NULL, '405호', '제주특별자치도 제주시 연동 240', '민수씨', '민수씨', '010-6789-0123', '63124'),
(83, NULL, '405호', '제주특별자치도 제주시 연동 240', '쌔피', '쌔피', '010-6789-0123', '63124'),
(84, NULL, '405호', '제주특별자치도 제주시 연동 240', '호이엥', '호이엥', '010-6789-0123', '63124'),
(85, NULL, '405호', '제주특별자치도 제주시 연동 240', '소리아', '소리아', '010-6789-0123', '63124'),
(86, NULL, '405호', '제주특별자치도 제주시 연동 240', '소리아', '메이플', '010-6789-0123', '63124'),
(87, NULL, '405호', '제주특별자치도 제주시 연동 240', '소리아', '실버5', '010-6789-0123', '63124'),
(88, NULL, '405호', '제주특별자치도 제주시 연동 240', '소리아', '덴티메이트', '010-6789-0123', '63124'),
(89, NULL, '405호', '제주특별자치도 제주시 연동 240', '소리아', '하지마', '010-6789-0123', '63124'),
(90, NULL, '405호', '제주특별자치도 제주시 연동 240', '소리아', '오이으', '010-6789-0123', '63124');

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
    -- 웨딩홀
    (1,1,16,'2024-07-15 14:32:10.123',NULL,'분위기도 좋고 음식도 좋았는데 무엇보다 금액대가 정말정말 파격적이었어요ㅎㅎ 놓치기 싫어서 우선 바로 홀딩해놨고 특이사항없으면 바로 계약 할것같아요ㅎㅎ'),
    (2,2,16,'2024-03-08 09:21:43.987',NULL,'밝은 소규모 하우스웨딩을 선호해서 멀리 생활권이 아닌 강동까지 가게 되었는데요 생화도 예쁘고 아기자기해서 좋았어요 상담도 너무 친절하시고 버진로드도 직접 걸어볼 수 있게 해주셨어요! 둘 중에는 어두운 홀이 호불호가 적을 것으로 보입니다!'),
    (3,3,16,'2024-09-22 19:55:30.654',NULL,'예비신랑이 하객으로 예전에 왔을때 층고가 낮았다고 해서 큰 기대는 안했었는데 최근에 마이더스홀 층고를 높였더라구요!! 어두운홀을 선호해서 블랙스톤홀 보고 마이더스홀 봤는데 너무너무 이뻐서 생각이 바로 바뀌었어요ㅋㅋㅋㅋㅋ 내년 7월-8월에 블랙스톤홀도 층고 높이는 공사 들어간다고 해서 기대가 되요!!'),
    (4,4,16,'2024-11-05 21:12:44.789',NULL,'구성은 되게 많더라구요! 연회장이 2층, 4층으로 분리되어있는데 2층은 350석씩 반반 나뉘어져 있어서 다른 하객분들끼리 부딪힐 일은 거의 없어보여서 좋았고 4층은 400석으로 단독으로 쓴다구 하시더라구요!음식은 맛있다고 들었어요'),
    (5,5,16,'2024-06-30 08:05:55.321',NULL,'음식 구성은 생각보다 다양하지는 않고 메인 메뉴가 애매해서 결정하는 데 큰 역할을 했어요 다만 상담할 때 주신 다과와 서비스는 너무 감사했습니다 디저트는 특히 맛있어 보였어요'),
    (6,6,16,'2024-10-12 10:45:32.567',NULL,'근방에서 제일 유명한 예식장이라서 그런지 사람도 많고건물 일부분만 사용한 예식장인데도 깔끔해서 분리된 예식장 분위기가 났어요!!'),
    (7,7,16,'2024-04-25 13:29:18.876',NULL,'서비스가 진짜 너무너무 좋으셨어요 예식이 많은 정신없는 주말에 상담을 갔는데도 상담하는 공간이 분리가 잘 되어있어서 편하개 상담 받을 수 있었고 과일이랑 차도 주셨어용'),
    (8,8,16,'2024-06-12 13:29:18.876',NULL,'아직 홀 투어를 끝내지 못해 계약을 하게 될지는 모르겠으나 예약금은 걸어둔 식장입니다. 저는 결혼식은 하는거에 의미를 두려고해서 최대한 힘빼고 하려는 파여서 가격적인 메리트가 가장 컸고 거기에 식사까지 맛있으니 금상첨화라고 생각했지만 막상 다른 업체 홀들을 보니 확실히 아쉬움이 느껴져 고민하고 있습니다.'),
    (9,9,16,'2024-04-15 13:29:18.876',NULL,'가성비 너무나 좋은 홀이라고 생각해요. 위치와 가격이 너무 좋고. 무엇보다 음식도요. 홀 분위기도 마음에 들구요. 투어 아예 안하고 여기 한 곳 다녀오고 바로 예약했어요.'),
    (10,10,16,'2024-08-22 13:29:18.876',NULL,'저희는 화이트홀로 보고있어 마이더스홀로 계약했어요! 천고가 낮아서 고민했는데 7~8월에 리모델링? 들어가서 천고가 조금은 높아진다고 하더라구용 🙂'),
    (11,11,16,'2024-11-13 13:29:18.876',NULL,'저희가 투어갔던 곳중 금액이나 혜택면에서는 가장 파격적이고 좋은 견적을 주셨는데 홀투어 했던 곳중 위치상 더 가깝고 좋은 선택지가 있어서 아쉽지만 선택하지 않았어요.'),
    (12,12,16,'2024-11-23 13:29:18.876',NULL,'들러주신 하객분들이 만족할만한 결혼식장 찾으신다면 적극추천합니다. 이전에 제가 하객으로 방문했을때 밥이 맛있어서 결혼식에 대한 전반적인 인상이 좋았던 기억이 있거든요. 가격도 합리적이고 지방에 본가가 있으신 분들에게도 위치가 무척 좋은 곳이라고 생각해요.'),
    (13,13,16,'2024-11-25 13:29:18.876',NULL,'서울 역세권이지만 진짜 말도 안되는 대관료에 상담해주시는 실장님도 친절하시고 음식도 괜찮더라구요 강동 예식장 고민하시는분들 상담이라도 받아보세요^^'),
    (14,14,16,'2024-04-12 13:29:18.876',NULL,'다른 좋다는 후기를 보고 갔어도 제 눈으로 봐야지 정확한거니까! 방문해보니 위치도 좋았고, 직원분들도 친절하셨고, 연회장도 넓고 최종계약한거 만족합니다!'),
    (15,15,16,'2024-03-11 13:29:18.876',NULL,'웨딩홀에 대해서 설명해주신 남자 직원분은 친절도 하시고 자세하게 알려주시고 안내해주셔서 감사했고, 상담실장님도 친절하셨어요~'),
    (16,81,16,'2024-06-12 13:29:18.876',NULL,'2개의 홀이있었는데 전체적으로 많이 크고 웅장한 느낌은 아니었지만 밝은 홀과 어두운홀이 있는데 어두운홀인 블랙스톤홀이 마음에 들어서 계약했습니다^^'),
    (17,82,16,'2024-04-11 13:29:18.876',NULL,'지방 하객이 많아 교통편만 보고 갔지만 전체적으로 다 작은 느낌을 받았아요 100명 정도 스몰웨딩 원하시는 분들은 정말정말 만족 하실거에요 식장, 로비,연회장 다 작습니다^^'),
    (18,83,16,'2024-04-14 13:29:18.876',NULL,'우선 저는 평일에 상담을 갔는데요 기업행사 때문에 식장을 못본다는 제일 큰 단점이 있었어요 다행이도(?) 문이 열려있어서 공간은 볼수 있었는데 하객 정말 적은 스몰웨딩 원하시는 분들이 하셔야 할거 같아요 정말 작아요 그리고 신부입장시 대기실에서 바로 입장인데 바로 버진로드가 아니라 꺾어 들어가야 하는 부분도 좀 아쉬웠네요'),
    (19,84,16,'2024-04-16 13:29:18.876',NULL,'음식은 먹어보지는 않았지만 후기에는 맛있다고들 하는것 같아요 다만 연회장 느낌이라기 보단 약간 작은 호텔 레스토랑 느낌이라 너무 붐빌것 같아요'),
    (20,85,16,'2024-04-17 13:29:18.876',NULL,'상담직원이 항상 있는건 아닌가봐요 아무도 없어서 좀 기다렸다가 상담받았어요 그치만 친절하셨고 가격 대비 홀이 아쉬워서 계약은 안했습니다!'),
    (21,9,16,'2025-01-21 06:46:54.005500',NULL,'장점 1. 가성비 호텔 결혼식 할 수 있음 2. 호텔이 너무 깔끔하고 신식에다가 가는 곳마다 향기남 3. 광명역 근처라 지방 하객도 편하게 모실 수 있음 4. 광명이라 도로도 넓직하고 번잡스럽지 않음 5. 꽃 장식이 너무 예쁨 단점 1. 홀이 너무 작음.... 애초에 컨퍼런스룸으로 만든 곳 웨딩홀로 개조한거 같음... 직장+친구+친척 절대 못 올 크기.. 하지만 오히려 100명 안쪽으로 스몰웨딩 하고 싶으신 분들은 좋을 수도! 2. 신부 입장문이 정중앙이 아니고 오른편에 치우친 느낌. 그래서 사알짝 쪽방에서 나오는 그런 느낌...'),
    (22,8,16,'2025-01-12 06:46:54.005500',NULL,'진짜 식장이 작은거만 빼면 정말 정말 너무너무 하고 싶은 곳이에요. 조잡한 예식장이 아니라, 깔끔하고 세련된 호텔 내 웨딩홀이어서 아주 마음에 들었어요ㅜㅜ 인테리어도 너무 예쁘고, 꽃 장식도 너무 풍성하고, 향기도 너무 좋았고요ㅜㅠ 근데 식장이 작은게... 이게 저한테는 너무 큰 단점이었어요.. 200명정도 수용 가능하다고 하시는데 앉는 테이블이 12테이블, 앉을 수 있는 인원이 총 120명이어서.. 인싸가 아닌 저도 작아서 못할거 같은 크기에요ㅠㅠ.. 그리고 뒷 공간도 좁아서 나머지 서 있는 인원들도 구겨져서 보셔야할거 같아요ㅠㅠ 식장이 애초에 웨딩홀을 목적으로 만들어진게 아니라 큰 컨퍼런스룸? 으로 만들어진 느낌이에요ㅜㅜ 그리고 신부 입장문이 정중앙이 아니고 오른편에 치우쳐 있어서 가뜩이나 좁은데 사람들 비켜서 버진로드를 걸어야할 거 같은 느낌.. ㅠㅠ 이것만 빼면 진짜 너무너무 여기서 하고 싶어요..'),
    (23,7,16,'2025-01-14 06:46:54.005500',NULL,'지방하객이 있고 경기권에 거주하고 있어 찾던 중 KTX광명과 가까운 테이크호텔에 방문했습니다. 전체적으로 여유로운 공간이 좋았고, 단독홀이라 그 점도 마음에 들었습니다. 홀은 꽃장식이 매우 인상깊었고 신부대기실의 꽃도 마음에 들었습니다. 상담사분이 말씀해주신 것처럼 150-250명 정도가 딱 웨딩하기 좋아 보였습니다. 다만 버진로드가 조금 더 길면 좋겠다는 생각은 했습니다. 음식은 호텔에 있는 레스토랑을 이용하는거라 음식 퀄리티가 좋았습니다. 레스토랑 천고도 높고 통창인 점도 장점인거같습니다. 주차는 지하8층까지 3000대 주차가 가능하다고 하니 주차 걱정은 안해도 될거같더라구요. 호텔 대비 금액대가 괜찮은데.. 음주류가 별도라 그 점은 좀 아쉽습니다.'),
    (24,6,16,'2025-01-28 06:46:54.005500',NULL,'주차와 밥에 대한 장점이 큰 웨딩홀입니다. (주차 약 3000대 이상 단독홀, 뷔페 퀄리티) 로비도 넉넉하고 깔끔해서 북적거리지 않아서 좋아요. 150명 보증인원 가능하고 23년 24년 견적이 많이 달라서 꼭 비교해보세요~ 신부입장은 실크커튼을 열고 나와서 당황했네요. 버진로드에서부터 시작할 수도 있다고하지만 단점이네요. '),

    -- 스튜디오
    (88,5,18,'2024-02-25 06:46:54.005500',NULL,'*컨셉
인물위주와 배경 위주를 골고루 찍을 수 있어서 좋았어요
그리고 인스타에 올라와 있는 사진을 포토폴리오 형식으로 안하고 캡처만 해서 갔는데도 원하는 걸 꼭 집어서 해주셨어요 저희가 원하는 컨셉은 다 원없이 찍었네요
*분위기
그리고 저희가 가기 전에 스튜디오 컨셉이 살짝 바뀐 거 같은데 바뀐 부분이 더 마음에 들었습니다
*선택계기
토탈로 진행해서 한 건물에서 헤어 드레스 촬영을 다한 점도 마음에 들어요 처음엔 전부 다 따로 하려했는데 지방에서 올라가서 모두 알아볼 수는 없겠더라구요 그래서 플래너님과 상의해서 그 자리에서 즉석으로 골랐지만 아주 훌륭한 선택이었습니다'),
    (89,4,18,'2024-02-28 06:46:54.005500',NULL,'운이 정말 좋게도 인스타에 올라와 있는 사진을 찍어주신 작가님을 만났어요

저희는 드레스를 정하고 가지 않고 컨셉과 상관없이 이쁜 드레스를 골라 아차싶었지만 작가님이 드레스 컨셉 둘 다 놓치지 않게 잘 구성해주셔서 믿고 촬영했습니다

뚝딱이어도 표정이 밝게 찍히도록 계속 용기를 주셔서 저는 시간 가는지도 모르고 촬영했네요

이모님하고 소통하시면서 신랑 신부가 이쁘게 나오도록 신경도 많이 써주셨어요'),
    (25,3,18,'2024-03-12 06:46:54.005500',NULL,'가장 찍고 싶은 옥상씬 찍어서 기쁨ㅋㅋ한옥씬 원래 찍고 싶지 않았는데 생각보다 너무너무 잘나와서 깜놀ㅋㅋ모바일청첩장에 넣기로했어요. 담당 헬프이모님 친절하시고 세심하게 신경써주셔서 감사드립니다. 헤어메이크업도 잘해주셨어요.제가 원했던대로 잘나온것 같아요.'),
    (26,2,18,'2024-03-14 06:46:54.005500',NULL,'평일 할인프로모션이 있기도하고, 촬영팀이 적겠거니 생각해서 금요일에 촬영했습니자. 근데 금욜이라고 사람이 없는 것도 아니어서, 헤메받고 드레스 고르고 나니 촬영시작시간이 30분 지연됐어요. 원하는 드레스를 입고 여유있게 찍고싶으면 금요일보다 다른 요일을 선택하는것도 방법일것같습니다.'),
    (27,1,18,'2024-03-17 06:46:54.005500',NULL,'이곳 상징색은 민트인데 언제부터 커버가 바뀌었는지 말도 안하고 공지 하나 없이 그냥 화이트로 만들어버림 ㅡㅡ 커버 바꾸는 비용 55000원 추가비 받는다 그래서 안했어요 돈 안까워서 웨딩촬영 관련 비용을 더 쓰고싶지않았거든요 이건 진짜 소비자에 대한 배려가 1도 없는것 같아요.. 위뜨에서 촬영하게 된 이유 중 하나도 앨범커버가 민트색이어서인대;;; 정말 많이 진짜 너무 짜증나고 아쉬움이 큽니다'),
    (28,15,18,'2024-03-31 06:46:54.005500',NULL,'웨딩촬영을 앞두고 긴장도 많이 되고, 자연스러운 미소를 담을 수 있도록 연습도 많이 했는데 막상 작가님 앞에 서니 긴장이 되더라구요. 그래도 이날 만난 친절한 사진작가님과 헬퍼이모님 덕분에 사진 촬영 내내 공주가 된 기분으로 예쁜 모습을 가득가득 담아낼 수 있어서 결과물을 보니 선택하길 잘했다 싶어요.'),
    (29,14,18,'2024-04-12 06:46:54.005500',NULL,'주변에서 여기서 웨딩촬영을 한다고 하니 사진 찍으면 꼭 보여달라고 이야기 하는 바람에 예쁘게 잘 찍어야겠다는 부담감이 컸는데 막상 사진작가님 앞에 서니 긴장된 분위기를 편안하게 풀어주셔서 예랑이나 저나 찍는 내내 기분 좋게 촬영을 이어갈 수 있어어 좋았어요. 저희가 준비한 캐쥬얼 커플룩도 너무 예쁘다며 칭찬 받았네요.'),
    (30,13,18,'2024-05-25 06:46:54.005500',NULL,'웨딩촬여을 마무리하면서 역시 내 선택이 잘했다 싶은 기분이 듭니다. 주변에서도 사진을 보고 너무 자연스럽고 분위기와 배경이 고급스럽다며 칭찬을 많이 받았네요. 전문가분들의 도움 덕분에 저희 커플의 완성도 높은 웨딩촬영사진을 마무리할 수 있었던 것 같아요. 주변에 결혼하는 친구 있으면 소개해주고 싶을 정도에요'),
    (31,12,18,'2024-06-23 06:46:54.005500',NULL,'진짜 행복한 시간을 만들어주셔서 감사합니다~ 잊지못할 시간들 통해서 좋은 추억 쌓았고 진짜 재밋게하는게 중요해요 ㅎㅎㅎ'),
    (32,11,18,'2024-06-23 06:46:54.005500',NULL,'그럭저럭 이쁘지만 연결된 사진 보정업체는 비추천이에요 , 일 하기도 싫어하고 능력도 없어요.'),
    (33,10,18,'2024-06-25 06:46:54.005500',NULL,'지하라서 어둡거나 냄새가 나면 어쩌나 했는데 그런 걱정할 필요가 없었어요! 포즈 디렉팅도 수준급으로 해주셔서 잘 나온 것 같아요 :) 진짜 대만족이에용!!'),
    (34,9,18,'2024-06-29 06:46:54.005500',NULL,'원래 비수기지만 코로나가 풀리면서 촬영팀이 한번에 몰려서 정신없었지만 작가님과 헬퍼이모님 덕분에 너무 이쁘게 잘나왔어요. 톤보정만 해주신건데도 만족스런 결과물이었어요.'),
    (35,8,18,'2024-07-02 06:46:54.005500',NULL,'4시간동안 지치지않으시고 재미있는 분위기에서 촬영해주셔서 너무 편하게 촬영할 수 있었어요.'),
    (36,7,18,'2024-07-09 06:46:54.005500',NULL,'저는 평소에 수수한 스타일이라 스튜디오도 너무 오버스럽지 않으면서 무난한 스타일로 찍고 싶었습니다. 드레스도 무난하고 수수한 걸 원했고 화장도 딱히 원하는 샵이 없었기 때문에 별 고민 없이 토탈로 방향을 잡았고, 찾아보던 중에 라망 중에서도 어바웃로맨스로 정했습니다.'),
    (37,6,18,'2024-07-25 06:46:54.005500',NULL,'유정규 작가님께서 해주셨어요. 너무 빠르게 찍어버리시나? 했는데 결과물은 표정 다양하게 다와서 너무 좋았어요. 유쾌하게 사진 촬영 진행해 주셔서 평소 사진 촬영 많이 안 해본 사람도 예쁘게 다양한 표정으로 사진 찍을 슈 있었습니다.'),
    (38,5,18,'2024-08-11 06:46:54.005500',NULL,'헬퍼 이모님과 같이 차로 움직여서 건물로 이동하고 촬영을 진행했습니다! 저희 커플 말고 다른 한 커플이 같이 촬영을 진행하였고, 저희는 ''최동민 작가''님이랑 같이 진행하게 되었는데, 사진 찍을때마다 조언도 잘 해주시고 너무 이쁘게 잘 찍어주셔서 솔직히 4시간이라는 시간이 어케 지나갔는지 모르겠어요... 찍고 나서는 힘들기도 하고 지쳤지만 촬영하는 내내 즐겁게 촬영할 수 있었던 것 같습니다! '),
    (39,4,18,'2024-08-24 06:46:54.005500',NULL,'여러컨셉으로 찍어주셨습니다 맘에드는 드레스가있다고하면 그드레스 위주로 조금더 많이 찍어주시기도해서 좋았습니다 여자작가님이였는데 재미있고 지루하지않게 찍었고 친절하게 해주셨습니다 전 개인적으로 흑, 백으로 나누어지는 배경이 좋았습니다'),
    (40,3,18,'2024-09-25 06:46:54.005500',NULL,'인물위주이나 깔끔한 배경도 어느정도 있는 것을 원하시는 분들께 강추드려요! 저는 특히 여성 작가님이 정말 좋은 분이셨어서 너어무 즐겁게 잘 찍었어요 😆 나중에 한번 더 찍고싶네요bb 아, 참고로 원래 촬영때, 다른 팀이랑 같이 찍을 수도 있다고 하셨어요. 그런데, 제가 찍은 타임에는 마침 딱 저희만 있어서 정말 편하고 걱정없이 찍을 수 있었네요 :)'),
    (41,2,18,'2024-09-21 06:46:54.005500',NULL,'8월에 셀렉하러 갔는데, 친절히 응대해주셨어요. 수정도 인물은 잘 해주셨어요. 그런데 바닥 스크레치나 배경에 수정을 두번 요청드렸는데, 두번째 수정이 2주 지나도 오지 않아 3주째에 연락드렸어요. 전화로 일정이 많아 수정이 늦어졌다고 연락 받았고 그 날 저녁 바로 수정본이 왔어요.'),
    (42,1,18,'2024-10-25 06:46:54.005500',NULL,'깔끔한 인물중심의 사진을 원하던 사람으로, 더시그니쳐 샘플의 깔끔함을 보고 선택하게되었어요. 분명 사진찍기직전에 말씀도 드렸는데 막상 다 찍고보니 그렇지 않은 배경이 훨씬 많았습니다 ㅎㅎ'),
    (43,15,18,'2024-11-22 06:46:54.005500',NULL,'배경이 마음에 드시는 분들 추천입니다! 조금 더 자연스러운 사진을 원했던 저는 아쉬움이 남지만 다른 업체도 샘플과 같은 분위기는 안나올거라 생각하고 그냥 형식적인 촬영앨범으로 남김니다..'),
    (44,85,18,'2024-12-10 06:46:54.005500',NULL,'일단 샘플과 너무 다른 느낌... 샘플상 자연스럽고 인물중심 기대하면 안됩니다. 당일 촬영전 희망사항 불희망사항 간단히 얘기하고 진행했는데 포즈를 거의 디렉팅합니다. 고정적이고 고전스러운.. 촌스러운 포즈위주라 버리는 사진이 많습니다. 20년대 초반 스타일로 찍고싶으면 추천'),
    (45,86,18,'2024-12-22 06:46:54.005500',NULL,'제가원했던 이미지는 아니었으나 나쁘진 않아서 그러려니 하고있어요'),
    (46,87,18,'2024-12-28 06:46:54.005500',NULL,'겨울에 진행됐던 포토였는데요. 예쁜 드레스와 여러 포즈와 배경에서 예쁘게 찍어주셨어요. 추천합니다.'),
    (47,88,18,'2025-01-12 06:46:54.005500',NULL,'촬영날 작가님외 만난 직원분은 없어요. 그리고 셀렉일에는 여유있게 고를 수 있게 해주셔서 좋았습니다. 다만 추가금이 만만치 않아요.'),
    (48,89,18,'2025-01-22 06:46:54.005500',NULL,'긴 시간동안 시간가는줄 모르고 재미있게 촬영에 임할 수 있었습니다 ㅎㅎ 다음번에도 이런 기회가 있음 또 선택하고 싶습니다! 정말 추천!'),
    (49,90,18,'2025-02-02 06:46:54.005500',NULL,'촬영배경도 다양하고 야외촬영까지 할수있어서 더더욱 만족합니다~!👍 정지용작가님 덕분에 자연스럽고 편한 분위기에서 촬영 하게되서 사진 속 표정들도 너무 자연스럽고 마음에 들어요~! 촬영하는 내내 분위기 잘 이끌어주셔서 너무 재밌게 할수있었어요! 배경맛집 자뎅드라망 더 시그니처 강추합니다👍'),

    -- 드레스
    (90,5,19,'2024-03-12 06:46:54.005500',NULL,'지인들이 비슷한 스타일을 좋아한다면 무조건 추천할거같아요'),
    (50,4,19,'2024-03-14 06:46:54.005500',NULL,'드레스 디자인이나 위치나 가격이나 혜택이나 친절도나 뭐하나 빠지는게 없었어요(물론 제 기준) 정말 안고를수가 없었던 곳이라 촬영가봉, 본식가봉 너무 기대되요...'),
    (51,3,19,'2024-03-17 06:46:54.005500',NULL,'드레스 종류도 많고 어울릴만한걸 잘 추천해주셔서 좋았어요. 친절하셔서 기분 좋게 골랐습니다.'),
    (52,2,19,'2024-03-31 06:46:54.005500',NULL,'직원분들은 보통 직장인들 같은 느낌이었고 드레스 같이 얘기하는 실장님이 친절하셔서 좋았어요. 원하는 스타일 몇가지 보여드리니까 저하고 어울릴것 같은걸로 알아서 골라와주시고 드레스 장점도 자세하게 설명해주셨습니다.'),
    (53,1,19,'2024-04-12 06:46:54.005500',NULL,'서비스도 좋고 원하는 스타일의 드레스가 있어서 선택했습니다 넘 맘에 들었움'),
    (54,90,19,'2025-02-10 06:46:54.005500',NULL,'제가 워낙 호불호가 강해서 그랬는지 몰라도 보자마자 너무 이뻤고 아름다운 드레스였어요~ 화려한걸 싫어하는데도 여기에서 선택하고 싶을정도였습니다 비즈를 싫어하는데 비즈를 선택하게 만든 드레스샵이었네요 왕왕추천'),
    (55,6,19,'2025-01-31 06:46:54.005500',NULL,'두번째 방문 샵이라서 첫번째 샵에서 어느정도 취향 파악이 된채로 방문해서 별 기대 없었는데 여기로 확정할거 같아요 3번째 드레스까지는 첫번째 드레스 샵에서 이쁘다고 생각했던 디자인 위주로 한번 더 입어봤고 마지막 드레스는 추천으로 입었습니다 근데 마지막 드레스가 제일 예쁘고 디자인을 추가해서 봤는데 너무 맘에 들어서 놀랐네요. 그리고 당일 혜택이 좋아서 다들 드레스 투어 귀찮아 하시지 마시고 신상도 많이 입어보고 맘에 제일 드는 드레스 잘 골라서 많이 입어보세요!! 샵 하나만 가려다가 2개 온건데 너무 만족하고 갑니다'),
    (56,7,19,'2024-04-12 06:46:54.005500',NULL,'헤어장식도 코사지까지 해 준 유일한 드레스샵이었어요 다른 곳은 크게 변형이 없거나 첫번째 티아라만 쭉 얹고 있던 곳도 있었거든요'),
    (57,8,19,'2024-05-25 06:46:54.005500',NULL,'드레스들은 전반적으로 관리가 잘 되어있고 비즈파인 저한테도 잘 어울리는것들이여서 고민했는데 결국 다른곳을 하게됐지만 충분히 추천할만한 곳입니다 직원분들 다 친절하시고 불편함 없었습니다'),
    (58,9,19,'2024-06-23 06:46:54.005500',NULL,'드레스투어라 입은 모습 촬영은 못했지만 이렇게 밑에 두 드레스를 입어봤었어요 ㅎㅎㅎ 막상 입어보니 사진의 느낌과는 또다른 느낌이라 역시 여러종류를 입어보는게 중요한것같아요! 오간자실크>미카도실크>잔잔비즈>레이스 순서로 입어봤습니다. 밝은홀이라 말씀드리니 어울리는 드레스들을 추천해주셔서 즐겁게 잘입고왔습니다 ㅎㅎㅎ'),
    (59,10,19,'2024-06-29 06:46:54.005500',NULL,'전체적으로 밝고 편언한 분위기 속에서 프로페셔널함이 느껴졌습니다 다른 손님들도 많고 공간도 크고 제휴샵에 플래닝 혜택있는곳이라 크게 기대 안했는데 분위기가 좋아서 이 곳으로 결정하게 됐네요'),
    (60,11,19,'2024-07-02 06:46:54.005500',NULL,'본식때 있는듯 없는듯한 이모님을 원했지만 신부드레스 매무새를 과하게 만지시는 덕분에 본식사진마다 이모님이 찍혀서 본식시간도 길어졌네요.. 예식시간에 쫓겨서 단체사진에서 제대로된 컨셉사진은 찍지도 못했습니다. 일을 하셨기에 돈은 드렸지만 정말 돈이 아까웠습니다. 실장님이 직접오셨기에 그나마 식은 치룰수 있었습니다. 친구가 여기서 한다고 하면 돈을 줘서라고 말리고 싶습니다.'),
    (61,12,19,'2024-07-09 06:46:54.005500',NULL,'당일 혜택도 넘 좋았고, 드레스를 다양하게 볼 수 있어서 좋았습니다!'),
    (62,13,19,'2024-07-25 06:46:54.005500',NULL,'전반적으로 다 좋았지만 마음에 드는 드레스를 고르지 못해서 아쉽긴 했지만, 어떤게 잘 어울리는지 알게 되서 좋긴했어요~ :)'),
    (63,14,19,'2024-08-11 06:46:54.005500',NULL,'예쁘고 화려한 비즈 드레스 찾는 분들께 강추해드리는 샵입니다😊'),
    (64,15,19,'2024-08-24 06:46:54.005500',NULL,'첫 방문 투어샵이었는데 너무 친절하시고, 하나하나 꼼꼼하게 잘 봐주셔서 좋았습니다 :) 매장은 정말 깨끗하고, 디자인 다양하게 입어볼 수 있어서 좋았어요 ㅎㅎ 디자인 상태도 좋고, 다 만족!!'),
    (65,86,19,'2024-09-25 06:46:54.005500',NULL,'공주놀이릍 하는 듯 재미잇기도 하도 여러 소품들이있어서 티아라나 밴드로도 해주시고 부케모형도 준비되어있고 이리저리 몸도움직여보면서 옆모습도 살펴볼 수 있었어요! 매우 친절하게 잘해주셨습니다'),
    (66,87,19,'2024-09-21 06:46:54.005500',NULL,'선택하제 않았지만 전반적으로 추천합니다. 직원들의 친철함과 드레스 퀄리티와 디자인 정말 좋습니다.'),
    (67,88,19,'2024-10-25 06:46:54.005500',NULL,'최종확정한 드레스집으로 갔을때 사람도 제일 많았고 비즈맛집답게 비즈가 다양하고 드레스가예뻤음 과해보여도 입으면 또다르니 인스타로 먼저보시고 가셔서 요청해보세요!'),
    (91,89,19,'2025-02-10 06:46:54.005500',NULL,'평일에 방문 하였는데도 사람이 많았어요. 드투 중 첫번째샵이라 엄청 긴장했는데 친절하게 잘 봐주셨어요'),

    -- 메이크업
    (68,12,20,'2024-02-12 06:46:54.005500',NULL,'플래너님 추천으로 예약한 샵이고 촬영메이크업때 제 의견 잘 반영해주셔서 좋았어요 촬영 끝나고 집에 와서도 무너지지 않아서 믿음이 갑니다.'),
    (69,13,20,'2024-03-12 06:46:54.005500',NULL,'인스타에서 깔끔하고 귀여운 느낌을 받고 갔는데 정확히 그 느낌으로 해주셨어요! 원하는 느낌의 사진을 캡쳐해서 가져간다면 더 마음에 드는 결과가 나올 듯 해요'),
    (70,14,20,'2024-04-16 06:46:54.005500',NULL,'평상복을 입고 시연만 받아보는거라 신부메이크업은 아니고 데일리 메이크업으로 진행, 20분 안쪽으로 간단한 수정 정도 진행해주신다고 들어서.. 사실 크게 기대 안했는데 아이메이크업이랑 눈썹 리터칭, 피부 수정에 윤곽/블러셔까지 다 예쁘게 잡아주셔서 저녁약속 잡아야 하나 고민했답니다!ㅎㅎ 본식/촬영 헤메 포레스타블랙으로 계약했는데 후기가 많이 없어 플래너님 굳게 믿고 결정했던건데 역시 너무 만족스럽네요! 본식/촬영 헤메도 너무 기대됩니다☺️'),
    (71,15,20,'2024-06-13 06:46:54.005500',NULL,'처음에는 좀 낯선 분위기에 떨리긴 했지만 다들 친절하게 응대해주시고 헤어 메이크업 하는 동안에도 편안한 분위기를 만들어 주셔서 받는 동안에는 어색하더나 떨리는 것 없이 편안하게 진행 할 수 있었어요! 결과 물들도 맘에 들고 예쁘게 꾸며주셔서 감사합니다'),
    (72,11,20,'2024-07-21 06:46:54.005500',NULL,'과즙상이나 글리터,색조가 과한 메이크업은 부담스러워서 최대한 깔끔하고 이목구비 살리는 메이크업을 하고 싶었어요. 플래너님이 추천해 주셨고 때마침 업그레이드 서비스가 가능해서 택했습니다. 후기가 넘 없어서 걱정했는데 걱정은 기우에 그쳤어요. 원하는 메이크업.헤어 구현되었답니다. 가족,지인들 반응도 다 좋아서 뿌듯했어요. 본식때는 속눈썹이나 아이라인이 더 포인트가 될 것이라 합니다. 이 헤메 그대로 박제되었음 싶네요.똥손이라 ㅜㅜ'),
    (73,1,20,'2024-06-29 06:46:54.005500',NULL,'원하는 느낌 사진 캡쳐해갔는데 잘 살려서 반영 해주셨어요ㅎㅎ 이외에도 헤어 메이크업 팁도 잘 알려주시고 헤어는 두상에 맞게, 메이크업도 얼굴형과 눈썹뼈에 맞게 착착 알아서 잘 해주셨어요ㅎㅎ'),
    (74,5,20,'2024-07-02 06:46:54.005500',NULL,'아침 8시에 방문했고 샾도 깔끔하고 넓었어요. 원장님이 딱 제가 원하는 만큼 잘 해주셔서 너무 좋았습니다 처음으로 메이크오버! 착해보이는 얼굴 만들어주셨어요! 덕분에 어제 사진 진짜 왕창 찍었어요'),
    (75,4,20,'2024-07-09 06:46:54.005500',NULL,'친절하고 메이크업도 처음부터 끝까지 쌤이 다 해주시고 원하는 스타일에 맞춰 찰떡같이 해주십니다. 그냥 슥슥 하시는 거 같은데 눈 떠보면 다른 사람이 있더라구오.. 근 1년 중 셀카 제일 많이 찍었어요! 헤어쌤도 찍을 컨셉에 맞춰 추천해주시고, 신랑 헤어를 옆에서 보면서 케어할 수 있게 배려해주셔서 넘 감사해써욤'),
    (76,2,20,'2024-07-25 06:46:54.005500',NULL,'헤어도 메이크업도 만족도높아서 저는 김활란뮤제네프 추천하고다녀요ㅎㅎ 김활란뮤제네프 실장급이 타샵 부원장급이라는 말도있을만큼 실력은 보장되는곳같습니다.'),
    (77,3,20,'2024-08-11 06:46:54.005500',NULL,' 우리 담당으로 만난 메이크업 우리 실장님과 헤어 리나 실장님.. 너무나도 섬세하고 아무것도 모르는 나 알아서 공주 만들어 주심 ㅠ 다이어트 한다고 요즘 이마에 뾰루지가 많았는데 감쪽 같이 없애주심 진짜 마술손.. 첫 스타트 저렇게 반묶음 번으로 하고 감.. 두분다 너무 꼼꼼하고 역시 전문가는 달라여 ㅋㅋㅋㅋ 왕 추천!'),
    (78,6,20,'2024-08-24 06:46:54.005500',NULL,'김활란 후기가 다 매우좋고 특히 피부표현,과즙메이크업으로 유명하다고해서 다른업체보다 비싸도 고른곳인데 촬영때는 매우 아쉬웠네요..헤어 실장님은 매우 친절하시고 원하는거 다 들어주셔서 만족했어요.예랑이 머리도 마음에 쏙 들었구요. 하지만 메이크업은 모공이 넓은편인데 다 보이고 얼마안지나서 주름에 다끼고..ㅠㅠ매우많이 아쉬웠고 담당쌤 변경 했지만 본식 매우 걱정입니다..'),
    (79,7,20,'2024-09-25 06:46:54.005500',NULL,'직원분들 모두가 친절했던 뮤제네프! 기분좋게 메이크업 하고 촬영했어요^^'),
    (80,8,20,'2024-09-21 06:46:54.005500',NULL,'예쁘고 기다리는동안 커피도 주시고 서비스좋았어용'),
    (81,9,20,'2024-10-25 06:46:54.005500',NULL,'역시 유명한 메이크업샵 답게 피부표현이 제일 걱정이였는데, 잘 맞게 해주셔서 그날 피부가 아주 광이 엄청났습니다. 자연스럽고 부담스럽지않은 메이크업이라 맘에들었습니다'),
    (82,81,20,'2024-11-01 06:46:54.005500',NULL,'메이크업은 조수민 쌤, 헤어는 신선아 쌤이 해주셨는데 두분다 실력자셔서 대만족 이었습니다 ✌️ 메이크업은 베이스부터 꼼꼼하게 해주셔서 좋았고 눈썹이랑 아이메이크업이 특히 맘에 들었어요! '),
    (83,82,20,'2024-12-20 06:46:54.005500',NULL,'원하는 스타일로 해주셔서 만족스럽습니다! 드레스까지 다 입고 나서 헤어와 메이크업윽 다시 한 번 손봐주셨어요. 본식도 기대됩니다'),
    (84,83,20,'2025-01-01 06:46:54.005500',NULL,'확실히 전문가는 달라요. 피부표현 중요하게 생각하는데 10시간 후에도 안뜨더라구요.'),
    (85,84,20,'2025-01-16 06:46:54.005500',NULL,'샵에서 메이크업 받아본건 처음인데, 한번에 끝나지 않고 조금씩 대기하면서 하는 게 신기했어요. 단발머리인데도 예쁘게 고정시켜주셨습니다.'),
    (86,85,20,'2025-02-04 06:46:54.005500',NULL,'인기가 많은 곳이다보니 살짝 정신없으나 그래도 헤어, 메이크업 실력은 우수한 곳 같습니다 ㅎㅎ 본식 메이크업도 잘 진행되길 소망합니다❤️'),
    (87,86,20,'2025-02-12 06:46:54.005500',NULL,' 메이크업 헤어 모두 너무 만족스럽고 마무리까지 꼼꼼하게 신경써주셔서 7시간 내내 무너짐이 없었습니다. 메이크업 진령실장님도 너무 예쁘게 만들어주셨고 헤어는 혜지실장님께서 머리도해주시고 출장도 신청했는데 꼼꼼하고 빠르게 예쁜 머리로 바꿔주십니다. 금손 실장님들이 계신 곳입니다. 너무너무 추천합니다.');

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

