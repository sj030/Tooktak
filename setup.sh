#!/bin/bash

# .env 파일이 없는 경우 .env.example 파일을 .env 파일로 복사
if [ ! -f backend/.env ]; then
  cp backend/.env.example backend/.env
  echo ".env file created from .env.example"
fi

# wait-for-it.sh 스크립트를 backend 디렉토리로 복사
cp wait-for-it.sh backend/wait-for-it.sh
chmod +x backend/wait-for-it.sh

echo "Setup completed."
