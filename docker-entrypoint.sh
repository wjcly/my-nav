#!/bin/sh
set -e

echo "🚀 启动应用..."

# 运行数据库迁移（如果需要）
if [ "$RUN_MIGRATIONS" = "true" ]; then
  echo "⏳ 等待数据库就绪..."
  # 简单的重试逻辑
  max_attempts=30
  attempt=0
  while [ $attempt -lt $max_attempts ]; do
    if npx prisma migrate status > /dev/null 2>&1 || npx prisma db push --accept-data-loss --skip-generate > /dev/null 2>&1; then
      echo "✅ 数据库连接成功"
      break
    fi
    attempt=$((attempt + 1))
    echo "等待数据库连接... ($attempt/$max_attempts)"
    sleep 2
  done
  
  echo "📦 运行数据库迁移..."
  npx prisma migrate deploy 2>/dev/null || npx prisma db push --accept-data-loss --skip-generate
  echo "✅ 数据库迁移完成"
fi

# 启动应用
echo "🎯 启动 Next.js 应用..."
exec node server.js

