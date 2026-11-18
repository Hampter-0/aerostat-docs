# Sign-in security

## Passkeys

Panel users can sign in with a passkey instead of a password: Windows Hello, Face ID, Touch ID, a phone or a security key. Add one under **Profile → Security keys**.

A passkey only works on the domain it was made for, so set the status page address under **Settings → General** first (for example `https://status.example.com`). If that address ever changes, everyone has to add their passkeys again.

Someone with a passkey can turn password sign-in off on their profile. Signing in with a passkey never counts towards the sign-in block.

## Two-factor sign-in

Panel users can ask for a code after their password under **Profile → Two-factor sign-in**: from an authenticator app (1Password, Bitwarden, Google Authenticator, Aegis and so on) or by email. Turning on the first method gives 10 recovery codes, each one works once when the app or email is out of reach.

The authenticator app needs `SECRET_KEY` in `.env`, which encrypts the app secrets in the database:

```bash
openssl rand -hex 32
```

::: warning Keep the key
Keep this key with your backups. If it changes or gets lost, everyone has to set up their app again. Email codes need [email](/features/notifications#email) to be set up and work without the key.
:::

Turning a method off needs your password and a code: from the app, from an email sent for it, or a recovery code. A stolen password alone can't turn it off.

Someone who can edit users can require two-factor sign-in for a user. That user then has to turn on a method, or sign in with passkeys only (password sign-in off), before they can use the panel. If someone loses their phone, open them under **Users** and use **Reset two-factor**.

## Sessions

Under **Profile → Sessions** you see where you are signed in, with the browser and IP address, and can sign out other devices. A sign-in lasts `SESSION_DAYS` (30 days by default).

## Sign-in block

Too many failed sign-ins from one IP address block it for a while. An account that gets too many failed sign-ins blocks new IP addresses, but IPs that signed in to it in the last 90 days still get in, so nobody can lock you out by guessing your password. The limits are in [Configuration](/guide/configuration#sign-in), and `unblock` in the [command line](/reference/cli) lifts a block.

## Forgot password

The sign-in page shows **Forgot password?** when email is set up and the status page address is filled in under **Settings → General**. People get a link that works once, for 30 minutes, and are signed out everywhere after they choose a new password. Two-factor sign-in still applies. The answer is the same for addresses that have no account, so the page can't be used to find out who has one.

Without email, an admin can set a new password on the user's page, or use `reset-password` in the [command line](/reference/cli).

## Security emails

When email is set up, AeroStat emails a user when their sign-in changes: password changed or reset, email address changed (sent to the old address), passkey added or removed, password sign-in turned on or off, two-factor turned on or off, new recovery codes, or two-factor reset by an admin. Each email says when it happened and from which IP address, so someone whose account is taken over finds out. Users without an email address get nothing.
