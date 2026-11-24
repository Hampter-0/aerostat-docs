# Monitoring

Add services under **Services → Add service** and pick a check type:

| Type | Checks | Up when |
| --- | --- | --- |
| HTTP(S) | a URL, like `https://example.com/health` | it answers with one of the expected status codes (200 by default) |
| TCP port | a host and port, like `db.example.com:5432` | a connection opens. For databases, mail servers, game servers and other services without a web page |
| DNS record | a domain name and a record type: A, AAAA, CNAME, MX or TXT | the name has records of that type, and one of them has the expected value when you set one |

Every check has a timeout of 10 seconds and runs every 30 seconds up to every 24 hours. A service is marked down after two failed checks in a row; change this under **Settings → Monitoring**.

## HTTP(S) options

- **Look for a keyword.** The page must contain a word (like `Welcome`), or must not contain one (like `Error`). Upper and lower case don't matter, and only the first 2 MB of a page is searched.
- **Warn before the certificate runs out.** For `https://` addresses AeroStat reads the certificate every few hours and sends one notification when it expires within the chosen number of days (14 by default, empty turns it off). A certificate that has already run out fails the check itself.

Notifications say why a check failed, for example the status code, a missing keyword, a refused connection or a DNS record with another value.

## Groups

Put services in groups, like Websites or APIs, to keep the status page tidy. Change their order with the up and down arrows. A service without a group shows under Other.

## Uptime bars

The status page shows a bar per day for the last 60 days. A day with an incident, maintenance or downtime gets its own colour and icon; a critical incident counts as downtime. Downtime during maintenance shows as maintenance, in blue. Hover a day to see what happened and that day's average response time, or click it to open the incident or maintenance.

Next to each service's status you see the response time of its last check. Response times only count checks that were up.

## Response time graph

Under Live Status the status page shows the average response time of all services, or of one service picked from the list, for the last day, week or month. Hover or tap the line to see the time and the value. Only checks that were up count, and a period with too few checks says so instead of drawing a line.

How long check results are kept is set with `METRICS_RETENTION_DAYS` or under **Settings → Monitoring**.

::: tip Checked from the backend
Checks run from inside the backend container. A service that works in your browser but shows as down is often blocked by a firewall, see [Troubleshooting](/reference/troubleshooting).
:::
