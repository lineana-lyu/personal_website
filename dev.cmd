@echo off
setlocal

where pnpm.cmd >nul 2>nul
if %errorlevel%==0 goto use_system_pnpm

set "CODEX_PNPM=C:\Users\LLH\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd"
if exist "%CODEX_PNPM%" goto use_codex_pnpm

where npm.cmd >nul 2>nul
if %errorlevel%==0 goto use_npm

echo [ERROR] Node.js package manager not found.
echo Install Node.js, then run: npm install
exit /b 1

:use_system_pnpm
call pnpm.cmd run dev %*
exit /b %errorlevel%

:use_codex_pnpm
call "%CODEX_PNPM%" run dev %*
exit /b %errorlevel%

:use_npm
call npm.cmd run dev %*
exit /b %errorlevel%
