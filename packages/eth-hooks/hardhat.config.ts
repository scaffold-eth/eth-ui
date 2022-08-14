// This adds support for typescript paths mappings
import './test/helpers/hardhat-imports';

import { HardhatUserConfig } from 'hardhat/types';
import { mochaRootHook_disableReact18Warnings } from 'test/helpers/mochaRootHooks';

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
    rootHooks: mochaRootHook_disableReact18Warnings,
  },
  paths: {
    root: './test-files',
    cache: './generated/cache',
    artifacts: './generated/artifacts',
    deployments: './generated/deployments',
    deploy: './deploy',
    tests: '../test',
  },
  typechain: {
    outDir: './generated/contract-types',
    discriminateTypes: true,
  },
};

export default config;
