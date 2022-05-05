import React, { FC } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';

import { useBgPrimary, useHeroTextColor as useTextColor } from '../hooks/themeColorHooks';

interface EcosystemItem {
  title: string;
  description: object;
  url: string;
  btnText: string;
}

const EcosystemList: EcosystemItem[] = [
  {
    title: 'Scaffold-eth-typescript',
    description: <>Fast fullstack blockchain application development</>,
    url: 'https://github.com/scaffold-eth/scaffold-typescript-eth',
    btnText: "Let's see the repo",
  },
  {
    title: 'Eth-hooks',
    description: <>Useful React hooks for blockchain application development</>,
    url: 'https://github.com/scaffold-eth/scaffold-eth',
    btnText: 'I want the hooks repo',
  },
  {
    title: 'Eth-components',
    description: <>Common React components for blockchain applications</>,
    url: 'https://github.com/scaffold-eth/eth-components',
    btnText: 'Check out the components repo',
  },
  {
    title: 'Scaffold-eth',
    description: <>Fast fullstack blockchain application development</>,
    url: 'https://github.com/scaffold-eth/scaffold-eth',
    btnText: "Let's see the repo",
  },
];

const Ecosystem: FC<EcosystemItem> = ({ title, description, url, btnText }) => {
  return (
    <div className="grid justify-items-center grid-cols-1">
      <div className="card shadow-xl m-5">
        <div className="card-body items-center text-center">
          <h3 className="card-title items-center text-center">{title}</h3>
          <p>{description}</p>
          <div className="card-actions">
            <button className="btn">
              <a href={url} className="primary" target="_blank" rel="noreferrer">
                {btnText}
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HomepageEcosystemItems: FC = () => {
  const bg = useBgPrimary();
  const textColor = useTextColor();

  return (
    <section className="p-5 pt-5 pb-5">
      <div className={`rounded-md grid grid-cols-1 pt-10 pb-10 m-5 place-content-around ${bg}`}>
        <h2 className={`text-center text-4xl ${textColor}`}>The Scaffold-eth Ecosystem</h2>
        <div className="p-2"></div>
        <div className={`text-center text-xl ${textColor}`}>A one-stop shop for all your Web3 development needs</div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 self-center justify-center ">
        <Ecosystem key={0} {...EcosystemList[0]} />
        <Ecosystem key={0} {...EcosystemList[1]} />
        <Ecosystem key={0} {...EcosystemList[2]} />
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 content-center ">
        <div></div>
        <Ecosystem key={0} {...EcosystemList[3]} />
      </div>
    </section>
  );
};
