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
        auto: false,
      },
    },
  },
  mocha: {
    asyncOnly: true,
    bail: false,
  },
};

module.exports = config;
