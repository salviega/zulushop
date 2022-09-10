import React from 'react';
import './ZuluProductInfo.scss';

export function ZuluProductInfo(props) {
  const onCancel = () => {
    props.setOpenModal(false);
  };

  return (
    <div className='container card'>
      <img src={props.product.image} alt='default' />
      <p>{props.product.title}</p>
      <p>{props.product.price}</p>
      <button type='button' onClick={onCancel}>
        Regresar
      </button>
    </div>
  );
}
