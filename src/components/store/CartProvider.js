import React, { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

function cartReducer(cartState, cartAction) {
  let updatedItems;

  if (cartAction.type === "ADD_ITEM") {
    //Find index of an item just added to the cart via item itself
    //this is the item from cartActionDispatch({ type: "ADD_ITEM", item: item })
    //we assume item has price and amount attribute
    const existingCartItemIndex = cartState.items.findIndex(
      (item) => item.id === cartAction.item.id
    );
    const existingCartItem = cartState.items[existingCartItemIndex];

    const updatedTotalAmount =
      cartState.totalAmount + cartAction.item.price * cartAction.item.amount;

    //if this item already exists in the cart, update count
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + cartAction.item.amount,
      };
      updatedItems = [...cartState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // append it as new item to the list
      updatedItems = cartState.items.concat(cartAction.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (cartAction.type === "REMOVE_ITEM") {
    //Find index of an item just needs removing via id
    //this is the id from cartActionDispatch({ type: "REMOVE_ITEM", id: id })
    const existingCartItemIndex = cartState.items.findIndex(
      (item) => item.id === cartAction.id
    );
    const existingCartItem = cartState.items[existingCartItemIndex];

    const updatedTotalAmount = cartState.totalAmount - existingCartItem.price;

    if (existingCartItem.amount === 1) {
      updatedItems = cartState.items.filter(
        (item) => item.id !== cartAction.id
      );
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...cartState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
}

export default function CartProvider(props) {
  // prettier-ignore
  const [cartState, cartActionDispatch] = useReducer(cartReducer, defaultCartState);

  function addItemToCartHandler(item) {
    cartActionDispatch({ type: "ADD_ITEM", item: item });
  }

  function removeItemFromCartHandler(id) {
    cartActionDispatch({ type: "REMOVE_ITEM", id: id });
  }

  const cartCtx = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartCtx}>
      {/* This allows us to wrap any components that should get access 
      to this context with this cart provider component. */}
      {props.children}
    </CartContext.Provider>
  );
}
