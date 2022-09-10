import React from 'react';
import ReactDOM from 'react-dom';
import './ZuluModal.scss';

export function ZuluModal({ children }) {
  return ReactDOM.createPortal(<div className='ModalBackground'>{children}</div>, document.getElementById('modal'));
}
