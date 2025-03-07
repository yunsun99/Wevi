# 폴더구조

- api
  - API 요청을 관리하는 폴더 (도메인별 파일 분리를 통해 API 관리)
- assets
  - 폰트, 아이콘, 공용 사진등을 관리
- atoms/
  - Recoil 전역 상태 저장 (필터, 알람 여부, 날짜 등)
- components/
  - 재사용 가능한 UI, Form 컴포넌트 (로그인, search 등의 Form과 리스트 뷰, 
  카드 뷰 등의 자식 컴포넌트, 버튼, 인풋 필드 등의 UI 컴포넌트)
- context/
  - AuthProvider.js를 통해 로그인 상태를 글로벌로 관리
- hooks/
  - useAuth.js 같은 커스텀 훅을 만들어 인증 관련 로직 관리
- layouts/
  - 공통 레이아웃 (네비게이션, 푸터 포함)
- pages/
  - 개별 페이지 (로그인, 대시보드, 에러 페이지 등)
- routes/
  - ProtectedRoute.js 등 인증이 필요한 라우팅 처리
- styles/
  - Tailwind 설정 및 전역 CSS 관리
