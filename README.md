# User Service (Express + TypeScript + Prisma)

Сервис для работы с пользователями. Реализована регистрация, авторизация, получение пользователей и блокировка.

## 📦 Стек
- Node.js + Express
- TypeScript
- Prisma + любая поддерживаемая БД (например, PostgreSQL)
- JWT для авторизации
- bcrypt для хэширования паролей

---

## ⚙️ Установка и запуск

1. Клонировать репозиторий
```bash
git clone <repo-url>
cd <project>
```

2. Установить зависимости
```bash
npm install
```

3. Создать `.env` файл на основе `.env.example`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/users_db"
JWT_SECRET="supersecretkey"
```

4. Настроить Prisma и применить миграции:
```bash
npx prisma migrate dev --name init
```

5. Запустить сервер
```bash
npm run dev
```

По умолчанию сервер стартует на `http://localhost:3000`

---

## 📡 Endpoint'ы

### 1. Регистрация
**POST** `/auth/register`  
```json
{
  "fullName": "Иван Иванов",
  "birthDate": "1995-05-15",
  "email": "ivan@example.com",
  "password": "123456",
  "role": "user"
}
```

### 2. Авторизация
**POST** `/auth/login`  
```json
{
  "email": "ivan@example.com",
  "password": "123456"
}
```
Ответ:
```json
{
  "token": "jwt-token",
  "user": {
    "id": "...",
    "fullName": "Иван Иванов",
    "email": "ivan@example.com",
    "role": "user"
  }
}
```

### 3. Получение пользователя по ID
**GET** `/users/:id`  
Headers:  
```
Authorization: Bearer <JWT_TOKEN>
```

### 4. Получение списка пользователей (только admin)
**GET** `/users`  
Headers:  
```
Authorization: Bearer <JWT_TOKEN>
```

### 5. Блокировка пользователя (админ или сам себя)
**PATCH** `/users/:id/block`  
Headers:  
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🛠️ TODO (для улучшений)
- Добавить валидацию входящих данных (zod/class-validator)
- Централизованный обработчик ошибок
- Логирование (morgan/pino)
- Тесты (Jest + Supertest)
- Dockerfile и docker-compose для быстрого старта

---
