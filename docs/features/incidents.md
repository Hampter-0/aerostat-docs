# Incidents and maintenance

Tell visitors what is going on. Incidents are for things that go wrong, maintenance is for work you plan ahead. Both show on the status page with a timeline of updates and the services they affect.

## Incidents

Post one under **Incidents → New incident**: a title, the affected services, a severity and a first update.

| Severity | Meaning |
| --- | --- |
| Minor | Something small, most people won't notice |
| Major | A clear problem for many people |
| Critical | A service is unusable. Its days turn red and count as downtime |

Each update has a status, which moves the incident along:

| Status | Meaning |
| --- | --- |
| Investigating | We are looking into it |
| Identified | We know the cause |
| Monitoring | A fix is out, we are watching |
| Resolved | Everything is back to normal |

### Real start and end times

An incident keeps the time it really started and ended, not the time you typed it in:

- Fill in **Ended at** to add an incident that is already over.
- Date an update back to when it happened. Updates dated back send no notifications.
- Move the end afterwards when it turns out to be wrong.

## Maintenance

Plan maintenance under **Maintenance → Schedule maintenance** with a start, an end and the affected services. Visitors see it coming on the status page.

| Status | Meaning |
| --- | --- |
| Scheduled | Planned, not started yet |
| In progress | Work is happening now |
| Completed | Work is done, ends it now |
| Cancelled | Not going ahead |

Cancelled maintenance can be brought back.

## Notifications

Posting, updating and resolving incidents, and maintenance that is planned, starts, ends or is cancelled, can go to [Discord, email and the bell](/features/notifications). Link previews of an incident or maintenance page show its live status when you share it.

Who can post, edit or delete incidents and maintenance is set with [roles](/features/users).
