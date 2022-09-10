import React from "react";
import "./ZuluProduct.scss";

export function ZuluProduct({product, setSelectedProduct, openModal, setOpenModal}) {
  const onClickButton = (product) => {
    setSelectedProduct(product);
    openModal ? setOpenModal(false) : setOpenModal(true);
  };

  return (
    <li className="container card">
      {product != null ? (
          <div className="card__container">
            <p>{product.title}</p>
            <img src={product.image} alt="product" />
            <p>${product.price}</p>
            <button onClick={() => onClickButton(product)} class="button">BUY</button>
        </div>
      ) : (
        "No hay productos"
      )}
    </li>
  );
}
