# Installation

You only need a Linux server with Docker and the Compose plugin. Postgres and Redis come with AeroStat, so there is nothing else to install.

## 1. Get the files

Make a folder and download the compose file and the example settings:

```bash
mkdir aerostat && cd aerostat
curl -O https://raw.githubusercontent.com/Hampter-0/AeroStat/main/deploy/docker-compose.yml
curl -o .env https://raw.githubusercontent.com/Hampter-0/AeroStat/main/deploy/.env.example
```

## 2. Fill in .env

Open `.env`, for example with `nano .env`, and fill in these three:

**`NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`** is required. Make a random key and paste it after the `=`:

```bash
openssl rand -base64 32
```

**The database password.** `change_me` is the password of the Postgres that comes with AeroStat. Replace it with a long random password in both places, `DB_PASSWORD` and `DATABASE_URL`:

```ini
DB_PASSWORD=your-long-password
DATABASE_URL=postgres://aerostat:your-long-password@postgres:5432/aerostat
```

**`SECRET_KEY`** is needed for two-factor sign-in with an authenticator app. Make one and paste it after the `=`:

```bash
openssl rand -hex 32
```

All other settings can stay as they are. They are explained on [Configuration](/guide/configuration).

::: tip Keep your .env safe
Keep a copy of `.env` next to your [backups](/features/backups). Without the same `SECRET_KEY`, everyone has to set up their authenticator app again.
:::

## 3. Start it

Start AeroStat with the Postgres that comes with it. Docker downloads the images the first time:

```bash
docker compose --profile postgres up -d
```

## 4. Create your admin account

It asks for a password twice:

```bash
docker compose exec -it backend aerostat create-admin --username admin
```

The status page is now on `http://your-server:3000` and the panel on `http://your-server:3000/manage`. Sign in and add your services under **Services**.

Port 3000 taken already? Set `AEROSTAT_PORT` in `.env` to a free port and run step 3 again. The backend, Redis and Postgres don't use any ports on the server.

Next, put it [behind a reverse proxy](/guide/reverse-proxy) for HTTPS.

## Using your own Postgres

Already running Postgres? Leave out `--profile postgres` and point `DATABASE_URL` at your own database. AeroStat creates its tables on first start, but the database and user must exist. With `psql` as a superuser:

```sql
CREATE USER aerostat WITH PASSWORD 'a-long-random-password';
CREATE DATABASE aerostat OWNER aerostat;
```

How AeroStat reaches the database depends on where Postgres runs.

### Postgres in another Compose project

For example next to pgAdmin. Join AeroStat's backend to that project's network with a `docker-compose.override.yml` next to `docker-compose.yml`. Compose reads it automatically:

```yaml
services:
  backend:
    networks:
      - default
      - postgresql

networks:
  postgresql:
    external: true
    name: postgresql_default
```

Find the network name with `docker network ls`, and use the Postgres container name as the host:

```ini
DATABASE_URL=postgres://aerostat:a-long-random-password@postgresql-db-1:5432/aerostat
```

### Postgres installed on the server

Use `host.docker.internal` as the host:

```ini
DATABASE_URL=postgres://aerostat:a-long-random-password@host.docker.internal:5432/aerostat
```

Postgres must then accept connections from the Docker network. In `postgresql.conf` set `listen_addresses` to include the Docker bridge address, for example `listen_addresses = 'localhost,172.17.0.1'`, and in `pg_hba.conf` allow the Docker subnet:

```
host  aerostat  aerostat  172.16.0.0/12  scram-sha-256
```

## Redis

Redis runs as part of the compose file and needs no setup. It only holds data that AeroStat rebuilds from Postgres on every start (the daily uptime bars) and short-lived sign-in counters, so it keeps nothing on disk.
