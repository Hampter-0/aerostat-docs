# Introduction

AeroStat is a self-hosted status page. It checks your websites, APIs, servers and DNS, shows visitors how they are doing with daily uptime bars, and lets you post incidents and planned maintenance from a small admin panel at `/manage`.

It runs on your own server with Docker: a Rust backend, a Next.js frontend, Postgres and Redis. You configure it with a single `.env` file.

![The AeroStat status page](/screenshots/status-page.png)

## Features

- A public status page with daily uptime bars for the last 60 days, incidents and maintenance
- [Checks](/features/monitoring) over HTTP(S) with status codes and keywords, TCP ports and DNS records, plus a warning before an HTTPS certificate runs out
- [Incidents and maintenance](/features/incidents) with their real start and end time
- [Notifications](/features/notifications) on Discord, by email and trough notifications in the panel
- [Users, roles and admins](/features/users) with fine-grained permissions and an activity log
- [Passkeys, two-factor sign-in](/features/sign-in) and security emails
- [Backups](/features/backups) every day and before every update, with restore from the panel
- A [public JSON API and SVG badges](/features/api)
- Light and dark mode, and times in the visitor's own timezone
- Link previews for Discord, Slack and social media that show the live status

## Screenshots

| | |
| --- | --- |
| ![Admin dashboard](/screenshots/dashboard.png) | ![Incident timeline](/screenshots/incident.png) |
| Admin dashboard | Incident timeline |
| ![Users](/screenshots/users.png) | ![A role with its permissions](/screenshots/role.png) |
| Users and their sign-in security | Permissions per role |
| ![Profile](/screenshots/profile.png) | ![Backups](/screenshots/backups.png) |
| Passkeys and two-factor sign-in | Backups |
| ![Activity log](/screenshots/activity.png) | ![Help page](/screenshots/help.png) |
| Activity log | Help and install checks |

## Run it somewhere else

A status page can't report an outage of the server it runs on. If AeroStat and your services share a server, a crash or network problem takes them all down at once and nobody gets a notification. Run AeroStat on another server, ideally with another provider or in another region than the services it watches. A small VPS is plenty.

Ready? Go to [Installation](/guide/installation).
