@echo off
REM Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo Installing dependencies...
    call npm install
)

REM Start the development server
echo.
echo Starting Vite development server on http://localhost:3000
echo.
call npm run dev
pause
