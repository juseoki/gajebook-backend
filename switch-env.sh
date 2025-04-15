#!/bin/bash
ENV_TYPE=$1

if [ "$ENV_TYPE" == "dev" ]; then
  cp .env.dev .env
  echo "✅ 개발 환경(.env.dev)으로 전환 완료"
elif [ "$ENV_TYPE" == "prod" ]; then
  cp .env.prod .env
  echo "✅ 운영 환경(.env.prod)으로 전환 완료"
else
  echo "❌ 사용법: ./switch-env.sh [dev|prod]"
  exit 1
fi

echo "♻️ Docker Compose 재시작 중..."
docker-compose down
docker-compose up -d --build
