/* eslint-disable unused-imports/no-unused-vars-ts */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { ExternalProvider } from '@ethersproject/providers';

interface Ethereum {
  send: unknown;
  enable: () => Promise<string[]>;
  on?: (method: string, listener: (...args: any[]) => void) => void;
  removeListener?: (method: string, listener: (...args: any[]) => void) => void;
}

declare interface Window {
  ethereum: ExternalProvider & Ethereum;
}

(window as any).global = window;
const global = window;
