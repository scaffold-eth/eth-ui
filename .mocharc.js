console.log('load .mocharc.js config');

module.exports = {
  require: ['hardhat/register', 'ts-node/register', 'ts-node/register/files'],
  timeout: 30000,
  bail: false,
  allowUncaught: false,
  reporter: process.env.GITHUB_ACTIONS === 'true' ? 'mocha-junit-reporter' : 'spec',
  reporterOptions: {
    mochaFile: 'testresult.xml',
  },
  extension: ['js', 'ts', 'tsx', 'jsx'],
  spec: ['test/**/*'],
  parallel: false,
  recursive: true,
  jobs: 1,
};
