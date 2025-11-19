# MicroMonorepo

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Nx workspace with NestJS microservices is ready! ✨  

This repository contains **microservices architecture** with:

- **Auth Service** (`apps/auth`) → Handles user authentication
- **Catalog Service** (`apps/catalog`) → Handles product/catalog data
- **Gateway** (`apps/gateway`) → Routes requests to services via RabbitMQ
- **Shared Library** (`libs/shared`) → Common DTOs, interfaces, constants

---

## Architecture Overview

       +----------------+
       |     Gateway    |
       |  (HTTP REST)   |
       +--------+-------+
                |
                v
       +----------------+
       |  RabbitMQ MQ   |
       +---+--------+---+
           |        |
           v        v
     +---------+  +---------+
     |  Auth   |  | Catalog |
     +---------+  +---------+
           |        |
           v        v
         MongoDB   MongoDB

> All communication between Gateway and microservices happens via **RabbitMQ queues**.

---

## Run MicroMonorepo (All Services)

1. Make sure you have **PNPM** installed. If not:

```bash
npm install -g pnpm
pnpm install
docker-compose up -d
# Auth service
npx nx serve auth

# Catalog service
npx nx serve catalog

# Gateway (routes requests to Auth & Catalog)
npx nx serve gateway

