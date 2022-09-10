import React from "react";
import "./ZuluProduct.scss";
import { v1 as uuid } from 'uuid';

export function ZuluProduct({product, range, setPaid, setSelectedProduct, openModal, setOpenModal, disable}) {
  const paid = {
    id: 1,
    refer: uuid(),
    amountToken: Math.round(parseInt(product.price)),
    amountFiat: Math.round((parseInt(product.price) * parseInt(range)) + 1.02)
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
            <p>{String(product.title)}</p>
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
