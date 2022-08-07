import { BytesLike, ethers, Signer, Wallet } from 'ethers';
import { useState, useEffect, useCallback, useRef } from 'react';
import { useDebounce } from 'use-debounce';

import { TEthersProvider } from '~~/models';

const storageKey = 'scaffold-eth-burner-privateKey';

/**
 * Is the private key valid
 * @internal
 * @param pk
 * @returns
 */
const isValidPk = (pk: BytesLike | undefined | null): boolean => {
  return pk?.length === 64 || pk?.length === 66;
};

/**
 * Save the current burner private key to storage
 * @internal
 * @param incomingPK
 */
const saveBurnerKeyToStorage = (incomingPK: BytesLike): void => {
  if (isValidPk(incomingPK)) {
    const rawPK = incomingPK;
    window.history.pushState({}, '', '/');
    const currentPrivateKey = window.localStorage.getItem(storageKey);
    if (currentPrivateKey && currentPrivateKey !== rawPK) {
      window.localStorage.setItem(`${storageKey}_backup${Date.now()}`, currentPrivateKey);
      console.log('🔑 ...Saved Private Key');
    }
    window.localStorage.setItem(`${storageKey}`, rawPK.toString());
  }
};

/**
 * Gets the current burner private key from storage
 * @internal
 * @returns
 */
const loadBurnerKeyFromStorage = (): string | null => {
  const currentPrivateKey = window.localStorage.getItem(storageKey);
  return currentPrivateKey;
};

/**
 * #### Summary
 * Return type of useBurnerSigner:
 *
 * ##### ✏️ Notes
 * - provides signer
 * - methods of interacting with burner signer
 * - methods to save and loadd signer from local storage
 *
 * @category Hooks
 */
export type TBurnerSigner = {
  signer: Signer | undefined;
  account: string | undefined;
  /**
   * save to local storage
   */
  saveBurner: () => void;
  /**
   * load from local storage, or if it doesn't exist, create
   */
  loadOrGenerateBurner: () => void;
  /**
   * create a new burner signer
   */
  generateBurnerSigner: () => void;
  /**
   * get your current burner pk
   */
  getBurnerPrivateKey: () => BytesLike | undefined;
};

/**
 * #### Summary
 * A hook that creates a burner signer/address and provides ways of interacting with
 * and updating the signer
 *
 * @category Hooks
 *
 * @param localProvider localhost provider
 * @returns IBurnerSigner
 */
export const useBurnerSigner = (localProvider: TEthersProvider | undefined): TBurnerSigner => {
  const [privateKeyValue, setPrivateKey] = useState<BytesLike>();
  const walletRef = useRef<Wallet>();
  const creatingBurnerRef = useRef(false);
  const [signer] = useDebounce(walletRef.current, 200, {
    trailing: true,
    equalityFn: (a, b) => a?.address === b?.address && a != null && b != null,
  });
  const account = walletRef.current?.address;

  const setValue = (value: string): void => {
    try {
      setPrivateKey(value);
      window.localStorage.setItem(storageKey, value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const storedKey = window.localStorage.getItem(storageKey);
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
    if (privateKeyValue && localProvider) {
      const wallet = new ethers.Wallet(privateKeyValue);
      const newSigner = wallet.connect(localProvider);
      walletRef.current = newSigner;
    }
  }, [privateKeyValue, localProvider]);

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
  const generateBurnerSigner = useCallback(() => {
    if (localProvider && !creatingBurnerRef.current) {
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
  }, [localProvider]);

  /**
   * Load burner key from storage
   */
  const loadOrGenerateBurner = useCallback(() => {
    if (setPrivateKey != null) {
      const pk = loadBurnerKeyFromStorage();
      if (pk && isValidPk(pk)) {
        console.log('🔑 ...Loaded Private Key');
        setPrivateKey(pk);
      } else {
        generateBurnerSigner();
      }
    }
  }, [generateBurnerSigner]);

  const getBurnerPrivateKey = (): BytesLike | undefined => {
    return privateKeyValue;
  };

  return {
    signer,
    account,
    saveBurner: saveToStorage,
    loadOrGenerateBurner,
    generateBurnerSigner,
    getBurnerPrivateKey,
  };
};
