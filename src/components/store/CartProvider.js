import React, { useReducer } from "react";
import CartContext from "./CartContext";

function cartReducer(cartState, cartAction) {
  if (cartAction.type === "ADD_ITEM") {
    //this is the item from cartActionDispatch({ type: "ADD_ITEM", item: item })
    //we assume item has price and amount attribute
    const updatedItems = cartState.items.concat(cartAction.item);
    const updatedTotalAmount =
      cartState.totalAmount + cartAction.item.price * cartAction.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return;
}

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

export default function CartProvider(props) {
  // prettier-ignore
  const [cartState, cartActionDispatch] = useReducer(cartReducer, defaultCartState);

  function addItemToCartHandler(item) {
    cartActionDispatch({ type: "ADD_ITEM", item: item });
  }

  function removeItemFromCartHandler(id) {
    cartActionDispatch({ type: "REMOVE_ITEM", id: id });
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}
