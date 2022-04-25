/**
 * disable react 18 warnings until react testing hook library and react testing library are fixed
 */
export const mochaRootHook_disableReact18Warnings = {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  beforeAll() {
    //* **Add This***
    const error = console.error;
    console.error = (...args: any[]): void => {
      if (/Warning: ReactDOM.render is no longer supported in React 18./.test(args[0] as string)) {
        return;
      } else {
        error(args);
      }
    };
  },
};
