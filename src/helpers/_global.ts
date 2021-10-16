/* eslint-disable unused-imports/no-unused-vars-ts */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ExternalProvider } from '@ethersproject/providers';

(window as any).global = window;
const global = window;
export interface Window {
  ethereum: ExternalProvider;
  location: any;
  localStorage: { getItem: (key: string) => any; setItem: (key: string, value: string) => any };
}
