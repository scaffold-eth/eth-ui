pragma solidity >=0.8.0 <0.9.0;
//SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Example class - a mock class using delivering from ERC20
contract BasicERC20Contract is ERC20 {
    constructor(uint256 initialBalance) ERC20("Basic", "BSC")  {
        _mint(msg.sender, initialBalance);
    }
}
