import React from 'react';
import './ZuluProducts.scss';

export function ZuluProducts(props) {
  return (
    <section>
      <ul className='products'>{props.children}</ul>
    </section>
  );
}

