// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

//0xd9145CCE52D386f254917e481eB44e9943F39138
contract ZuluUSD is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("Zulu USD", "USDZ") {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
