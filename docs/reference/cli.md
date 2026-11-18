# Command line

The backend image includes an interactive CLI for tasks that need server access, also when nobody can sign in to the panel:

```bash
docker compose exec -it backend aerostat cli
```

Pick a command by its number or name:

| Command | What it does |
| --- | --- |
| `migrate` | Runs the database migrations |
| `create-admin` | Creates an admin account, or sets a new password for an existing one |
| `users` | Lists all accounts, with who is admin and who is suspended |
| `reset-password` | Sets a new password for an account, by username or email |
| `unblock` | Lifts a sign-in block for an account or IP address |
| `reset-2fa` | Turns off the authenticator app and email codes and removes the recovery codes |
| `remove-passkeys` | Removes every passkey of an account and turns password sign-in back on |
| `enable-password-login` | Turns password sign-in back on |
| `set-email` | Changes or removes an email address |
| `backups` | Lists the backups |
| `backup` | Makes a backup now |
| `restore` | Puts a backup back, after backing up the database as it is now |
| `set-owner` | Makes an account the owner, every other owner becomes a normal admin |
| `unsuspend` | Lets a suspended account sign in again |

Each change shows up under **Activity** in the panel.

## create-admin

Accounts made with `create-admin` are admins and the [owner](/features/users#owner) of the install. Running it again for an existing account sets a new password and lifts a suspension, so it also works as a way back in.

It runs on its own too, without opening the CLI:

```bash
docker compose exec -it backend aerostat create-admin --username admin
```

It asks for the password twice. In a script, pass it with `ADMIN_PASSWORD` instead:

```bash
docker compose exec -e ADMIN_PASSWORD='a-long-password' backend aerostat create-admin --username admin
```
