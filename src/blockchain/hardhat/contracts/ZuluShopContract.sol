// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

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

  function transfer(
    uint256 id_Ecomerce,
    string memory refer,
    uint256 amount_token,
    uint256 amount_fiat
  ) 
  public {
    sale = Sale(id_Ecomerce, msg.sender, refer, amount_token, amount_fiat);
    emit newSale(id_Ecomerce, msg.sender, refer, amount_token, amount_fiat);

    uint256 amountToken = amount_token * (10 ** _decimals);
    
    bool estado = _token.balanceOf(msg.sender) < amountToken;

    if(estado){
      emit stateTransaction(id_Ecomerce, refer, estado);
      require(estado, "Monto insuficiente"); 
    }

    try _token.transferFrom(msg.sender, address(this), amountToken) returns (bool _estado) {
      estado = _estado;
    } catch {
      estado = false;
    }
    
    emit stateTransaction(id_Ecomerce, refer, estado);
    require(estado, "La transacion no se logro realizar"); 
  }

  function withDraw() public {
    uint256 amountTotal = _token.balanceOf(address(this));
    _token.transfer(owner(), amountTotal);
  }

}
