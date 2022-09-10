import "./App.scss";
import React from "react";
import { ethers } from "ethers";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../middleware/getData";
import { ZuluHeader } from "../ZuluHeader";
import { ZuluWallet } from "../ZuluWallet";
import { ZuluError } from "../ZuluError";
import { ZuluLoading } from "../ZuluLoading";
import { ZuluProducts } from "../ZuluProducts";
import { ZuluProduct } from "../ZuluProduct";
import { ZuluModal } from "../ZuluModal";
import { ZuluProductInfo } from "../ZuluProductInfo";
import { authLoguotAction } from "../../store/actions/authAction";

function App() {
  const dispatch = useDispatch();
  const { getAllItems } = getData();
  const [products, setProducts] = React.useState(null);
  const [selectedProduct, setselectedProduct] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const fechData = async () => {
    try {
      setLoading(true);
      setProducts(await getAllItems());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  React.useEffect(() => {
    fechData();
    const currentNetwork = async () => {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      const web3Signer = web3Provider.getSigner();
      const chainId = await web3Signer.getChainId();
      return chainId;
    };
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        currentNetwork().then((response) => {
          if (response !== 4) {
            dispatch(authLoguotAction());
          }
        });
      });
      window.ethereum.on("accountsChanged", () => {
        dispatch(authLoguotAction());
      });
    }
  }, []);

  return (
    <React.Fragment>
      <main>
        {error && <ZuluError />}
        {loading && <ZuluLoading />}
        <ZuluHeader>
          <ZuluWallet />
        </ZuluHeader>
        <ZuluProducts>
          {products?.map((product, index) => (
            <ZuluProduct 
              key={index} 
              product={product} 
              index={index}
              openModal={openModal}
              setOpenModal={setOpenModal}
              selectedProduct={selectedProduct}
              setselectedProduct={setselectedProduct}/>
          ))}
        </ZuluProducts>
      </main>
      {!!openModal && (
        <ZuluModal>
          <ZuluProductInfo
            selectedProduct={selectedProduct}
            setselectedProduct={setselectedProduct}
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </ZuluModal>
      )}
    </React.Fragment>
  );
}

export default App;
