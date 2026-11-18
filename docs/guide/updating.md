# Updating

```bash
docker compose pull
docker compose --profile postgres up -d
```

Leave out `--profile postgres` if you use your own database. Database migrations run on start, and AeroStat makes a [backup](/features/backups) before it changes the database.

What changed in each version is in the [releases](https://github.com/Hampter-0/AeroStat/releases).

## Pin a version

`AEROSTAT_VERSION` in `.env` picks the image tag. `latest` follows every release; set a version like `0.27.0` to stay on it until you change it.

## New settings

New releases sometimes add a setting to `.env.example`, like `SECRET_KEY` in 0.12.0. Docker only passes a setting to AeroStat when `docker-compose.yml` lists it, so get the newest compose file too. Your `.env` and `docker-compose.override.yml` stay as they are:

```bash
cp docker-compose.yml docker-compose.yml.bak
curl -O https://raw.githubusercontent.com/Hampter-0/AeroStat/main/deploy/docker-compose.yml
docker compose up -d
```

If you changed `docker-compose.yml` yourself, compare it with the `.bak` copy and move your changes to `docker-compose.override.yml`.

## Update notices

The panel shows the running version at the bottom of the sidebar. When a newer release is out, people with the View system permission see a notice on the dashboard with a link to the release notes and a button that copies the update command. AeroStat checks GitHub for this every six hours and sends nothing about your installation; set `UPDATE_CHECK=false` to turn it off.

## Automatic updates

AeroStat can't update itself: that would need access to the Docker socket, which is the same as root on your server. If you want automatic updates, run [Watchtower](https://containrrr.dev/watchtower/) next to it, limited to the AeroStat containers:

```yaml
  watchtower:
    image: containrrr/watchtower
    restart: unless-stopped
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    command: --cleanup --interval 21600 aerostat-frontend-1 aerostat-backend-1
```
