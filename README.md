# Book Inventory Manager

A full-stack CRUD app for managing a book inventory, with an optional one-to-one
extended details record per book.

**Stack:** .NET Core Web API, EF Core, PostgreSQL, React, Redux Toolkit (RTK Query),
React Hook Form, MUI

---

## Project Structure

```
book-inventory-manager/
├─ backend/
│  └─ BookInventory.Api/     # .NET Core Web API
└─ frontend/
   └─ book-inventory-ui/     # React + Vite frontend
```

---

## Prerequisites

- [.NET SDK 8.0+](https://dotnet.microsoft.com/download)
- [PostgreSQL 16](https://www.postgresql.org/) (installed locally, or via Docker)
- [Node.js 18+](https://nodejs.org/) and npm

---

## 1. Database Setup

This project runs PostgreSQL locally (not via Docker).

If you don't already have PostgreSQL installed:

```bash
brew install postgresql@16
brew services start postgresql@16
```

Create the `postgres` role and the `bookinventory` database:

```bash
psql postgres
```

Inside the `psql` prompt:

```sql
CREATE ROLE postgres WITH LOGIN SUPERUSER PASSWORD 'postgres';
CREATE DATABASE bookinventory OWNER postgres;
\q
```

Verify the connection:

```bash
psql -h localhost -U postgres -d bookinventory
```

---

## 2. Backend Setup

```bash
cd backend/BookInventory.Api
dotnet restore
```

The connection string is already configured in `appsettings.json`:

```
Host=localhost;Port=5432;Database=bookinventory;Username=postgres;Password=postgres
```

Apply the EF Core migrations to create the database schema:

```bash
dotnet ef database update
```

Run the API:

```bash
dotnet run
```

The API will start on **http://localhost:5264**. Swagger UI is available at:

```
http://localhost:5264/swagger
```

---

## 3. Frontend Setup

In a new terminal:

```bash
cd frontend/book-inventory-ui
npm install
```

Run the frontend dev server:

```bash
npm run dev
```

The app will start on **http://localhost:5173**.

---

## 4. Using the App

1. Make sure PostgreSQL is running (`brew services list`).
2. Start the backend: `cd backend/BookInventory.Api && dotnet run`
3. Start the frontend: `cd frontend/book-inventory-ui && npm run dev`
4. Open **http://localhost:5173** in your browser.

You can add, edit, and delete books. The list refreshes automatically after
every change.

---

## Ports Summary

| Service    | URL                             |
|------------|----------------------------------|
| Backend API| http://localhost:5264           |
| Swagger UI | http://localhost:5264/swagger   |
| Frontend   | http://localhost:5173           |
| PostgreSQL | localhost:5432                  |

---

## Linting & Formatting (Frontend)

```bash
npm run lint
npm run format
```

---
