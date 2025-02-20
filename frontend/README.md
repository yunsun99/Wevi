# 폴더구조

- api
  - API 요청을 관리하는 폴더 (로그인, 회원가입, 사용자 정보 요청 등)
- atoms/
  - Recoil 전역 상태 저장 (로그인 상태, 다크 모드 등)
- components/
  - 재사용 가능한 UI 컴포넌트 (로그인 폼, 버튼, 인풋 필드 등)
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
