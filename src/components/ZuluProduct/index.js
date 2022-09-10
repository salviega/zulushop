import React from "react";
import "./ZuluProduct.scss";
import { v1 as uuid } from 'uuid';

export function ZuluProduct({product, setPaid, setSelectedProduct, openModal, setOpenModal}) {
  const paid = {
    id: 1,
    refer: uuid(),
    amountToken: Math.round(parseInt(product.price)),
    amountFiat: Math.round(parseInt(product.price) * 4000)
  }

  const onClickButton = (product) => {
    setSelectedProduct(product);
    setPaid({...paid})
    openModal ? setOpenModal(false) : setOpenModal(true);
  };

  return (
    <li className="container card">
      {product != null ? (
          <div className="card__container">
            <p>{product.title}</p>
            <img src={product.image} alt="product" />
            <p>COP {paid.amountFiat}</p>
            <button onClick={() => onClickButton(product)}>Information</button>
        </div>
      ) : (
        "No hay productos"
      )}
    </li>
  );
}
