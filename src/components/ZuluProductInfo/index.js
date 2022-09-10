import React from 'react'
import './ZuluProductInfo.scss'

import zuluUSDDevcontractAbi from '../../blockchain/hardhat/contracts/abis/ZuluUSDAbi.json'
import zuluShopContractAbi from '../../blockchain/hardhat/contracts/abis/ZuluShopAbi.json'
import { ZuluLoading } from '../ZuluLoading'
import { ethers } from 'ethers'

export function ZuluProductInfo ({ selectedProduct, paid, setLoading, setOpenModal }) {
  const onCancel = () => {
    setOpenModal(false)
  }

  const buyProduct = async () => {
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
    await web3Provider.send('eth_requestAccounts', [])

    const web3Signer = web3Provider.getSigner()
    const zuluUSDDevContract = new ethers.Contract(
      '0xA7D6299F875e50Ab45F4EBB1922Ae3De03718A3c',
      zuluUSDDevcontractAbi,
      web3Signer
    )

    const response = await zuluUSDDevContract.approve('0x79D45765B2a5C1f833038C6b2e615C7f98Ab9612', paid.amountToken)
    setOpenModal(false)
    setLoading(true)
    web3Provider
      .waitForTransaction(response.hash)
      .then(async (response) => {
        const zuluShopContract = new ethers.Contract(
          '0x79D45765B2a5C1f833038C6b2e615C7f98Ab9612',
          zuluShopContractAbi,
          web3Signer
        )

        const secondResponse = await zuluShopContract.transfer(
          paid.id,
          paid.refer,
          paid.amountToken,
          paid.amountFiat,
          { gasLimit: 250000 }
        )

        web3Provider
          .waitForTransaction(secondResponse.hash)
          .then(async (response) => {
            console.log(response)
            alert('Successful transaction')
            setLoading(false)
          })
          .catch((error) => {
            setLoading(false)
            alert('Failed transaction')
          })
      })
      .catch((error) => {
        setLoading(false)
        alert('Failed transaction')
      })
  }

  return (
    <>
      <div className='container card'>
        <img src={selectedProduct.image} alt='default' />
        <p>{selectedProduct.title}</p>
        <p>COP {paid.amountFiat}</p>
        <button type='button' onClick={buyProduct}>
          Buy
        </button>
        <button type='button' onClick={onCancel}>
          Back
        </button>
      </div>
    </>
  )
}
