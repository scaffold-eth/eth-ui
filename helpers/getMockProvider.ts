// import '@nomiclabs/hardhat-waffle';
import { MockProvider } from 'ethereum-waffle';
// import { waffle } from 'hardhat';

// export const getMockProvider = (): MockProvider => waffle.provider;
export const getMockProvider = (): MockProvider => new MockProvider();
