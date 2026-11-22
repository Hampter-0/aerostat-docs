import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en',
  title: 'AeroStat',
  titleTemplate: ':title, AeroStat docs',
  description: 'Install, configure and run AeroStat, the self-hosted status page with uptime monitoring, incidents and maintenance.',
  cleanUrls: true,
  appearance: 'force-dark',
  lastUpdated: true,
  sitemap: {
    hostname: 'https://docs.aerostatus.nl',
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#111317' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Releases', link: 'https://github.com/Hampter-0/AeroStat/releases' },
      { text: 'aerostatus.nl', link: 'https://aerostatus.nl' },
    ],
    sidebar: [
      {
        text: 'Getting started',
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Reverse proxy and HTTPS', link: '/guide/reverse-proxy' },
          { text: 'Updating', link: '/guide/updating' },
          { text: 'Configuration', link: '/guide/configuration' },
        ],
      },
      {
        text: 'Using AeroStat',
        items: [
          { text: 'Monitoring', link: '/features/monitoring' },
          { text: 'Incidents and maintenance', link: '/features/incidents' },
          { text: 'Notifications', link: '/features/notifications' },
          { text: 'Users, roles and admins', link: '/features/users' },
          { text: 'Sign-in security', link: '/features/sign-in' },
          { text: 'Backups', link: '/features/backups' },
          { text: 'Status API and badges', link: '/features/api' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'Command line', link: '/reference/cli' },
          { text: 'Troubleshooting', link: '/reference/troubleshooting' },
          { text: 'Development', link: '/reference/development' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/Hampter-0/AeroStat' }],
    search: {
      provider: 'local',
    },
    outline: {
      level: [2, 3],
    },
    editLink: {
      pattern: 'https://github.com/Hampter-0/aerostat-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    footer: {
      message: 'Released under the MIT License.',
    },
  },
})
