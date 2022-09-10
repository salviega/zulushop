import React from "react";
import "./ZuluProductInfo.scss";
import { ethers } from "ethers";

import zuluUSDDevcontractAbi from "../../blockchain/hardhat/artifacts/src/blockchain/hardhat/contracts/ZuluUSD.sol/ZuluUSD.json";
import jsonZuluUSDDevcontractAbAddress from "../../blockchain/environment/address2.json";
import zuluShopContractAbi from "../../blockchain/hardhat/artifacts/src/blockchain/hardhat/contracts/ZuluShopContract.sol/ZuluShopContract.json";
import jsonZuluShopContract from "../../blockchain/environment/address.json";
import { ZuluLoading } from "../ZuluLoading";

const zuluShopContractAddress = jsonZuluShopContract.zulushopcontract;
const zuluUSDDevcontractAddress =
  jsonZuluUSDDevcontractAbAddress.zuluUSDDevcontract;

export function ZuluProductInfo({ selectedProduct, paid, setOpenModal }) {
  const [loading, setLoading] = React.useState(false);

  const onCancel = () => {
    setOpenModal(false);
  };

  const buyProduct = async () => {
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
    await web3Provider.send("eth_requestAccounts", []);

    const web3Signer = web3Provider.getSigner();
    const zuluUSDDevContract = new ethers.Contract(
      zuluUSDDevcontractAddress,
      zuluUSDDevcontractAbi.abi,
      web3Signer
    );

    const response = await zuluUSDDevContract.approve(zuluShopContractAddress, paid.amountToken);
    setLoading(true);
    web3Provider
      .waitForTransaction(response.hash)
      .then(async (response) => {
        const zuluShopContract = new ethers.Contract(
          zuluShopContractAddress,
          zuluShopContractAbi.abi,
          web3Signer
        )
        console.log('contract :', zuluShopContract)
        const secondResponse = await zuluShopContract.transfer(
          paid.id,
          paid.refer,
          paid.amountToken,
          paid.amountFiat,
          { gasLimit: 250000 }
        );

        web3Provider
        .waitForTransaction(secondResponse.hash)
        .then(async (response) => {
          alert("Successful transaction");
          setLoading(false);
        })
        .catch((error) => {
          console.log('error :',  error)
          setLoading(false);
          alert("Failed transaction");
        });
      })
      .catch((error) => {
        console.log('error :',  error)
        setLoading(false);
        alert("Failed transaction");
      });
  };

  return (
    <>
      {loading ? (
        <ZuluLoading />
      ) : (
        <div className="container card">
          <img src={selectedProduct.image} alt="default" />
          <p>{selectedProduct.title}</p>
          <p>COP{paid.amountFiat}</p>
          <button type="button" onClick={onCancel}>
            Back
          </button>
          <button type="button" onClick={buyProduct}>
            Buy
          </button>
        </div>
      )}
    </>
  );
}
