# Reverse proxy and HTTPS

Put AeroStat behind a reverse proxy for HTTPS. Set `AEROSTAT_BIND=127.0.0.1` in `.env` so port 3000 is only reachable through the proxy. Only the frontend is published; the backend stays on the internal Docker network.

The proxy has to pass the original host, protocol and client IP. The sign-in cookie is marked `Secure` when `X-Forwarded-Proto` is `https`, and the client IP is used to block repeated failed sign-ins.

## Caddy

Caddy does all of this by default, HTTPS certificate included:

```
status.example.com {
    reverse_proxy 127.0.0.1:3000
}
```

## nginx

```nginx
server {
    listen 443 ssl;
    server_name status.example.com;
    # ssl_certificate ... / ssl_certificate_key ...

    client_max_body_size 2g;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-For $remote_addr;
    }
}
```

`client_max_body_size` allows uploads of logos, avatars and backups; nginx stops anything over 1 MB by default. Use `$remote_addr` as shown, so the proxy replaces any `X-Forwarded-For` a visitor sends and AeroStat sees the real IP.

For a free certificate from Let's Encrypt, run `certbot --nginx -d status.example.com`.

## Why the client IP matters

AeroStat only trusts `X-Forwarded-For` when the connection comes from a private address, like a proxy on the same server or Docker network. A visitor who connects straight to port 3000 from the internet is seen by their real address, whatever header they send. A visitor on your own local network could still send a made-up header, so for anything beyond a home lab run AeroStat behind a proxy and set `AEROSTAT_BIND=127.0.0.1`.

## Cloudflare in front of your proxy

Behind Cloudflare, your proxy sees Cloudflare's address instead of the visitor's, so every visitor would share a few IPs. Let the proxy take the visitor's IP from Cloudflare, and only from Cloudflare's own addresses, so nobody can fake it by going around Cloudflare.

**nginx**: add this to the `http` block, for example in `/etc/nginx/conf.d/cloudflare.conf`, and keep `X-Forwarded-For $remote_addr` in the AeroStat site. Take the current ranges from [cloudflare.com/ips](https://www.cloudflare.com/ips/):

```nginx
real_ip_header CF-Connecting-IP;
set_real_ip_from 173.245.48.0/20;
set_real_ip_from 103.21.244.0/22;
set_real_ip_from 103.22.200.0/22;
set_real_ip_from 103.31.4.0/22;
set_real_ip_from 141.101.64.0/18;
set_real_ip_from 108.162.192.0/18;
set_real_ip_from 190.93.240.0/20;
set_real_ip_from 188.114.96.0/20;
set_real_ip_from 197.234.240.0/22;
set_real_ip_from 198.41.128.0/17;
set_real_ip_from 162.158.0.0/15;
set_real_ip_from 104.16.0.0/13;
set_real_ip_from 104.24.0.0/14;
set_real_ip_from 172.64.0.0/13;
set_real_ip_from 131.0.72.0/22;
set_real_ip_from 2400:cb00::/32;
set_real_ip_from 2606:4700::/32;
set_real_ip_from 2803:f800::/32;
set_real_ip_from 2405:b500::/32;
set_real_ip_from 2405:8100::/32;
set_real_ip_from 2a06:98c0::/29;
set_real_ip_from 2c0f:f248::/32;
```

**Caddy**: tell it to trust Cloudflare and read its header, in the global options at the top of the Caddyfile:

```
{
    servers {
        trusted_proxies static 173.245.48.0/20 103.21.244.0/22 103.22.200.0/22 103.31.4.0/22 141.101.64.0/18 108.162.192.0/18 190.93.240.0/20 188.114.96.0/20 197.234.240.0/22 198.41.128.0/17 162.158.0.0/15 104.16.0.0/13 104.24.0.0/14 172.64.0.0/13 131.0.72.0/22 2400:cb00::/32 2606:4700::/32 2803:f800::/32 2405:b500::/32 2405:8100::/32 2a06:98c0::/29 2c0f:f248::/32
        client_ip_headers CF-Connecting-IP
    }
}

status.example.com {
    reverse_proxy 127.0.0.1:3000 {
        header_up X-Forwarded-For {client_ip}
    }
}
```

Check it under **Profile → Sessions**: your own IP should show there, not a Cloudflare address like `172.68.x.x` or `162.158.x.x`.

::: warning Upload limit
Cloudflare's free plan accepts uploads up to 100 MB. Upload bigger backups straight to the server instead.
:::

## TRUSTED_PROXY_HOPS

AeroStat reads the client IP from the last `X-Forwarded-For` entry. With the setups above that is the only entry, so leave `TRUSTED_PROXY_HOPS` at 1. Only when a proxy adds to the header instead of replacing it (nginx with `$proxy_add_x_forwarded_for`) behind another proxy that does the same, set it to the number of proxies in that chain. Prefer the setups above: with an adding chain, someone who reaches your server around the first proxy can still fake an IP.
