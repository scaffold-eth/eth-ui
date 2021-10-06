import { Signer } from 'ethers';

export interface IEthersConnector {
  getSigner: () => Signer | undefined;
  // setSigner: (signer: Signer) => void;
  changeAccount: (signer: Signer) => Promise<void>;
}
