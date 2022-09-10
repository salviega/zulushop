import React from "react";
import "./ZuluProduct.scss";

export function ZuluProduct(props) {
  const onClickButton = (product) => {
    props.setselectedProduct(product);
    props.openModal ? props.setOpenModal(false) : props.setOpenModal(true);
  };

  return (
    <li className="container card">
      {props.product != null ? (
          <div className="card__container">
            {/* <PokemonStart pokemon={props.pokemon} items={props.items} addIteam={props.addIteam} getFavoritesPokemons={props.getFavoritesPokemons} /> */}
            <p>{props.product.title}</p>
            <img src={props.product.image} alt="product" />
            <p>${props.product.price}</p>
            <button onClick={() => onClickButton(props.product)}>Comprar</button>
        </div>
      ) : (
        "No hay productos"
      )}
    </li>
  );
}
