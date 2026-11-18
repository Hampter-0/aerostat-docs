# Notifications

AeroStat can tell you when something happens on Discord, by email and in a bell in the panel.

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

## The bell

The bell at the bottom right of the panel collects everything that happened while you were away: services going down or coming back, incidents, maintenance, certificates that run out and admin notices. It needs no setup.

- **All**, **Unread** and **Important** tabs. Outages, critical incidents and security notices count as important and turn the badge red.
- Click a notification to open the page it is about. Mark them all as read, remove one, or clear the list.
- **Mute the count** for 1, 8 or 24 hours. Notifications are still saved, the badge just stays quiet.
- Pick what shows up under **Profile → Notifications**, in the Panel column next to Email. You only get what your roles let you see, and never a notification about something you did yourself.
- Don't want it at all? Turn off **Show the notification bell** on your profile. The bell disappears and nothing is saved for you; email keeps working.

Notifications are removed automatically after 30 days, read or not.
