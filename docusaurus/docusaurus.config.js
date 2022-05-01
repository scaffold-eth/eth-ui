// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
const themeConfig = {
  navbar: {
    title: 'eth-hooks',
    logo: {
      alt: 'eth-hooks logo',
      src: 'img/logo.svg',
    },
    items: [
      {
        type: 'doc',
        docId: 'overview',
        position: 'left',
        label: 'Docs',
      },
      {
        type: 'docSidebar',
        position: 'left',
        sidebarId: 'api',
        label: 'API',
      },
      {
        href: 'https://github.com/scaffold-eth/eth-hooks',
        label: 'GitHub',
        position: 'right',
      },
    ],
  },
  footer: {
    style: 'dark',
    links: [
      {
        title: 'Learn',
        items: [
          {
            label: 'Main overview',
            to: '/docs/overview',
          },
          {
            label: 'Quick start',
            to: '/docs/main/guides/intro',
          },
          {
            label: 'API',
            to: '/docs/api/API Documentation',
          },
        ],
      },
      {
        title: 'Community',
        items: [
          {
            label: 'Twitter',
            href: 'https://twitter.com/buidlguidl',
          },
          {
            label: 'GitHub',
            href: 'https://github.com/scaffold-eth/eth-hooks',
          },
        ],
      },
      {
        title: 'More',
        items: [
          {
            label: 'Scaffold-eth',
            href: 'https://github.com/scaffold-eth/scaffold-eth',
          },
          {
            label: 'Scaffold-eth-typescript',
            href: 'https://github.com/scaffold-eth/scaffold-eth-typescript',
          },
          {
            label: 'BuidlGuild',
            href: 'https://buidlguidl.com/',
          },
          
        ],
      },
    ],
    copyright: `Copyright © ${new Date().getFullYear()} eth-hooks.`,
  },
  prism: {
    // @ts-ignore
    theme: lightCodeTheme,
    // @ts-ignore
    darkTheme: darkCodeTheme,
  },
};

/** @type {import('@docusaurus/preset-classic').Options} */
const classicOptions = {
  docs: {
    sidebarPath: require.resolve('./sidebars.js'),
    // Please change this to your repo.
    editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
  },
  blog: {
    showReadingTime: true,
    // Please change this to your repo.
    editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
  },
  theme: {
    customCss: require.resolve('./src/css/custom.css'),
  },
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'eth-hooks',
  tagline: 'React hooks to supercharge your Web3 frontend development',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/eth-hooks/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'scaffold-eth',
  projectName: 'eth-hooks',

  presets: [['classic', classicOptions]],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    (themeConfig),
};

module.exports = config;
