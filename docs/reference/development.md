# Development

Requirements: Rust, Node.js 20.9 or newer, Docker for Redis (and Postgres if you don't have one), and the PostgreSQL client tools (`pg_dump`, `pg_restore`, `psql`) if you want to try backups.

Get the code:

```bash
git clone https://github.com/Hampter-0/AeroStat.git
cd AeroStat
```

`docker-compose.dev.yml` runs Redis on `127.0.0.1:6379`. Add `--profile postgres` to also get a Postgres on `127.0.0.1:5432` with user, password and database `aerostat`. Set `DEV_REDIS_PORT` or `DEV_POSTGRES_PORT` when those ports are taken.

```bash
docker compose -f docker-compose.dev.yml up -d                       # Redis only
docker compose -f docker-compose.dev.yml --profile postgres up -d    # Redis and Postgres
```

The root `.env.example` is for development and already points at the dev Postgres and Redis. `deploy/.env.example` is the one for installing with Docker.

```bash
cp .env.example .env                              # backend settings
cp frontend/.env.local.example frontend/.env.local
cd backend && cargo run                           # API on :3004
cd frontend && npm install && npm run dev         # site on :3000
```

Create an admin with `cargo run -- create-admin --username admin`, or open the CLI with `cargo run -- cli`.

## Releasing images

Pushing a tag like `v1.0.0` builds `hampternom/aerostat-backend` and `hampternom/aerostat-frontend` for amd64 and arm64 on native runners and pushes them to Docker Hub with the tags `1.0.0`, `1.0` and `latest`. The GitHub release gets the section for that version from `CHANGELOG.md`, or the commits since the last tag when there is none. The workflow needs a repository secret `DOCKERHUB_TOKEN` (a Docker Hub access token with read and write access).
