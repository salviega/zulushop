import axios from 'axios';

export const getPaxFull = () => {
  const url = 'https://www.datos.gov.co/resource/32sa-8pi3.json'

  const getAllItems = async () => {
    const response = await axios.get('https://www.datos.gov.co/resource/32sa-8pi3.json')
    return response.data
  }

  return {
    getAllItems
  }

}