import { BytesLike, ethers, Signer } from 'ethers';
import { useState, useEffect, useCallback } from 'react';

import { TEthersProvider } from '~~/models/providerTypes';

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

export interface IBurnerSignerManager {
  signer: Signer | undefined;
  saveToStorage: () => void;
  loadFromStorage: () => void;
}

/**
 * A hook that creates a buner address and returns a Signer
 * @param provider (TEthersProvider)
 * @returns (ethers.signer) :: signer of the wallet
 */
export const useBurnerSigner = (provider: TEthersProvider): IBurnerSignerManager => {
  const key = 'metaPrivateKey';
  const [signer, setSigner] = useState<Signer>();
  const [privateKeyValue, setPrivateKeyValue] = useState<BytesLike>();

  const setValue = (value: any): void => {
    try {
      setPrivateKeyValue(value);
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
    if (privateKeyValue && provider) {
      const wallet = new ethers.Wallet(privateKeyValue);
      const newSigner = wallet.connect(provider);
      setSigner(newSigner);
    }
  }, [privateKeyValue, provider]);

  /**
   * if valid save burner key to storage
   */
  const saveToStorage = useCallback(() => {
    console.log('🔑 Incoming Private Key...');
    if (privateKeyValue != null) {
      saveBurnerKeyToStorage(privateKeyValue);
    }
  }, [privateKeyValue]);

  const loadFromStorage = useCallback(() => {
    const pk = loadBurnerKeyFromStorage();
    if (pk && isValidPk(pk)) {
      console.log('🔑 ...Loaded Private Key');
      setPrivateKeyValue(pk);
    }
  }, []);

  return { signer, saveToStorage, loadFromStorage };
};
