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
        sidebarId: 'guides',
        label: 'Guides',
      },
      {
        type: 'docSidebar',
        position: 'left',
        sidebarId: 'api',
        label: 'API',
      },
      { to: '/blog', label: 'Blog', position: 'left' },
      {
        href: 'https://github.com/facebook/docusaurus',
        label: 'GitHub',
        position: 'right',
      },
    ],
  },
  footer: {
    style: 'dark',
    links: [
      {
        title: 'Docs',
        items: [
          {
            label: 'main',
            to: '/docs/overview',
          },
        ],
      },
      {
        title: 'Community',
        items: [
          {
            label: 'Discord',
            href: 'https://discordapp.com/invite/docusaurus',
          },
          {
            label: 'Twitter',
            href: 'https://twitter.com/docusaurus',
          },
        ],
      },
      {
        title: 'More',
        items: [
          {
            label: 'Blog',
            to: '/blog',
          },
          {
            label: 'GitHub',
            href: 'https://github.com/facebook/docusaurus',
          },
        ],
      },
    ],
    copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
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
  tagline: 'Commonly used Ethereum hooks to supercharge your web3 dev!',
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
