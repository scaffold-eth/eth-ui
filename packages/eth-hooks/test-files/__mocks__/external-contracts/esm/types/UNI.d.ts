import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import { Listener, Provider } from '@ethersproject/providers';
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from './common';
export interface UNIInterface extends utils.Interface {
  functions: {
    'DELEGATION_TYPEHASH()': FunctionFragment;
    'DOMAIN_TYPEHASH()': FunctionFragment;
    'PERMIT_TYPEHASH()': FunctionFragment;
    'allowance(address,address)': FunctionFragment;
    'approve(address,uint256)': FunctionFragment;
    'balanceOf(address)': FunctionFragment;
    'checkpoints(address,uint32)': FunctionFragment;
    'decimals()': FunctionFragment;
    'delegate(address)': FunctionFragment;
    'delegateBySig(address,uint256,uint256,uint8,bytes32,bytes32)': FunctionFragment;
    'delegates(address)': FunctionFragment;
    'getCurrentVotes(address)': FunctionFragment;
    'getPriorVotes(address,uint256)': FunctionFragment;
    'minimumTimeBetweenMints()': FunctionFragment;
    'mint(address,uint256)': FunctionFragment;
    'mintCap()': FunctionFragment;
    'minter()': FunctionFragment;
    'mintingAllowedAfter()': FunctionFragment;
    'name()': FunctionFragment;
    'nonces(address)': FunctionFragment;
    'numCheckpoints(address)': FunctionFragment;
    'permit(address,address,uint256,uint256,uint8,bytes32,bytes32)': FunctionFragment;
    'setMinter(address)': FunctionFragment;
    'symbol()': FunctionFragment;
    'totalSupply()': FunctionFragment;
    'transfer(address,uint256)': FunctionFragment;
    'transferFrom(address,address,uint256)': FunctionFragment;
  };
  encodeFunctionData(functionFragment: 'DELEGATION_TYPEHASH', values?: undefined): string;
  encodeFunctionData(functionFragment: 'DOMAIN_TYPEHASH', values?: undefined): string;
  encodeFunctionData(functionFragment: 'PERMIT_TYPEHASH', values?: undefined): string;
  encodeFunctionData(functionFragment: 'allowance', values: [string, string]): string;
  encodeFunctionData(functionFragment: 'approve', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'balanceOf', values: [string]): string;
  encodeFunctionData(functionFragment: 'checkpoints', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'decimals', values?: undefined): string;
  encodeFunctionData(functionFragment: 'delegate', values: [string]): string;
  encodeFunctionData(
    functionFragment: 'delegateBySig',
    values: [string, BigNumberish, BigNumberish, BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: 'delegates', values: [string]): string;
  encodeFunctionData(functionFragment: 'getCurrentVotes', values: [string]): string;
  encodeFunctionData(functionFragment: 'getPriorVotes', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'minimumTimeBetweenMints', values?: undefined): string;
  encodeFunctionData(functionFragment: 'mint', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'mintCap', values?: undefined): string;
  encodeFunctionData(functionFragment: 'minter', values?: undefined): string;
  encodeFunctionData(functionFragment: 'mintingAllowedAfter', values?: undefined): string;
  encodeFunctionData(functionFragment: 'name', values?: undefined): string;
  encodeFunctionData(functionFragment: 'nonces', values: [string]): string;
  encodeFunctionData(functionFragment: 'numCheckpoints', values: [string]): string;
  encodeFunctionData(
    functionFragment: 'permit',
    values: [string, string, BigNumberish, BigNumberish, BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: 'setMinter', values: [string]): string;
  encodeFunctionData(functionFragment: 'symbol', values?: undefined): string;
  encodeFunctionData(functionFragment: 'totalSupply', values?: undefined): string;
  encodeFunctionData(functionFragment: 'transfer', values: [string, BigNumberish]): string;
  encodeFunctionData(functionFragment: 'transferFrom', values: [string, string, BigNumberish]): string;
  decodeFunctionResult(functionFragment: 'DELEGATION_TYPEHASH', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'DOMAIN_TYPEHASH', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'PERMIT_TYPEHASH', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'allowance', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'approve', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'balanceOf', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'checkpoints', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'decimals', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'delegate', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'delegateBySig', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'delegates', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getCurrentVotes', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'getPriorVotes', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'minimumTimeBetweenMints', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'mint', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'mintCap', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'minter', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'mintingAllowedAfter', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'name', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'nonces', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'numCheckpoints', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'permit', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'setMinter', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'symbol', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'totalSupply', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transfer', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'transferFrom', data: BytesLike): Result;
  events: {
    'Approval(address,address,uint256)': EventFragment;
    'DelegateChanged(address,address,address)': EventFragment;
    'DelegateVotesChanged(address,uint256,uint256)': EventFragment;
    'MinterChanged(address,address)': EventFragment;
    'Transfer(address,address,uint256)': EventFragment;
  };
  getEvent(nameOrSignatureOrTopic: 'Approval'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'DelegateChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'DelegateVotesChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'MinterChanged'): EventFragment;
  getEvent(nameOrSignatureOrTopic: 'Transfer'): EventFragment;
}
export declare type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  {
    owner: string;
    spender: string;
    amount: BigNumber;
  }
>;
export declare type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;
export declare type DelegateChangedEvent = TypedEvent<
  [string, string, string],
  {
    delegator: string;
    fromDelegate: string;
    toDelegate: string;
  }
>;
export declare type DelegateChangedEventFilter = TypedEventFilter<DelegateChangedEvent>;
export declare type DelegateVotesChangedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  {
    delegate: string;
    previousBalance: BigNumber;
    newBalance: BigNumber;
  }
>;
export declare type DelegateVotesChangedEventFilter = TypedEventFilter<DelegateVotesChangedEvent>;
export declare type MinterChangedEvent = TypedEvent<
  [string, string],
  {
    minter: string;
    newMinter: string;
  }
>;
export declare type MinterChangedEventFilter = TypedEventFilter<MinterChangedEvent>;
export declare type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  {
    from: string;
    to: string;
    amount: BigNumber;
  }
>;
export declare type TransferEventFilter = TypedEventFilter<TransferEvent>;
export interface UNI extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;
  interface: UNIInterface;
  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;
  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;
  functions: {
    DELEGATION_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;
    DOMAIN_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;
    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<[string]>;
    allowance(account: string, spender: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    approve(
      spender: string,
      rawAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    checkpoints(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [number, BigNumber] & {
        fromBlock: number;
        votes: BigNumber;
      }
    >;
    decimals(overrides?: CallOverrides): Promise<[number]>;
    delegate(
      delegatee: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    delegateBySig(
      delegatee: string,
      nonce: BigNumberish,
      expiry: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    delegates(arg0: string, overrides?: CallOverrides): Promise<[string]>;
    getCurrentVotes(account: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    getPriorVotes(account: string, blockNumber: BigNumberish, overrides?: CallOverrides): Promise<[BigNumber]>;
    minimumTimeBetweenMints(overrides?: CallOverrides): Promise<[number]>;
    mint(
      dst: string,
      rawAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    mintCap(overrides?: CallOverrides): Promise<[number]>;
    minter(overrides?: CallOverrides): Promise<[string]>;
    mintingAllowedAfter(overrides?: CallOverrides): Promise<[BigNumber]>;
    name(overrides?: CallOverrides): Promise<[string]>;
    nonces(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    numCheckpoints(arg0: string, overrides?: CallOverrides): Promise<[number]>;
    permit(
      owner: string,
      spender: string,
      rawAmount: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    setMinter(
      minter_: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    symbol(overrides?: CallOverrides): Promise<[string]>;
    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
    transfer(
      dst: string,
      rawAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
    transferFrom(
      src: string,
      dst: string,
      rawAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<ContractTransaction>;
  };
  DELEGATION_TYPEHASH(overrides?: CallOverrides): Promise<string>;
  DOMAIN_TYPEHASH(overrides?: CallOverrides): Promise<string>;
  PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<string>;
  allowance(account: string, spender: string, overrides?: CallOverrides): Promise<BigNumber>;
  approve(
    spender: string,
    rawAmount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
  checkpoints(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [number, BigNumber] & {
      fromBlock: number;
      votes: BigNumber;
    }
  >;
  decimals(overrides?: CallOverrides): Promise<number>;
  delegate(
    delegatee: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  delegateBySig(
    delegatee: string,
    nonce: BigNumberish,
    expiry: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  delegates(arg0: string, overrides?: CallOverrides): Promise<string>;
  getCurrentVotes(account: string, overrides?: CallOverrides): Promise<BigNumber>;
  getPriorVotes(account: string, blockNumber: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
  minimumTimeBetweenMints(overrides?: CallOverrides): Promise<number>;
  mint(
    dst: string,
    rawAmount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  mintCap(overrides?: CallOverrides): Promise<number>;
  minter(overrides?: CallOverrides): Promise<string>;
  mintingAllowedAfter(overrides?: CallOverrides): Promise<BigNumber>;
  name(overrides?: CallOverrides): Promise<string>;
  nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
  numCheckpoints(arg0: string, overrides?: CallOverrides): Promise<number>;
  permit(
    owner: string,
    spender: string,
    rawAmount: BigNumberish,
    deadline: BigNumberish,
    v: BigNumberish,
    r: BytesLike,
    s: BytesLike,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  setMinter(
    minter_: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  symbol(overrides?: CallOverrides): Promise<string>;
  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
  transfer(
    dst: string,
    rawAmount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  transferFrom(
    src: string,
    dst: string,
    rawAmount: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    }
  ): Promise<ContractTransaction>;
  callStatic: {
    DELEGATION_TYPEHASH(overrides?: CallOverrides): Promise<string>;
    DOMAIN_TYPEHASH(overrides?: CallOverrides): Promise<string>;
    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<string>;
    allowance(account: string, spender: string, overrides?: CallOverrides): Promise<BigNumber>;
    approve(spender: string, rawAmount: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    checkpoints(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [number, BigNumber] & {
        fromBlock: number;
        votes: BigNumber;
      }
    >;
    decimals(overrides?: CallOverrides): Promise<number>;
    delegate(delegatee: string, overrides?: CallOverrides): Promise<void>;
    delegateBySig(
      delegatee: string,
      nonce: BigNumberish,
      expiry: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
    delegates(arg0: string, overrides?: CallOverrides): Promise<string>;
    getCurrentVotes(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    getPriorVotes(account: string, blockNumber: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    minimumTimeBetweenMints(overrides?: CallOverrides): Promise<number>;
    mint(dst: string, rawAmount: BigNumberish, overrides?: CallOverrides): Promise<void>;
    mintCap(overrides?: CallOverrides): Promise<number>;
    minter(overrides?: CallOverrides): Promise<string>;
    mintingAllowedAfter(overrides?: CallOverrides): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<string>;
    nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    numCheckpoints(arg0: string, overrides?: CallOverrides): Promise<number>;
    permit(
      owner: string,
      spender: string,
      rawAmount: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
    setMinter(minter_: string, overrides?: CallOverrides): Promise<void>;
    symbol(overrides?: CallOverrides): Promise<string>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transfer(dst: string, rawAmount: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
    transferFrom(src: string, dst: string, rawAmount: BigNumberish, overrides?: CallOverrides): Promise<boolean>;
  };
  filters: {
    'Approval(address,address,uint256)'(
      owner?: string | null,
      spender?: string | null,
      amount?: null
    ): ApprovalEventFilter;
    Approval(owner?: string | null, spender?: string | null, amount?: null): ApprovalEventFilter;
    'DelegateChanged(address,address,address)'(
      delegator?: string | null,
      fromDelegate?: string | null,
      toDelegate?: string | null
    ): DelegateChangedEventFilter;
    DelegateChanged(
      delegator?: string | null,
      fromDelegate?: string | null,
      toDelegate?: string | null
    ): DelegateChangedEventFilter;
    'DelegateVotesChanged(address,uint256,uint256)'(
      delegate?: string | null,
      previousBalance?: null,
      newBalance?: null
    ): DelegateVotesChangedEventFilter;
    DelegateVotesChanged(
      delegate?: string | null,
      previousBalance?: null,
      newBalance?: null
    ): DelegateVotesChangedEventFilter;
    'MinterChanged(address,address)'(minter?: null, newMinter?: null): MinterChangedEventFilter;
    MinterChanged(minter?: null, newMinter?: null): MinterChangedEventFilter;
    'Transfer(address,address,uint256)'(from?: string | null, to?: string | null, amount?: null): TransferEventFilter;
    Transfer(from?: string | null, to?: string | null, amount?: null): TransferEventFilter;
  };
  estimateGas: {
    DELEGATION_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;
    DOMAIN_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;
    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<BigNumber>;
    allowance(account: string, spender: string, overrides?: CallOverrides): Promise<BigNumber>;
    approve(
      spender: string,
      rawAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    checkpoints(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    decimals(overrides?: CallOverrides): Promise<BigNumber>;
    delegate(
      delegatee: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    delegateBySig(
      delegatee: string,
      nonce: BigNumberish,
      expiry: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    delegates(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    getCurrentVotes(account: string, overrides?: CallOverrides): Promise<BigNumber>;
    getPriorVotes(account: string, blockNumber: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;
    minimumTimeBetweenMints(overrides?: CallOverrides): Promise<BigNumber>;
    mint(
      dst: string,
      rawAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    mintCap(overrides?: CallOverrides): Promise<BigNumber>;
    minter(overrides?: CallOverrides): Promise<BigNumber>;
    mintingAllowedAfter(overrides?: CallOverrides): Promise<BigNumber>;
    name(overrides?: CallOverrides): Promise<BigNumber>;
    nonces(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    numCheckpoints(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    permit(
      owner: string,
      spender: string,
      rawAmount: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    setMinter(
      minter_: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    symbol(overrides?: CallOverrides): Promise<BigNumber>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transfer(
      dst: string,
      rawAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
    transferFrom(
      src: string,
      dst: string,
      rawAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<BigNumber>;
  };
  populateTransaction: {
    DELEGATION_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    DOMAIN_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    PERMIT_TYPEHASH(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    allowance(account: string, spender: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    approve(
      spender: string,
      rawAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    balanceOf(account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    checkpoints(arg0: string, arg1: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    delegate(
      delegatee: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    delegateBySig(
      delegatee: string,
      nonce: BigNumberish,
      expiry: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    delegates(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getCurrentVotes(account: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    getPriorVotes(account: string, blockNumber: BigNumberish, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    minimumTimeBetweenMints(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    mint(
      dst: string,
      rawAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    mintCap(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    minter(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    mintingAllowedAfter(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    nonces(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    numCheckpoints(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    permit(
      owner: string,
      spender: string,
      rawAmount: BigNumberish,
      deadline: BigNumberish,
      v: BigNumberish,
      r: BytesLike,
      s: BytesLike,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    setMinter(
      minter_: string,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
    transfer(
      dst: string,
      rawAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
    transferFrom(
      src: string,
      dst: string,
      rawAmount: BigNumberish,
      overrides?: Overrides & {
        from?: string | Promise<string>;
      }
    ): Promise<PopulatedTransaction>;
  };
}
