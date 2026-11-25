# Monitoring

Add services under **Services → Add service** and pick a check type:

| Type | Checks | Up when |
| --- | --- | --- |
| HTTP(S) | a URL, like `https://example.com/health` | it answers with one of the expected status codes (200 by default) |
| DNS record | a domain name and a record type: A, AAAA, CNAME, MX or TXT | the name has records of that type, and one of them has the expected value when you set one |
| Ping | a host name or IP address | it answers a ping (ICMP) |
| TCP port | a host and port, like `mail.example.com:25` | a connection opens. For anything without a check of its own |
| Docker container | a container, picked from a list | the container runs and is not unhealthy. See [Docker containers](#docker-containers) |
| PostgreSQL | a host, optionally with a port (5432) | it answers like a PostgreSQL server |
| MySQL or MariaDB | a host, optionally with a port (3306) | it greets like a MySQL or MariaDB server |
| Redis | a host, optionally with a port (6379) | it answers `PING` |
| Minecraft Java | a server address, optionally with a port (25565) | it answers the server list ping |
| Minecraft Bedrock | a server address, optionally with a port (19132) | it answers a Bedrock ping |
| Source game | a server address, optionally with a port (27015) | it answers a server info query. For CS2, Rust, Garry's Mod, ARK and other Source games |

The database checks need no password: they speak the first few bytes of the real protocol, so a database that hangs counts as down even when its port is open. A server that answers "log in first" is up. Inside a Docker network a short name such as `db` works too.

Every check has a timeout of 10 seconds and runs every 30 seconds up to every 24 hours. A service is marked down after two failed checks in a row; change this under **Settings → Monitoring**.

## Docker containers

A Docker check asks Docker whether a container runs. AeroStat only reads; it never starts, stops or changes containers.

**Containers on the same server.** Start the read-only Docker proxy that comes with AeroStat:

```bash
docker compose --profile docker up -d
```

Then add a service with the type **Docker container**: pick **This server** and choose the container from the list. A container with a health check counts as down while it is unhealthy. While it is still starting, AeroStat waits: no result is saved and no message is sent until Docker calls it healthy or unhealthy.

**Containers on other servers.** Run the same proxy on that server and make its port reachable only for AeroStat, for example over a private network or VPN:

```yaml
services:
  docker-proxy:
    image: tecnativa/docker-socket-proxy:v0.5.0
    restart: unless-stopped
    environment:
      CONTAINERS: 1
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    ports:
      - "10.0.0.5:2375:2375"
```

Add it under **Settings → Docker** with a name and its address, like `http://10.0.0.5:2375`, and click **Test**. The service form then lets you pick that host and its containers.

::: warning Never put Docker on the open internet
Docker's port has no password. Only expose the proxy on a private network, and never the Docker socket itself.
:::

The backend looks for the proxy at `http://docker-proxy:2375`. To use something else, set `DOCKER_HOST` in `.env`, for example `unix:///var/run/docker.sock` when you mount the socket yourself (the backend runs as user 10001, so it also needs the socket's group).

## HTTP(S) options

- **Look for a keyword.** The page must contain a word (like `Welcome`), or must not contain one (like `Error`). Upper and lower case don't matter, and only the first 2 MB of a page is searched.
- **Warn before the certificate runs out.** For `https://` addresses AeroStat reads the certificate every few hours and sends one notification when it expires within the chosen number of days (14 by default, empty turns it off). A certificate that has already run out fails the check itself.

Notifications say why a check failed, for example the status code, a missing keyword, a refused connection or a DNS record with another value.

## Groups

Put services in groups, like Websites or APIs, to keep the status page tidy. Change their order with the up and down arrows. A service without a group shows under Other.

## Slower than usual

AeroStat warns when a service answers much slower than usual. Every minute it looks at the last checks of each service:

- A check is **slow** when it is much slower than the usual response time of the past week (100% slower and at least 100 ms more by default), or above the service's own limit when you set one.
- A service **turns slow** when 3 of its last 5 checks were slow, so one hiccup stays quiet. It is back to normal when fewer than 3 are slow. Want a warning for every slow check? Set it to 1 of the last 1.

Change the percentage and the "3 of the last 5" under **Settings → Monitoring**. Per service you can set **Slow above (ms)** for a fixed limit, or turn **Warn when it answers slowly** off for a service whose speed always varies.

You get one message on Discord, by email and in the panel, the status page shows a notice, and the service shows **Slower than usual** in yellow. Services that turn slow at the same moment share one message, named by their group or **All**. A second message follows when they are back to normal. Pick per person where you get it under **Profile → Notifications** (Response times rise), and see how it looks with **Send test** under **Settings → Notifications**.

## Check log

Every service page in the panel lists its latest checks. A failed check shows why, and **Details** shows what came back: the status line, useful headers and the start of the page, or the technical error. Details are kept for a week and only shown in the panel.

**Test now** runs the check right away and shows the whole result, without saving it or sending a notification. Handy while you set up a check.

## Uptime bars

The status page shows a bar per day for the last 60 days. A day with an incident, maintenance or downtime gets its own colour and icon; a critical incident counts as downtime. Downtime during maintenance shows as maintenance, in blue. Hover a day to see what happened and that day's average response time, or click it to open the incident or maintenance.

Next to each service's status you see the response time of its last check. Response times only count checks that were up.

## Response time graph

Under Live Status the status page shows the average response time of all services, or of one service picked from the list, for the last day, week or month. Hover or tap the line to see the time and the value. Only checks that were up count, and a period with too few checks says so instead of drawing a line.

## Uptime history

**Incidents → Uptime** on the status page shows a calendar per month for each service, three months at a time. Each day has the same colour and details as the bars. The daily totals are kept after the raw checks are cleaned up, so the history goes back further than 60 days.

How long check results are kept is set with `METRICS_RETENTION_DAYS` or under **Settings → Monitoring**.

::: tip Checked from the backend
Checks run from inside the backend container. A service that works in your browser but shows as down is often blocked by a firewall, see [Troubleshooting](/reference/troubleshooting).
:::
