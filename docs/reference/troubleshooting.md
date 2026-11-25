# Troubleshooting

## Logs

Under **System → Logs** you see the backend's newest 2000 log lines, live, with a level filter, search and a download as a text file. It needs the **View logs** permission (admins always have it), since logs can hold IP addresses, usernames and email addresses.

The lines live in memory, so they start over when the backend restarts. Older ones are still on the server:

```bash
docker compose logs backend
```

**Help** in the panel shows the state of your installation, with links to Discord, GitHub and Docker Hub.

## A service shows as down with status 403, but it works in your browser

The site is probably behind Cloudflare or another firewall that blocks automated requests. AeroStat identifies itself as `AeroStat/<version> (+https://github.com/Hampter-0/AeroStat)`, which most setups allow. If it is still blocked, add a rule in the firewall that lets your AeroStat server's IP address through.

## A service is down only from AeroStat

Checks run from inside the backend container. Test from the same network with:

```bash
docker compose exec frontend wget -S -O /dev/null https://example.com
```

## A database on the same server shows as down

Checks run from inside the backend container, where `localhost` is the container itself, not your server. For MySQL, MariaDB, Postgres or Redis installed directly on the server (not in Docker):

- Use `host.docker.internal` as the host, like `host.docker.internal:3306`, or the server's own IP address.
- Make the database listen on more than `127.0.0.1`: `bind-address = 0.0.0.0` for MySQL and MariaDB, `listen_addresses = '*'` for Postgres, `bind 0.0.0.0` for Redis. Keep the port closed in your firewall for the outside world.
- No password or user is needed. An answer like "host is not allowed to connect" still counts as up, because the database answered.

A database in another Docker container is easier: check the container with a Docker check, or put both in the same Docker network and use the container name as the host.

## A ping check says the server is not allowed to send pings

Ping uses an unprivileged ICMP socket. Docker allows that by default, but some hosts or older Docker versions don't. Use a TCP check on a port that is open instead, or allow ping for the container's group with the sysctl `net.ipv4.ping_group_range`.

## Locked out of the panel

Everything below runs from the server with the [command line](/reference/cli):

| Problem | Command |
| --- | --- |
| Forgot the password | `reset-password`, or `create-admin` for an admin |
| Lost the authenticator app and recovery codes | `reset-2fa` |
| Lost the passkey, password sign-in is off | `remove-passkeys` or `enable-password-login` |
| Too many failed sign-ins | `unblock` |
| The account is suspended | `unsuspend` |

## Every visitor has the same IP

AeroStat sees your proxy's address instead of the visitor's. Check the [reverse proxy](/guide/reverse-proxy) setup, and the [Cloudflare part](/guide/reverse-proxy#cloudflare-in-front-of-your-proxy) when you use Cloudflare.

## Passkeys stopped working

A passkey only works on the domain it was made for. When the status page address under **Settings → General** changes, everyone has to add their passkeys again.

## Everyone has to set up their authenticator app again

`SECRET_KEY` in `.env` changed or got lost. Put the old one back from your copy of `.env`, or let everyone set up their app again.
