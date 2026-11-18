# Backups

Everything worth keeping is in Postgres. AeroStat backs it up with `pg_dump` into the `backups` volume:

- **Every day** after 03:00 in the site's timezone, keeping the last 7. Change this, or turn it off, under **System → Backups**.
- **Before an update.** When a new version starts for the first time, it backs up the database before changing it. The last 3 are kept.
- **By hand** with **Make a backup now** under **System → Backups**, where you can also download and delete them.

Only people with the Backups permission see this; a backup holds everything, password hashes included. Uploading a backup from elsewhere is for admins only, because a backup runs as SQL when it is restored; the CLI warns before restoring an uploaded one.

## Keep a copy elsewhere

A backup on the same server is gone when the server is. Download one now and then, or copy the volume elsewhere, and keep a copy of your `.env` with it: without the same `SECRET_KEY` the authenticator apps stop working and everyone has to set them up again.

The volume is called `aerostat_backups`. Find its folder on the server with:

```bash
docker volume inspect aerostat_backups --format '{{ .Mountpoint }}'
```

That is usually `/var/lib/docker/volumes/aerostat_backups/_data`. Or copy every backup next to your compose file:

```bash
docker compose cp backend:/data/backups ./aerostat-backups
```

To keep the backups in a folder of your own instead of a volume, add this to `docker-compose.override.yml`. The folder must be writable for user id 10001:

```yaml
services:
  backend:
    volumes:
      - /srv/aerostat-backups:/data/backups
```

## Restoring

Admins can restore a backup under **System → Backups** with **Restore**, after entering their password. AeroStat first backs up the database as it is now, puts the chosen backup back, and then restarts the backend so newer migrations run; you sign in again afterwards. If anything fails, nothing is changed.

The same works from the server with the CLI, also when you can't sign in:

```bash
docker compose exec -it backend aerostat cli
```

Pick `restore`, then restart the backend so it runs any newer migrations:

```bash
docker compose restart backend
```

A backup from a newer AeroStat can't go back into an older one; update first. The Docker image has the PostgreSQL 17 tools, which work with PostgreSQL 17 and older.
