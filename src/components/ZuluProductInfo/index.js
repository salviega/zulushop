import React from 'react';
import './ZuluProductInfo.scss';

export function ZuluProductInfo({selectedProduct, setOpenModal}) {
  const onCancel = () => {
    setOpenModal(false);
  };

  console.log(selectedProduct.title)

  return (
    <div className='container card'>
      <img src={selectedProduct.image} alt='default' />
      <p>{selectedProduct.title}</p>
      <p>${selectedProduct.price}</p>
      <button type='button' onClick={onCancel}>
        Back
      </button>
      <button type='button'>
        Buy
      </button>
    </div>
  );
}
