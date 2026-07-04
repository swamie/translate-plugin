@echo off
title Build Cadence
cd /d "%~dp0"

echo ============================================
echo   Building Cadence (YouTube Music, Spotify skin)
echo ============================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo   Node.js is not installed yet.
  echo.
  echo   1^) Go to https://nodejs.org
  echo   2^) Click the big "LTS" download button and run the installer
  echo      ^(just keep clicking Next / accept the defaults^)
  echo   3^) Then double-click this build.bat again.
  echo.
  pause
  exit /b 1
)

echo Installing dependencies... ^(first run can take a few minutes^)
echo.
call npm install --no-audit --no-fund
if errorlevel 1 goto error

echo.
echo Building the Windows app...
echo.
call npm run dist
if errorlevel 1 goto error

echo.
echo ============================================
echo   Done!  Your app is in the "dist" folder.
echo   - Cadence-Setup-*.exe    = installer
echo   - Cadence-Portable-*.exe = no-install, just run it
echo ============================================
start "" "%~dp0dist"
pause
exit /b 0

:error
echo.
echo Something went wrong during the build. Scroll up to read the error.
echo.
pause
exit /b 1
