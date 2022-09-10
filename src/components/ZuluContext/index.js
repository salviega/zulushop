import React from 'react';
import { getData } from "../../middleware/getData";

export const ZuluContext = React.createContext({
  currentUser: null
})

export function ZuluProvider (props) {
  const { getAllItems } = getData();
  const [products, setProducts] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const fechData = async () => {
    try {
      setProducts(await getAllItems());
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  React.useEffect(() => {
    fechData()
  }, [])

  return (
    <ZuluContext.Provider
      value={{
        products,
        loading,
        error,
      }}
    >
      {props.children}
    </ZuluContext.Provider>
  )
}
