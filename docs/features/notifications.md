# Notifications

AeroStat can tell you when something happens on Discord, by email and through notifications in the panel.

## Discord

Under **Settings → Notifications**, paste a Discord webhook URL (in Discord: Server settings → Integrations → Webhooks → New Webhook → Copy Webhook URL) and pick which events to post:

- a service goes down (after two failed checks in a row) or comes back up, with how long it was down
- the HTTPS certificate of a service runs out soon (off by default, since a Discord channel is often public)
- an incident is posted, updated or resolved (not for a past incident you add afterwards)
- maintenance is planned, starts, ends or is cancelled

Set the status page address under **Settings → General**, so messages link to the incident or maintenance. **Send test message** checks that everything arrives. Only real Discord webhook URLs are accepted, and the saved URL is never shown in full again.

## Email

Panel users can get the same notifications by email. Add your mail server to `.env`:

```ini
SMTP_HOST=mail.example.com
SMTP_PORT=465
SMTP_ENCRYPTION=tls
SMTP_USERNAME=noreply@example.com
SMTP_PASSWORD=your-password
SMTP_FROM_ADDRESS=noreply@example.com
```

Restart with `docker compose up -d`. People with the Email settings permission see the settings under **System → Email** and can send a test email there; the password is never shown.

Each user then picks their notifications on their **Profile**, and only gets the ones their roles let them see: services, incidents or maintenance. Everyone gets their own email, so addresses are never shared. Suspended users get nothing.

## Panel notifications

While you use the panel, new notifications pop up at the bottom right: services going down or coming back, incidents, maintenance, certificates that run out and admin notices. It needs no setup.

- Click a notification to open the page it is about. It closes on its own after a few seconds.
- Notifications that came in while you were away show up when you open the panel: the newest three, and a note with how many more there were.
- Pick what shows up under **Profile → Notifications**, in the Panel column next to Email. You only get what your roles let you see, and never a notification about something you did yourself.
- Don't want them at all? Turn off **Show notifications in the panel** on your profile. Nothing is saved for you then; email keeps working.

Notifications are removed automatically after 30 days.
