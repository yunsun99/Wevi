# WEVI – 편리한 웨딩 일정 관리 플랫폼

<img src="./assets/wevi_main.png" width="100%">

<br/>

# 📌 목차

### 1️⃣ [서비스 소개](#-서비스-소개)
### 2️⃣ [서비스 화면](#-서비스-화면)
### 3️⃣ [개발 환경](#-개발-환경)
### 4️⃣ [기술 특이점](#-기술-특이점)
### 5️⃣ [기획 및 설계 산출물](#-기획-및-설계-산출물)
### 6️⃣ [Conventions](#-conventions)
### 7️⃣ [팀원 소개 및 개발 회고](#-팀원-소개-및-개발-회고)

<br/>

# 서비스 소개

### WEVI(웨비)는 결혼을 준비하는 예비 부부들을 위한 올인원 웨딩 일정 관리 플랫폼입니다. 
### 실제 예비 신혼부부들을 인터뷰하여 **복잡한 일정 관리, 상담 예약의 어려움, 부부 간 일정 공유 문제**를 해결하는 서비스를 제공합니다.

---

## 🚀 주요 기능

### ✅ 웨딩 일정 관리  
- **업체 검색 및 필터링**: 웨딩 업체를 쉽게 검색하고 필터링  
- **상담 예약 및 일정 자동 등록**: 번거로운 상담 예약을 간편하게 처리하고 자동 등록  
- **중간 과정 조회**: 진행 중인 예약 상태를 쉽게 확인  
- **커플 연동 기능**: 예비 부부 간 일정 공유를 간편화  

### ✅ AI 기능  
- **AI 상담 요약**: GPT-4를 활용하여 상담 내용을 자동 요약  
- **AI 플래너**: 사용자의 요구 사항을 분석해 웨딩 업체 추천  

---

## 🔧 기술 스택

### **프론트엔드**
- React 18.3.0, Vite 6.0.5, Tailwind CSS 4.0.0
- JavaScript(ES6), Firebase Cloud Messaging
- Node.js 20

### **백엔드**
- Spring Boot 3.3.7, MySQL 8.0.41, FastAPI  
- Oracle Open JDK 17, JWT, Spring Security 6.4.2  

### **AI 기술**
- OpenAI GPT-4, Whisper, Pyannote  
- Hugging Face SBERT (웨딩 업체 추천)  

### **CI/CD 및 서버**
- AWS EC2, Docker, Jenkins, Nginx  
- Ubuntu 24.04.1 LTS, S3  

---

## 🧠 AI 기술 활용

### 음성 분석을 위한 Whisper 및 Pyannote 모델 활용
 - Pyannote 모델을 사용하여 화자를 분리하고 대화 내용을 분석
 - OpenAI Whisper 모델을 활용하여 음성 데이터를 텍스트로 변환
 - 변환된 텍스트를 OpenAI GPT 모델을 통해 분석하여 핵심 내용을 자동으로 요약

### AI 기반 웨딩 업체 추천 시스템
 - Hugging Face의 Transformers 모델을 활용하여 자연어 처리(NLP) 기반 추천 시스템 구현
 - 기존 웨딩 업체 데이터를 벡터화하여 사용자의 요구 사항과 가장 유사한 업체를 매칭
 
---

## 📌 기대 효과  

✅ **예비 부부**: 일정 자동화 및 공유 기능을 통해 웨딩 준비 과정 간소화  
✅ **웨딩 업체**: 효율적인 상담 및 일정 관리, 중소 업체의 소비자 노출 기회 확대  

**WEVI는 예비 신혼부부의 웨딩 준비를 더욱 편리하고 체계적으로 만들어주는 서비스입니다!**  

---

# 서비스 화면  

<img src="./assets/scenario/login.png" width="100">
<img src="./assets/scenario/register.png" width="100">
<img src="./assets/scenario/home.png" width="100">
<img src="./assets/scenario/search.png" width="100">
<img src="./assets/scenario/vendor_detail.png" width="100">
<img src="./assets/scenario/schedule.png" width="100">
<img src="./assets/scenario/couple.png" width="100">
<img src="./assets/scenario/alarm.png" width="100">
<img src="./assets/scenario/timeline.png" width="100">
<img src="./assets/scenario/mypage.png" width="100">
<img src="./assets/scenario/ai.png" width="100">
<img src="./assets/scenario/ai_recommend.png" width="100">

<br/>

# 개발 환경  

<img src="./assets/wevi_technology stack.png" width="100">
<img src="./assets/wevi_infra_architecture.png" width="100">

---

# 기술 특이점

## 프로젝트의 특장점 (기능 관점)
1. **자동 일정 관리 및 공유 기능**  
   - 고객이 일정을 쉽게 확인할 수 있어 소통 효율성이 높아지고, 불필요한 일정 조율 과정 감소.  

2. **진행 상황 자동 업데이트 기능**  
   - 고객과 업체 간 실시간 상태 공유로 커뮤니케이션 부담 경감 및 업무 효율성 향상.  

3. **AI 기반 추천 기능**  
   - 예산, 스타일, 후기 등을 기반으로 웨딩 업체를 자동 추천하여 고객의 선택 과정 간소화.  

