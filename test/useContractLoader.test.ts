/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect, use } from 'chai';
import { BaseContract, Signer } from 'ethers';
import * as sinonChai from 'sinon-chai';
import { YourContract } from 'test-files/__mocks__';
import { setupMockYourContract } from 'test-files/__mocks__/setupMockContracts';
import externalContract from 'test-files/external_contracts';
import * as hardhadContractBasic1 from 'test-files/hardhat_contracts.basic1.json';

import { getHardhatSigner, hookTestHarness } from '~~/helpers/test-utils/harness';
import { harnessTestSetupHelper } from '~~/helpers/test-utils/harness/hardhatTestHelpers';
import { useContractLoader } from '~~/hooks';
import { TContractLoaderConfig, TContractFunctionInfo } from '~~/models';

use(sinonChai);
describe('useContractLoader', function () {
  describe('Given that YourContract is deployed', () => {
    let yourContract: YourContract | undefined;
    let yourContractPurposeInfo: TContractFunctionInfo;
    let contractSigner: Signer;

    before(async () => {
      // setup a contract
      const harness = await harnessTestSetupHelper();
      contractSigner = await getHardhatSigner(harness.mockProvider, 1);
      [yourContract, yourContractPurposeInfo] = await setupMockYourContract(contractSigner);
    });

    // let testStartBockNumber = 0;
    beforeEach(async () => {
      // testStartBockNumber = await currentTestBlockNumber();
      await yourContract?.setPurpose('no purpose');
    });

    describe('Given that hardhat_contracts.basic1.json is used in config', () => {
      const config: TContractLoaderConfig = { deployedContractsJson: hardhadContractBasic1 };
      it('when useContractLoader is loaded with config; then returns the yourContarct', async () => {
        const harness = await hookTestHarness((config: TContractLoaderConfig | undefined) => useContractLoader(config));
        harness.rerender(config);

        const expectedContract = harness.result.current['YourContract'] as YourContract;
        expect(expectedContract.address).equal(yourContract?.address);
        expect(expectedContract.purpose).instanceOf(Function);
        expect(expectedContract.setPurpose).instanceOf(Function);

        // the number of times the hook results are refreshed should be less than 2 per change (2*1) + 2 initalization
        expect(harness.result.all.length).be.lessThanOrEqual(4);
      });
    });

    describe('Given that hardhat_contracts.basic1.json and external_contracts.json is used in config', () => {
      const config: TContractLoaderConfig = {
        deployedContractsJson: hardhadContractBasic1,
        externalContracts: externalContract,
      };
      const mainnetDaiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
      const mainnetUniAddress = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';

      it('when useContractLoader is loaded with config; then returns the yourContarct', async () => {
        const harness = await hookTestHarness((config: TContractLoaderConfig | undefined) => useContractLoader(config));
        harness.rerender(config);

        const expectedContract = harness.result.current['YourContract'] as YourContract;
        expect(expectedContract.address).equal(yourContract?.address);
        expect(expectedContract.purpose).instanceOf(Function);
        expect(expectedContract.setPurpose).instanceOf(Function);
      });

      it('when useContractLoader is loaded with config and localhost chainId; then it does not returns the external DAI contract', async () => {
        const harness = await hookTestHarness((config: TContractLoaderConfig | undefined) => useContractLoader(config));
        harness.rerender(config);

        const expectedContract = harness.result.current['DAI'];
        expect(expectedContract?.address).not.exist;
      });

      it('when useContractLoader is loaded with config and mainnet chainId; then it returns the external DAI and UNI contract', async () => {
        // TODO API CHANGED NEEDS FIXING
        const harness = await hookTestHarness(
          (config: TContractLoaderConfig | undefined) => useContractLoader(config) // undefined, 1)
        );
        harness.rerender(config);

        // check the DAI contract
        const expectedDaiContract = harness.result.current['DAI'] as BaseContract & { balanceOf: Function };
        expect(expectedDaiContract.address).equal(mainnetDaiAddress);
        expect(expectedDaiContract.balanceOf).instanceOf(Function);

        // check the UNI contract
        const expectedUniContract = harness.result.current['UNI'] as BaseContract & {
          totalSupply: Function;
          transferFrom: Function;
        };
        expect(expectedUniContract.address).equal(mainnetUniAddress);
        expect(expectedUniContract.totalSupply).instanceOf(Function);
        expect(expectedUniContract.transferFrom).instanceOf(Function);
      });

      it.skip('when useContractLoader is loaded with config and mainnet chainId; then it does not returns YourContract', async () => {
        // TODO API CHANGED NEEDS FIXING
        const harness = await hookTestHarness((config: TContractLoaderConfig | undefined) => useContractLoader(config));
        harness.rerender(config);

        const expectedContract = harness.result.current['YourContract'];
        expect(expectedContract?.address).not.exist;
      });
    });
  });
});
