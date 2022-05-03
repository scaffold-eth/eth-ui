import React, { FC } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import { HomepageFeatures } from '../components/HomepageFeatures';
import { HomepageEcosystemItems } from '../components/HomepageEcosystemItems';

const HomepageHeader: FC = () => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/guides/intro">
            Quick Start Guide - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
};

const Home: FC = () => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`} description="React hooks for easy web3 development">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageEcosystemItems />
      </main>
    </Layout>
  );
};
export default Home;
