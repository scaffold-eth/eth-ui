import { BytesLike, ethers, Signer, Wallet } from 'ethers';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useDebounce } from 'use-debounce';

import { TEthersProvider } from '~~/models';

const isValidPk = (pk: BytesLike | undefined | null): boolean => {
  return pk?.length === 64 || pk?.length === 66;
};

export const saveBurnerKeyToStorage = (incomingPK: BytesLike): void => {
  if (isValidPk(incomingPK)) {
    const rawPK = incomingPK;
    window.history.pushState({}, '', '/');
    const currentPrivateKey = window.localStorage.getItem('metaPrivateKey');
    if (currentPrivateKey && currentPrivateKey !== rawPK) {
      window.localStorage.setItem(`metaPrivateKey_backup${Date.now()}`, currentPrivateKey);
      console.log('🔑 ...Saved Private Key');
    }
    window.localStorage.setItem('metaPrivateKey', rawPK.toString());
  }
};

export const loadBurnerKeyFromStorage = (): string | null => {
  const currentPrivateKey = window.localStorage.getItem('metaPrivateKey');
  return currentPrivateKey;
};

export interface IBurnerSigner {
  signer: Signer | undefined;
  account: string | undefined;
  saveToStorage: () => void;
  loadFromStorageOrCreate: () => void;
  createBurnerSigner: () => void;
}

/**
 * A hook that creates a buner address and returns a Signer
 * @param ethersProvider (TEthersProvider)
 * @returns (ethers.signer) :: signer of the wallet
 */
export const useBurnerSigner = (ethersProvider: TEthersProvider | undefined): IBurnerSigner => {
  const key = 'scaffold-eth-privateKey';
  const [privateKeyValue, setPrivateKey] = useState<BytesLike>();
  const walletRef = useRef<Wallet>();
  const creatingBurnerRef = useRef(false);
  const [signer] = useDebounce(walletRef.current, 100, { trailing: true });
  const [account] = useDebounce(walletRef.current?.address, 100, { trailing: true });

  const setValue = (value: any): void => {
    try {
      setPrivateKey(value);
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedKey = window.localStorage.getItem(key);
    if (!storedKey) {
      console.log('generating a new key');
      const newWallet = ethers.Wallet.createRandom();
      const newKey = newWallet.privateKey;
      setValue(newKey);
    } else {
      setValue(storedKey);
    }
  }, []);

  useEffect(() => {
    if (privateKeyValue && ethersProvider) {
      const wallet = new ethers.Wallet(privateKeyValue);
      const newSigner = wallet.connect(ethersProvider);
      walletRef.current = newSigner;
    }
  }, [privateKeyValue, ethersProvider]);

  /**
   * if valid save burner key to storage
   */
  const saveToStorage = useCallback(() => {
    console.log('🔑 Incoming Private Key...');
    if (privateKeyValue != null) {
      saveBurnerKeyToStorage(privateKeyValue);
    }
  }, [privateKeyValue]);

  /**
   * create a new burnerkey
   */
  const createBurnerSigner = useCallback(() => {
    if (ethersProvider && !creatingBurnerRef.current) {
      creatingBurnerRef.current = true;
      console.log('🔑 Create new burner wallet...');
      const wallet = Wallet.createRandom();
      setPrivateKey((_v) => {
        console.log('📝 ...Set key');
        creatingBurnerRef.current = false;
        return wallet.privateKey;
      });
    } else {
      console.log('⚠ Could not create burner wallet');
    }
  }, [ethersProvider]);

  /**
   * Load burner key from storage
   */
  const loadFromStorageOrCreate = useCallback(() => {
    if (setPrivateKey != null) {
      const pk = loadBurnerKeyFromStorage();
      if (pk && isValidPk(pk)) {
        console.log('🔑 ...Loaded Private Key');
        setPrivateKey(pk);
      } else {
        createBurnerSigner();
      }
    }
  }, [createBurnerSigner]);

  return { signer, account, saveToStorage, loadFromStorageOrCreate, createBurnerSigner };
};
