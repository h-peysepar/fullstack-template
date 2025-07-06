# fullstack-boilerplate

A modern fullstack web application boilerplate using **Next.js** (frontend), **NestJS** (backend), **PostgreSQL**, and **Redis**, all orchestrated with **Docker Compose**.

## Stack Overview

| Layer     | Technology       |
|-----------|------------------|
| Frontend  | [Next.js](https://nextjs.org/) (React-based framework) |
| Backend   | [NestJS](https://nestjs.com/) (Node.js framework) |
| Database  | [PostgreSQL](https://www.postgresql.org/) (v15) |
| Cache     | [Redis](https://redis.io/) (v7 Alpine) |
| Dev Tools | Docker + Docker Compose |

---

##  Getting Started

### 1. Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 2. Clone the Repo

```bash
git clone https://github.com/your-username/fullstack-boilerplate.git
cd fullstack-boilerplate
```

### 3. Setup `.env` files

Create `.env` files in the following locations:

- `./backend/.env`  
- `./frontend/.env`  

Make sure they contain the necessary environment variables for your application.

**Example for backend:**

```env
DATABASE_URL=postgresql://db_user:db_password@localhost:5432/db_db
REDIS_URL=redis://localhost:6379

```

**Example for frontend:**

```env
NEXT_API_URL=http://localhost:3000
```

### 4. Start the App

```bash
docker compose up --build
```

> This uses `network_mode: host`, so services will bind directly to your host machine's ports. This is useful for performance and simplicity during development.

### 5. Open in Browser

- Frontend (Next.js): http://localhost:3000  
- Backend (NestJS API): http://localhost:5000  

---

## Development Features

- **Live reload** with `volume` mounts (`./backend` and `./frontend`)
- Dev-friendly Dockerfiles: `Dockerfile.dev` in both frontend and backend
- Simple and consistent environment setup with `.env` files
- Persistent PostgreSQL data with `pgdata` volume

---

## TODO / Future Improvements

- Add production Dockerfiles
- Add unit/integration test setup
- Add migrations (e.g., Prisma / TypeORM)
- Reverse proxy with Nginx or Traefik
- Authentication scaffolding

---

## Useful Commands

To rebuild only a specific service:

```bash
docker compose build backend
```

To stop and clean everything:

```bash
docker compose down -v
```

---

## Folder Structure

```
fullstack-boilerplate/
│
├── backend/          # NestJS app
│   └── Dockerfile.dev
│
├── frontend/         # Next.js app
│   └── Dockerfile.dev
│
├── docker-compose.yml
└── README.md
```

---

## Author

Built by [Hadi Peysepar](https://hadipeysepar.ir)
