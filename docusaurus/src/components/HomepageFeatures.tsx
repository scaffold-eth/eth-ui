import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Fast & Easy React Hooks',
    image: '/img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        Speed up your frontend development with pre-built hooks for use with context,
        allowing easy use throughout your application.
      </>
    ),
  },
  {
    title: 'Optimized Web3 Development',
    image: '/img/undraw_docusaurus_tree.svg',
    description: (
      <>
        A dedicated cache to reduce RPC calls. Several different network update options.
        Typed contracts to increase clarity.
        These are just a few of the benefits you get with eth-hooks.

      </>
    ),
  },
  {
    title: 'Seemless Smart Contract Interaction',
    image: '/img/undraw_docusaurus_react.svg',
    description: (
      <>
        We use the <a href="https://docs.ethers.io/v5/" target="_blank">ethers.js</a> library under-the-hood.
        This gives you reliable read and write controls to smart contracts and
        even lets you pass different ethers providers.
      </>
    ),
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={useBaseUrl(image)} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))} 
        </div>
      </div>
    </section>
  );
}
