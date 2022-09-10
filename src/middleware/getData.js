import axios from 'axios';

export function getData() {
  const url = 'https://fakestoreapi.com/products';

  const getAllItems = async () => {
    const response = await axios.get(url) 
    return  response.data
  }

  return {
    getAllItems
  }
}