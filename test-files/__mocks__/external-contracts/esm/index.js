import { Contract } from 'ethers';
import mainnetDAIAbi from '../../abis/mainnet/DAI.json';
import mainnetUNIAbi from '../../abis/mainnet/UNI.json';
export function getContract(address, abi, defaultSigner) {
    return new Contract(address, abi, defaultSigner);
}
export function getMainnetSdk(defaultSigner) {
    return {
        "DAI": getContract('0x6b175474e89094c44da98b954eedeac495271d0f', mainnetDAIAbi, defaultSigner),
        "UNI": getContract('0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', mainnetUNIAbi, defaultSigner),
    };
}
