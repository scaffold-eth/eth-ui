import { lazy, ComponentType, LazyExoticComponent } from 'react';

/**
 * modified react lazy to allow for named exports
 * e.g. export const ExampleUI = lazier(() => import('./exampleui/ExampleUI'), 'ExampleUI');
 * @param importFactory a callback that imports e.g. () => import('./exampleui/ExampleUI')
 * @param importName the named export you want to import.
 * @returns
 */
export const lazier = <T extends ComponentType<any>>(
  importFactory: () => Promise<{
    [name: string]: T;
  }>,
  importName: string
): LazyExoticComponent<T> => {
  return lazy(() => {
    return importFactory().then((module) => ({ default: module[importName] }));
  });
};
