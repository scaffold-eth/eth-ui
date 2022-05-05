// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const typedocConfig = require('./typedoc');

const lightCodeTheme = require('prism-react-renderer/themes/nightOwlLight');
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
      { to: 'blog', label: 'Blog', position: 'left' },
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
            to: '/docs/api/',
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
  colorMode: {
    defaultMode: 'dark',
    disableSwitch: true,
    respectPrefersColorScheme: false,
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
    remarkPlugins: [require('mdx-mermaid')],
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

/** @type {import('@docusaurus/types').PluginConfig[]} */
const plugins = [
  [
    'docusaurus-plugin-typedoc',
    {
      ...typedocConfig,
      watch: process.env.TYPEDOC_WATCH,
      hideInPageTOC: true,
    },
  ],
  async function tailwindPlugin(context, options) {
    return {
      name: 'docusaurus-tailwindcss',
      configurePostCss(postcssOptions) {
        // Appends TailwindCSS and AutoPrefixer.
        postcssOptions.plugins.push(require('tailwindcss'));
        postcssOptions.plugins.push(require('autoprefixer'));
        return postcssOptions;
      },
    };
  },
];

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'eth-hooks-documentation',
  tagline: 'React hooks to supercharge your Web3 frontend development',
  url: 'https://scaffold-eth.github.io',
  baseUrl: '/eth-hooks/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'error',
  favicon: 'img/favicon.ico',
  organizationName: 'scaffold-eth',
  projectName: 'eth-hooks',

  presets: [['classic', classicOptions]],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    (themeConfig),
  plugins,
  themes: [
    '@saucelabs/theme-github-codeblock',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        // language: ["en", "zh"],
        // ```
      },
    ],
  ],
};

module.exports = config;
