# Configuration

All settings go in `.env` next to `docker-compose.yml`. After a change, run `docker compose up -d` to apply it.

Site name, contact link, colour, logo, favicon, timezone and data retention can also be changed in the panel under **Settings**; the panel value wins.

## Install

| Variable | Default | |
| --- | --- | --- |
| `AEROSTAT_VERSION` | `latest` | Image tag to run |
| `AEROSTAT_BIND` | `0.0.0.0` | Address the status page listens on. `127.0.0.1` behind a [reverse proxy](/guide/reverse-proxy) |
| `AEROSTAT_PORT` | `3000` | Port the status page listens on |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | | Required. `openssl rand -base64 32` |
| `TRUSTED_PROXY_HOPS` | `1` | Only for proxies that add to `X-Forwarded-For`, see [TRUSTED_PROXY_HOPS](/guide/reverse-proxy#trusted-proxy-hops) |
| `RUST_LOG` | `info` | Backend log level |

## Database

| Variable | Default | |
| --- | --- | --- |
| `DATABASE_URL` | | Required. Postgres connection string |
| `DB_USER`, `DB_PASSWORD`, `DB_NAME` | `aerostat`, `change_me`, `aerostat` | The Postgres that comes with AeroStat only |
| `METRICS_RETENTION_DAYS` | `60` | Days of check results to keep |

## Site defaults

| Variable | Default | |
| --- | --- | --- |
| `SITE_NAME` | `AeroStat` | Default site name |
| `CONTACT_URL` | | Default contact link |
| `PRIMARY_COLOR` | `#1678c2` | Default accent colour |
| `UPDATE_CHECK` | `true` | Show people who can view System when a newer release is out |

## Sign-in

| Variable | Default | |
| --- | --- | --- |
| `SECRET_KEY` | | Encrypts authenticator app secrets. `openssl rand -hex 32`. Without it only email codes work |
| `SESSION_DAYS` | `30` | How long a panel sign-in lasts (max 365) |
| `LOGIN_MAX_FAILURES_PER_IP` | `10` | Failed sign-ins from one IP before a block. IPv6 addresses count per /64 block, since one connection gets a whole block |
| `LOGIN_MAX_FAILURES_PER_ACCOUNT` | `30` | Failed sign-ins on one account before new IPs are blocked; IPs that signed in to it in the last 90 days still get in |
| `LOGIN_LOCKOUT_MINUTES` | `15` | How long a block lasts |

## Email

See [email notifications](/features/notifications#email).

| Variable | Default | |
| --- | --- | --- |
| `SMTP_HOST` | | Mail server. Empty turns email off |
| `SMTP_PORT` | `465` or `587` | Mail server port, follows `SMTP_ENCRYPTION` |
| `SMTP_ENCRYPTION` | `starttls`, or `tls` on port 465 | `tls`, `starttls` or `none` |
| `SMTP_USERNAME` | | Mail server login |
| `SMTP_PASSWORD` | | Mail server password. Never shown in the panel |
| `SMTP_FROM_ADDRESS` | `SMTP_USERNAME` | Address emails are sent from |
| `SMTP_FROM_NAME` | Site name | Name emails are sent from |

## Backups

| Variable | Default | |
| --- | --- | --- |
| `BACKUP_DIR` | `/data/backups` | Where backups are stored |
| `PG_DUMP_PATH`, `PG_RESTORE_PATH`, `PSQL_PATH` | `pg_dump`, `pg_restore`, `psql` | The PostgreSQL tools, only needed outside Docker |
