// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//0x10B245E4880E3567d77345A3e2ecc36b9578d638
contract ZuluUSD is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("USD Zulu", "USDZ") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}