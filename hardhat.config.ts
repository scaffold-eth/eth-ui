import 'tsconfig-paths/register';
import 'global-jsdom/register';

import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import { HardhatUserConfig } from 'hardhat/types';

const config: HardhatUserConfig = {
  solidity: '0.8.6',
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      mining: {
        auto: true,
      },
    },
  },
  mocha: {
    asyncOnly: true,
    bail: false,
    require: ['ts-node/register'],
    timeout: 10000,
    reporter: process.env.GITHUB_ACTIONS === 'true' ? 'mocha-junit-reporter' : 'spec',
    reporterOptions: {
      mochaFile: './test/testresult.xml',
    },
  },
};

module.exports = config;
