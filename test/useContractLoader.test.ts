/* eslint-disable @typescript-eslint/ban-types */

import { expect } from 'chai';
import { BaseContract, Signer } from 'ethers';
import {
  mockExternalContractsForUseContractLoader as mockExternalContractsForLoader,
  mockHardhatBasicJson,
} from 'test-files/__mocks__';
import { YourContract } from 'test-files/__mocks__/generated/contract-types';
import { setupMockYourContract } from 'test-files/__mocks__/setupMockContracts';

import { getHardhatSigner, hookTestWrapper } from '~~/helpers/test-utils/wrapper';
import { wrapperTestSetupHelper } from '~~/helpers/test-utils/wrapper/hardhatTestHelpers';
import { TContractLoaderConfig, useContractLoader } from '~~/hooks';
import { TContractFunctionInfo } from '~~/models';

import 'test/helpers/chai-imports';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const initalizeHook = async (config: TContractLoaderConfig) => {
  const wrapper = await hookTestWrapper((input: Parameters<typeof useContractLoader>) => useContractLoader(...input));
  wrapper.rerender([config, wrapper.mockProvider]);
  await wrapper.waitForValueToChange(() => wrapper.result.current);
  return wrapper;
};

describe('useContractLoader', function () {
  describe('Given that YourContract is deployed', () => {
    let yourContract: YourContract | undefined;
    let _yourContractPurposeInfo: TContractFunctionInfo;
    let contractSigner: Signer;

    before(async () => {
      // setup a contract
      const wrapper = await wrapperTestSetupHelper();
      contractSigner = await getHardhatSigner(wrapper.mockProvider, 1);
      [yourContract, _yourContractPurposeInfo] = await setupMockYourContract(contractSigner);
    });

    // let testStartBockNumber = 0;
    beforeEach(async () => {
      // testStartBockNumber = await currentTestBlockNumber();
      await yourContract?.setPurpose('no purpose');
    });

    describe('Given that hardhat_contracts.basic1.json is used in config', () => {
      const config: TContractLoaderConfig = { deployedContractsJson: mockHardhatBasicJson };
      it('when useContractLoader is loaded with config; then returns the yourContarct', async () => {
        const wrapper = await initalizeHook(config);

        const expectedContract = wrapper.result.current['YourContract'] as YourContract;
        expect(expectedContract.address).equal(yourContract?.address);
        expect(expectedContract.purpose).instanceOf(Function);
        expect(expectedContract.setPurpose).instanceOf(Function);

        // the number of times the hook results are refreshed should be less than 2 per change (2*1) + 2 initalization
        expect(wrapper.result.all.length).be.lessThanOrEqual(4);
      });
    });

    describe('Given that hardhat_contracts.basic1.json and external_contracts.json is used in config', () => {
      const config: TContractLoaderConfig = {
        deployedContractsJson: mockHardhatBasicJson,
        externalContracts: mockExternalContractsForLoader,
      };
      const mainnetDaiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
      const mainnetUniAddress = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';

      it('when useContractLoader is loaded with config; then returns the yourContarct', async () => {
        const wrapper = await initalizeHook(config);

        const expectedContract = wrapper.result.current['YourContract'] as YourContract;
        expect(expectedContract.address).equal(yourContract?.address);
        expect(expectedContract.purpose).instanceOf(Function);
        expect(expectedContract.setPurpose).instanceOf(Function);
      });

      it('when useContractLoader is loaded with config and external contract chainId; then it returns the external DAI and UNI contract', async () => {
        const wrapper = await initalizeHook(config);

        // check the DAI contract
        const expectedDaiContract = wrapper.result.current['DAI'] as BaseContract & { balanceOf: Function };
        expect(expectedDaiContract.address).equal(mainnetDaiAddress);
        expect(expectedDaiContract.balanceOf).instanceOf(Function);

        // check the UNI contract
        const expectedUniContract = wrapper.result.current['UNI'] as BaseContract & {
          totalSupply: Function;
          transferFrom: Function;
        };
        expect(expectedUniContract.address).equal(mainnetUniAddress);
        expect(expectedUniContract.totalSupply).instanceOf(Function);
        expect(expectedUniContract.transferFrom).instanceOf(Function);
      });
    });
  });
});
