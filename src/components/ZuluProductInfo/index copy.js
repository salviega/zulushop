import React from 'react';
import './ZuluProductInfo.scss';

export function ZuluProductInfo({selectedProduct, setOpenModal}) {
  const onCancel = () => {
    setOpenModal(false);
  };

  const trm = 4200;
  const decimals = 18;
  const priceUsd = selectedProduct.price  trm;
  const priceUSdToken = priceUsd * 10 ** decimals

  console.log(selectedProduct.title)

  return (
    <div className='container card' id="modal">
      <img src={selectedProduct.image} alt='default' />
      <p>{selectedProduct.title}</p>
      <p>USDC {priceUSdToken}</p>
      <p><span>TRM:</span> {priceUSdToken}</p>
      <button type='button' onClick={onCancel}>
        BACK
      </button>
      <button type='button' class="button">
        BUY
      </button>
    </div>
  );
}
