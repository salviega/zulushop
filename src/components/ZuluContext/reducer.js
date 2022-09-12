export const initialState = {
  product: null,
  range: null,
  loading: true,
  error: false
}

export function reducer(state, action) {
  switch(action.type) {
    case 'COMPLETE':
      return {
        ...state,
        loading: false
      }
    case 'ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case 'LOAD':
      return {
        ...state,
        loading: true
      }
    case 'SUCCESS':
      return {
        error: false,
        loading: false,
        ...action.payload
      }
    default:
      return state
  }
}