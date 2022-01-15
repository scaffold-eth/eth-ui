import {
  JsonRpcProvider,
  StaticJsonRpcProvider,
  Web3Provider,
  Provider,
  JsonRpcSigner,
} from '@ethersproject/providers';
import { Signer, VoidSigner, Wallet, Event, EventFilter } from 'ethers';
import { Result } from 'ethers/lib/utils';
/**
 * #### Summary
 * A union of various ethers providers for ease of use and maximum flexiblity
 *
 * ##### ✏️ Notes
 * Used by eth-hooks, eth-components and scaffold-eth-typescript
 *
 * @category Models
 */
export type TEthersProvider = JsonRpcProvider | Web3Provider | StaticJsonRpcProvider;

/**
 * #### Summary
 * A union of various providers and signers in ethers to give maximum flexibility
 *
 * @category Models
 */
export type TEthersProviderOrSigner =
  | JsonRpcProvider
  | Web3Provider
  | StaticJsonRpcProvider
  | Signer
  | JsonRpcSigner
  | Wallet
  | VoidSigner;

/**
 * #### Summary
 * A union of various providers in ethers to give maximum flexibility
 *
 * @category Models
 */
export type TEthersSigner = Signer | JsonRpcSigner | Wallet | VoidSigner;

/**
 * #### Summary
 * A union of abstract, non initalizable providers, used by some functions
 *
 * @category Models
 */
export type TAbstractProvider = Provider;

/**
 * #### Summary
 * An generic extension of EventFilter that is used by TypedEvent.  It allows for typed events to be returned
 *
 * @category Models
 */
export type TypedEventFilter<
  _EventArgsArray extends Array<any>,
  _EventArgsObject extends Record<string, any>
> = EventFilter;

/**
 * #### Summary
 * An generic extension of Event.  It types the the arguments and return values of the contract event to be used in typescript.
 *
 * @category Models
 */
export type TypedEvent<EventArgs extends Result> = Event & {
  args: EventArgs;
};
