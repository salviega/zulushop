import './ZuluWallet.scss'
import React from 'react'
import { ethers } from 'ethers'
import { useDispatch, useSelector } from 'react-redux'

import {
  authUnregistedAction,
  authUnverifiedAction,
  authVerifiedAction,
  authLoguotAction,
  authloginAction,
  authRegistedAction
} from '../../store/actions/authAction'

export function ZuluWallet() {
  const { wallet, isRegisted, isVerified } = useSelector(({ auth }) => auth)
  const [loading, setLoading] = React.useState(false)
  const dispatch = useDispatch()

  const connectWallet = async () => {
    if (!window.ethereum?.isMetaMask) {
      alert("Metamask wasn't detected, please install metamask extension")
      return
    }

    if (wallet === 'Connect your Wallet') {
      setLoading(true)
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
      await web3Provider.send('eth_requestAccounts', [])
      const accounts = await web3Provider.send('eth_requestAccounts', [])

      const walletAcount = accounts[0]
      dispatch(authloginAction(accounts[0]))

      const verification = true // await verifyInProofOfHumanity(walletAcount);
      if (!verification) {
        alert('Your wallet is not registed in Proof of Humanity')
        return
      }

      const web3Signer = web3Provider.getSigner()
      const chainId = await web3Signer.getChainId()
      if (chainId !== 5) {
        dispatch(authLoguotAction())
        alert("Change your network to Goerli's testnet!")
        setLoading(false)
        return
      }


      setLoading(false)
      dispatch(authVerifiedAction())
      dispatch(authRegistedAction())
    } else {
      dispatch(authLoguotAction())
      dispatch(authUnregistedAction())
      dispatch(authUnverifiedAction())
      setLoading(false)

      if (window.location.href.includes('mypensions') || window.location.href.includes('register')) {
        dispatch(authLoguotAction())
      } else {
        dispatch(authLoguotAction())
      }
    }
  }

  return (
    <button className='wallet' onClick={connectWallet}>
      {loading ? 'loading...' : isRegisted || isVerified ? '...' + String(wallet).slice(38) : 'Connect your Wallet'}
    </button>
  )
}
  