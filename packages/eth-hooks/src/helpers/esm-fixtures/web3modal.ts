/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as cts from 'web3modal';

export const Web3Modal: cts.default = (cts.default as any)?.default ?? cts.default;
