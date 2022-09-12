import React from 'react'
import { getData } from '../../middleware/getData'
import { getPaxFull } from '../../middleware/getPaxFull'
import { actionTypes } from './actionTypes'
import { initialState, reducer } from './reducer'

export const ZuluContext = React.createContext({
  currentUser: null
})

export function ZuluProvider (props) {
  const { getAllItems: getProducts } = getData()
  const { getAllItems: getAllPaxFull } = getPaxFull()
  
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const { products, range, loading, error} = state;

  // ACTION CREATORS
  const onError = (error) => dispatch({ type: actionTypes.error, payload: error})
  const onSuccess = (fetch) => {
    dispatch({ type: actionTypes.success, payload: fetch})
  }

  const fechData = async () => {
    try {
      const products = await getProducts() 
      const arrPaxFull = await getAllPaxFull()
      const range =  arrPaxFull[0].valor;
      onSuccess({ products, range })
    } catch (error) {
      onError(error)
    }
  }

  React.useEffect(() => {
    fechData()
  }, [])

  return (
    <ZuluContext.Provider
      value={{
        products,
        range,
        loading,
        error,
        dispatch
      }}
    >
      {props.children}
    </ZuluContext.Provider>
  )
}
