// @ts-check

/** @type {Partial<import('typedoc/dist/lib/utils').TypeDocOptions>} */
const options = {
  defaultCategory: 'Misc',
  categoryOrder: ['Hooks', 'EthersAppContext', 'ContractAppContext', 'Models', 'Helpers', 'TestUtils', '*'],
  categorizeByGroup: false,
  cleanOutputDir: true,
  readme: 'none',
  entryPoints: [
    '../eth-hooks/src/helpers/typedoc/hooks.docs.ts',
    '../eth-hooks/src/helpers/typedoc/ethersAppContext.docs.ts',
    '../eth-hooks/src/helpers/typedoc/contractAppContext.docs.ts',
    '../eth-hooks/src/helpers/typedoc/models.docs.ts',
    '../eth-hooks/src/helpers/typedoc/functions.docs.ts',
    '../eth-hooks/src/helpers/typedoc/helpers.docs.ts',
    '../eth-hooks/src/helpers/typedoc/test-utils.docs.ts',
  ],
  entryPointStrategy: 'expand',
  hideGenerator: true,
  hideLegend: false,
  includeVersion: true,
  sort: ['source-order'],
  excludePrivate: true,
  excludeInternal: true,
  listInvalidSymbolLinks: true,
  logLevel: 'Verbose',
  excludeExternals: true,
  exclude: ['**/test/**', '**/test-files/**', '**/*.test.ts', '**/*.test.tsx'],
  externalPattern: ['**/node_modules/**', '**/test/**', '**/test-files/**'],
  tsconfig: '../eth-hooks/tsconfig.docs.json',
  treatWarningsAsErrors: true,
};

module.exports = options;
