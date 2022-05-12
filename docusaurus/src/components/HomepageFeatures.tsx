import useBaseUrl from '@docusaurus/useBaseUrl';
import React, { FC } from 'react';

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
        <a href="https://github.com/scaffold-eth/scaffold-eth-typescript" target="_blank" rel="noreferrer">
          scaffold-eth-typescript
        </a>{' '}
        template!
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
        Use the <code>ContractAppContext</code> and{' '}
        <a href="https://docs.ethers.io/v5/" target="_blank" rel="noreferrer">
          ethers.js
        </a>{' '}
        to have typed access to your smart contracts. This gives you reliable read and write controls to smart contracts
        and even lets you pass different ethers providers.
      </>
    ),
  },
];

const Feature: FC<FeatureItem> = ({ title, image, description }) => {
  return (
    <div className="grid grid-cols-1 justify-items-center">
      <div className="">
        <img
          className={styles.featureSvg}
          style={{ height: '200px', width: '229px' }}
          alt={title}
          src={useBaseUrl(image)}
        />
      </div>
      <div className="p-3"></div>
      <div className="grid grid-cols-1 justify-items-center p-6">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export const HomepageFeatures: FC = () => {
  return (
    <section className="p-5 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    </section>
  );
};
