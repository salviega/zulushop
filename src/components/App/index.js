import './App.scss'
import React from 'react'
import { ethers } from 'ethers'
import { useDispatch } from 'react-redux'
import { ZuluHeader } from '../ZuluHeader'
import { ZuluWallet } from '../ZuluWallet'
import { ZuluError } from '../ZuluError'
import { ZuluLoading } from '../ZuluLoading'
import { ZuluProducts } from '../ZuluProducts'
import { ZuluProduct } from '../ZuluProduct'
import { ZuluModal } from '../ZuluModal'
import { ZuluProductInfo } from '../ZuluProductInfo'
import { authLoguotAction } from '../../store/actions/authAction'
import { ZuluContext } from '../ZuluContext/index'

function App () {
  const {
    products,
    range,
    loading,
    error, 
    dispatch: zuluDispatch
  } = React.useContext(ZuluContext)

  const [selectedProduct, setSelectedProduct] = React.useState({})
  const [paid, setPaid] = React.useState({})
  const [openModal, setOpenModal] = React.useState(false)
  const [disable, setDisable] = React.useState(true)
  const dispatch = useDispatch()

  React.useEffect(() => {
    const currentNetwork = async () => {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum)
      const web3Signer = web3Provider.getSigner()
      const chainId = await web3Signer.getChainId()
      return chainId
    }
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        currentNetwork().then((response) => {
          if (response !== 5) {
            dispatch(authLoguotAction())
          }
        })
      })
      window.ethereum.on('accountsChanged', () => {
        dispatch(authLoguotAction())
      })
    }
  }, [])

  return (
    <>
      <ZuluHeader>
        <ZuluWallet setDisable={setDisable} />
      </ZuluHeader>
      <main>
        {error && <ZuluError />}
        {loading
          ? <ZuluLoading />
          : <ZuluProducts>
            {products?.map((product, index) => (
              <ZuluProduct
                key={index}
                product={product}
                range={range}
                setSelectedProduct={setSelectedProduct}
                setPaid={setPaid}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            ))}
            </ZuluProducts>}
      </main>
      {openModal && (
        <ZuluModal>
          <ZuluProductInfo selectedProduct={selectedProduct} paid={paid} loading={loading} setOpenModal={setOpenModal} zuluDispatch={zuluDispatch} />
        </ZuluModal>
      )}
    </>
  )
}

export default App
