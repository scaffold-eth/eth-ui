import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import React, { FC } from 'react';

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
    url: 'https://github.com/scaffold-eth/scaffold-eth-typescript',
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
    <div className="grid grid-cols-1 justify-items-center items-stretch">
      <div className=" m-5 shadow-xl card">
        <div className="items-center text-center card-body">
          <h3 className="items-center text-center card-title">{title}</h3>
          <p className="max-w-xs">{description}</p>
          <div className="card-actions">
            <button className="btn">
              <a href={url} target="_blank" rel="noreferrer">
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
    <section className="py-5">
      <div className={`rounded-md grid grid-cols-1 pt-16 pb-16 m-5 place-content-around bg-primary`}>
        <h2 className={`text-center text-4xl text-black`}>The Scaffold-eth Ecosystem</h2>
        <div className="p-2"></div>
        <div className={`text-center text-xl text-black`}>A one-stop shop for all your Web3 development needs</div>
      </div>
      <div className="grid grid-cols-1 justify-center self-center lg:grid-cols-3 ">
        <Ecosystem key={0} {...EcosystemList[0]} />
        <Ecosystem key={0} {...EcosystemList[1]} />
        <Ecosystem key={0} {...EcosystemList[2]} />
      </div>
      <div className="grid grid-cols-1 content-center lg:grid-cols-3 ">
        <div></div>
        <Ecosystem key={0} {...EcosystemList[3]} />
      </div>
    </section>
  );
};
