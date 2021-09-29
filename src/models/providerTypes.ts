import { JsonRpcProvider, StaticJsonRpcProvider, Web3Provider, Provider } from '@ethersproject/providers';
import { ethers, Signer } from 'ethers';
/**
 * A union of various providers in ethers to give maximum flexibility
 */
export type TEthersProvider = JsonRpcProvider | Web3Provider | StaticJsonRpcProvider;

/**
 * A union of various providers and signers in ethers to give maximum flexibility
 */
export type TEthersProviderOrSigner = JsonRpcProvider | Web3Provider | StaticJsonRpcProvider | Signer;

/**
 * A union of abstract, non initalizable providers, used by some functions
 */
export type TAbstractProvider = Provider;

// TODO: perhaps? provider should be TEthersProvider, what impact does this have?
//  the perse functions need to be change dtoo
export type TProviderAndSigner = {
  signer: Signer | undefined;
  provider: TAbstractProvider | undefined;
  providerNetwork: ethers.providers.Network | undefined;
};
