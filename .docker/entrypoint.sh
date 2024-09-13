#!/bin/bash

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

npm install
npx prisma db push #criar tabelas
npx prisma db seed #popular tabelas

npm run start