import React from 'react';
import { getData } from "../../middleware/getData";
import { getPaxFull } from '../../middleware/getPaxFull';

export const ZuluContext = React.createContext({
  currentUser: null
})

export function ZuluProvider (props) {
  const { getAllItems } = getData();
  const { getAllItems: getAllPaxFull} = getPaxFull();
  const [products, setProducts] = React.useState(null);
  const [range, setRange] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const fechData = async () => {
    try {
      setProducts(await getAllItems())
      setRange(await getAllPaxFull())
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
        range,
        loading,
        setLoading,
        error,
      }}
    >
      {props.children}
    </ZuluContext.Provider>
  )
}
