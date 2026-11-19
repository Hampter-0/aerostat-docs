# Users, roles and admins

Everyone who signs in to the panel has a user account. What they can do comes from three things: whether they are an admin, their roles, and extra permissions on their own account.

## Admins

An admin has full access to everything in the panel, including users, roles and settings, and gets a crown in the users list. Roles don't matter for an admin.

Admin is a switch on the user's page, not a role. Only an admin can make someone else an admin, and nobody can take it away from themselves.

## Owner

Accounts made with [`create-admin`](/reference/cli) are admins and the owner of the install. The owner is protected:

- Nobody else can change or delete the owner's account.
- Only the owner can change, suspend or delete another admin, take admin away from someone, or reset their password, email or two-factor.
- Someone who isn't an admin can only manage users who have no more rights than they have.

So one stolen admin account can't lock the owner out. To hand over the install, use `set-owner` in the [command line](/reference/cli).

## Roles

A role is a set of permissions, like "Support" that can post incidents but not touch settings. Create them under **Roles** and give users one or more. A user gets every permission of every role they have, plus any **extra permissions** ticked on their own page.

Permissions come in groups:

| Group | Permissions |
| --- | --- |
| Incidents | view, create, post updates, edit, delete |
| Maintenance | view, schedule, post updates, edit, cancel and reactivate, delete |
| Services | view, add, edit, delete, check now, and add, edit or delete groups |
| Settings | general, appearance, monitoring, time and region, notifications |
| Activity | view the activity log |
| System | view, email settings, backups, logs |
| Users | view, create, edit, delete |
| Roles | view, create, edit, delete |

Most permissions need their view permission, which is ticked along. Nobody can give a role or permission they don't have themselves.

## Suspending a user

Tick **Suspended** on a user's page to stop them without deleting the account:

- They are signed out right away and can't sign in.
- They get no email or panel notifications.
- Their activity and settings stay, so turning it off again puts everything back.

Nobody can suspend themselves or the owner, and only the owner can suspend an admin. Locked out of every admin account? `unsuspend` in the [command line](/reference/cli) works from the server.

## Activity log

Everything people change in the panel shows up under **Activity**: who did it, when, and from which IP address, with search and filters. Changes made with the command line show up there too.

When someone changes your password or email in the panel, you get an [email about it](/features/sign-in#security-emails).
