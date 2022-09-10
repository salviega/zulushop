// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ZuluShopContract is Ownable {

    IERC20 private _token;
    uint8 private _decimals;
    Sale private sale;

    struct Sale {
      uint256 id_Ecomerce;
      address customer;
      string refer;
      uint256 amount_token;
      uint256 amount_fiat;
    }

    event newSale(
      uint256 id_Ecomerce,
      address customer,
      string refer,
      uint256 amount_token,
      uint256 amount_fiat
    );

    event stateTransaction(
      uint256 id_Ecomerce,
      string refer,
      bool accepct
    );

    constructor(address addressUSD, uint8 decimals) {
      _token = IERC20(addressUSD);
      _decimals = decimals;
    }

 
  function viewBalance() public  view  returns(uint256)  {
     uint256 balance = _token.balanceOf(msg.sender);
     return balance;
  }

  function transfer(uint256 _tokenAmount) public {
    _token.transferFrom(msg.sender, address(this), _tokenAmount);
  }

  function withDraw() public {
    uint256 amountTotal = _token.balanceOf(address(this));
    _token.transfer(owner(), amountTotal);
  }

}
