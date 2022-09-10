import React from 'react';
import './ZuluProducts.scss';

export function ZuluProducts(props) {
  return (
    <section>
      <ul className='cards'>{props.children}</ul>
    </section>
  );
}

