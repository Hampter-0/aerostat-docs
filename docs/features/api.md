# Status API and badges

Every AeroStat site has a small public API, so other sites and tools can show your status. Both endpoints allow cross-origin requests and are cached for a short time.

## All services

`GET /api/status` returns the overall status, every service and anything ongoing:

```json
{
  "status": "operational",
  "last_checked": "2026-11-15T16:40:12Z",
  "services": [
    { "id": "website", "name": "Website", "group": "Websites", "status": "online", "last_checked": "2026-11-15T16:40:12Z" }
  ],
  "ongoing_incidents": [],
  "maintenance_in_progress": []
}
```

`status` is one of `operational`, `degraded` (an incident is ongoing), `outage` (a service is down), `maintenance` or `no_services`. A service is `online`, `offline` or `pending` (not checked yet). Each incident and maintenance lists the ids of the `services` it affects. Check URLs are never included.

## One service

`GET /api/status?service=<id>` returns one service, with only the incidents and maintenance that affect it:

```json
{
  "id": "contact-api",
  "name": "Contact API",
  "group": "APIs",
  "status": "online",
  "last_checked": "2026-11-15T16:40:12Z",
  "ongoing_incidents": [],
  "maintenance_in_progress": []
}
```

An unknown id returns `404` with `{"error": "Unknown service"}`. The id is the last part of the service's URL in the panel (`/manage/services/contact-api`) and is also listed in `/api/status`.

For example, to show a notice on your own site when a service is down:

```js
const res = await fetch('https://status.example.com/api/status?service=contact-api')
const service = await res.json()
if (service.status === 'offline') {
  // show "the contact form is temporarily unavailable"
}
```

## Badges

`GET /api/badge` returns an SVG badge for a README or website:

```markdown
![Status](https://status.example.com/api/badge)
![Website](https://status.example.com/api/badge?service=website)
![Status](https://status.example.com/api/badge?label=my%20app)
```

`service` picks one service by its id, and `label` replaces the text on the left.