4. **AI 기반 상담 내용 분석 기능**  
   - 상담 내용을 텍스트로 변환 및 요약하여 사용자 경험 개선.  

---

## 프로젝트의 차별점 / 독창성 (기술 관점)
1. **파노라마 사진 기반의 360도 뷰 구현**  
   - Pannellum을 활용하여 몰입감 있는 인터랙티브 경험 제공.  

2. **부부 계정 연동 기능**  
   - 세션 기반 인증 시스템을 통해 두 개의 계정을 연동, 실시간 일정 공유 및 데이터 접근 권한 관리.  

3. **AI 플래너**  
   - GPT 기반의 일정 추천 기능을 통해 맞춤형 체크리스트 제공.  

4. **Firebase 기반 알람 기능**  
   - 웨딩 준비 일정 및 주요 알림을 실시간으로 푸시.  

---

## 📡 외부 서비스  
### **카카오 API**  
- 닉네임, 프로필 사진, 이메일 연동  
- 카카오 친구 목록 연동  

### **Firebase**  
- Firebase Authentication (이메일/소셜 로그인)  
- Firestore (실시간 데이터 저장)  
- Firebase Storage (미디어 파일 저장)  

### **AI API (OpenAI, Hugging Face)**  
- GPT-4: 웨딩 상담 내용 분석 및 요약  
- OpenAI Whisper: 음성 인식 및 STT  
- Pyannote: 화자 분리 및 음성 분석  
- SBERT: 문장 임베딩 및 웨딩 업체 추천  

### **AWS S3**  
- 파일 저장 및 관리  

---

# 기획 및 설계 산출물  

## 요구사항 명세서 (https://held-nephew-fd8.notion.site/v3-11e3e17bbf4c4208ba0c38edb60f20e1)

## 와이어 프레임 (https://www.figma.com/design/3T4vbzxt7uhR6XeqVMAXWP/Wevi-%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?node-id=0-1&p=f&t=zdDRgTye2oMXsTSz-0)

## ERD (https://www.notion.so/ERD-89631b828bbd4c3a9ea1666a215b952c)

## API (https://www.notion.so/API-e5e9eb4063154f858accd1f03a012507)

<br/>

# Conventions  

### **Commit Message Structure**
- 기본적인 commit message 구조  
  - 각 파트는 빈 줄로 구분

    > 제목 (Type: Subject) <br />
    > (공백) <br />
    > 본문 (Body) <br />
    > (공백) <br />
    > Footer

  - Subject
    - 제목은 50자 이내
    - 마침표 및 특수기호 사용 금지
    - 영문인 경우 동사(원형)을 가장 앞에, 첫 글자는 대문자로 작성

### **Commit Type**  

| Tag Name | Description |
|----------|------------|
| feat | 새로운 기능 추가 |
| fix | 버그 수정 |
| docs | 문서 수정 |
| style | 코드 포맷팅, 코드 변경 없음 |
| refactor | 코드 리팩토링 |
| test | 테스트 코드 추가 |
| chore | 빌드 업무 수정, 패키지 매니저 수정 |
| remove | 파일 삭제 |
| rename | 파일 또는 디렉터리 이동/수정 |

---

# 팀원 소개 및 개발 회고  

## 📆 프로젝트 기간  
### **2025.01.06 ~ 2025.02.21**  

- **기획 및 설계**: 2025.01.06 ~ 2025.01.17  
- **프로젝트 구현**: 2025.01.18 ~ 2025.02.14  
- **버그 수정 및 산출물 정리**: 2025.02.15 ~ 2025.02.20  
- **코드 리팩토링**: 2025.02.21 ~  

---

## 💞 팀원 소개

<table>
    <tr>
        <td height="140px" align="center"> <a href="https://github.com/자기주소">
            <img src="https://avatars.githubusercontent.com/자기주소" width="140px" /> <br><br> 👑 황성일 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/자기주소">
            <img src="https://avatars.githubusercontent.com/자기주소" width="140px" /> <br><br> 👶🏻 고대권 <br>(Front-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/자기주소">
            <img src="https://avatars.githubusercontent.com/자기주소" width="140px" /> <br><br> 👶🏻 정정윤선 <br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/자기주소">
            <img src="https://avatars.githubusercontent.com/자기주소" width="140px" /> <br><br> 👶🏻 박성근 <br>(Back-End) </a> <br></td>
        <td height="140px" align="center"> <a href="https://github.com/자기주소">
            <img src="https://avatars.githubusercontent.com/자기주소" width="140px" /> <br><br> 👶🏻 신동운 <br>(Back-End, Infra) </a> <br></td>
    </tr>
    <tr>
        <td align="center"><br/></td>
        <td align="center"><br/></td>
        <td align="center"><br/></td>
        <td align="center"><br/></td>
        <td align="center"><br/></td>
        <td align="center"><br/></td>
    </tr>
</table>

## 🙌🏻 회고

##### **황성일**<br>
- 적어주세요.

##### **고대권**<br>
- 적어주세요.

##### **정윤선**<br>
- 적어주세요.

##### **박성근**<br>
- 적어주세요.

##### **신동운**<br>
- 적어주세요.
