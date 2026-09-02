@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo 경희리온한의원 홈페이지 개발 서버를 시작합니다...
echo 잠시 후 브라우저에서 http://localhost:3000 으로 접속하세요.
echo.
npm run dev
pause
