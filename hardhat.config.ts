import 'tsconfig-paths/register';
import 'global-jsdom/register';

import '@typechain/hardhat';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-deploy';
import { HardhatUserConfig } from 'hardhat/types';

/**
 * this is used for hook tests
 */
const config: HardhatUserConfig = {
  solidity: '0.8.6',
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      mining: {
        auto: true,
        interval: 0,
      },
    },
  },
  mocha: {
    bail: false,
    allowUncaught: false,
    require: ['ts-node/register'],
    timeout: 30000,
    slow: 9900,
    reporter: process.env.GITHUB_ACTIONS === 'true' ? 'mocha-junit-reporter' : 'spec',
    reporterOptions: {
      mochaFile: 'testresult.xml',
      toConsole: true,
    },
  },
  paths: {
    cache: './test-files/__mocks__/generated/cache',
    artifacts: './test-files/__mocks__/generated/artifacts',
    deployments: './test-files/__mocks__/generated/deployments',
    sources: './test-files/contracts',
    deploy: './test-files/deploy',
  },
  typechain: {
    outDir: './test-files/__mocks__/generated/contract-types',
  },
};

module.exports = config;
