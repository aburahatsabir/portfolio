@echo off
REM Portfolio Server Starter (Python-based, no Node.js required)

echo.
echo ====================================
echo Portfolio Server Launcher
echo ====================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    echo.
    echo Download Python from: https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation
    echo.
    pause
    exit /b 1
)

echo Starting server...
echo.
python server.py

pause
