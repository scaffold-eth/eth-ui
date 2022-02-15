import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';


type EcosystemItem ={
  title: string;
  description: JSX.Element;
  url: string;
  btnText: string
};

const EcosystemList: EcosystemItem[] = [
  {
    title: 'Scaffold-eth',
    description: (
      <>
        Fast fullstack blockchain application development 
      </>
    ),
    url: "https://github.com/scaffold-eth/scaffold-eth",
    btnText: "Let's see the repo"
  },
  {
    title: 'Eth-components',
    description: (
      <>
        Common React components for blockchain applications
      </>
    ),
    url: "https://github.com/scaffold-eth/eth-components",
    btnText: "Check out the components repo"
  },
  {
    title: 'Eth-hooks',
    description: (
      <>
        Useful React hooks for blockchain application development
      </>
    ),
    url: "https://github.com/scaffold-eth/scaffold-eth",
    btnText: "I want the hooks repo"
  },
];

function Ecosystem({ title, description, url, btnText}: EcosystemItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
      <div className="card-demo">
       <div className="card">
         <div className="card__header">
           <h3>{title}</h3>
         </div>
        <div className="card__body">
          <p>
            {description}
           </p>
         </div>
        <div className="card__footer">
        
          <button className="button button--secondary button--block">
            <a href={url} target='_blank'>{btnText}</a>
          </button>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
}

export default function HomepageEcosystemItems(): JSX.Element {
  return (
    <div className={styles.background}>
    <section className={styles.features}>
      <div className='container'>
        <h2 className={styles.title}>The Scaffold-eth Ecosystem</h2>
        <h3 className={styles.subtitle}>A one-stop shop for all your Web3 development needs</h3>
      <div className="row">
        {EcosystemList.map((props, idx) => (
          <Ecosystem key={idx} {...props} />
        ))} 
      </div>
    </div>
    </section>
    </div>
  );
}



