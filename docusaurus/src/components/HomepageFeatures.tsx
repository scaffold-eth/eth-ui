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
    title: 'Fast & Easy Web3 React Hooks',
    image: '/home/features1.png',
    description: (
      <>
        Speed up your frontend development with pre-built hooks for use with <code>EthersAppContext</code>, allowing
        easy use throughout your application. Additionally, works out of the box with{' '}
        <code>scaffold-eth-typescript</code> template!
      </>
    ),
  },
  {
    title: 'Optimized Web3 Development',
    image: '/home/features2.png',
    description: (
      <>
        Dedicated caching reduces RPC calls. Use a variety of web3 network update options. Typed contracts increase the
        clarity of the contract interface. These are just a few of the benefits you get with eth-hooks.
      </>
    ),
  },
  {
    title: 'Seemless Smart Contract Interaction',
    image: '/home/features3.png',
    description: (
      <>
        Use the <code>ContractAppContext</code> and <code>ethers.js</code> to have typed access to your smart contracts.
        This gives you reliable read and write controls to smart contracts and even lets you pass different ethers
        providers.
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
