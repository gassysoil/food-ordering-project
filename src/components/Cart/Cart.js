import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../store/CartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

export default function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  function checkOutHandler() {
    setIsCheckout(true);
  }

  async function onConfirmCheckOutHandler(userData) {
    setSubmitting(true);

    await fetch(
      "https://food-ordering-project-5ff33-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
      }
    );

    setSubmitting(false);
    setSubmitted(true);
    cartCtx.clearCart();
  }

  const cartItems = (
    <ul className={classes.cartitems}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalAction = (
    <div className={classes.actions}>
      <button className={classes.buttonalt} onClick={props.onClickClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={checkOutHandler}>
          Check Out
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onConfirm={onConfirmCheckOutHandler}
          onCancel={props.onClickClose}
        />
      )}
      {!isCheckout && modalAction}
    </React.Fragment>
  );

  const submittingModalContent = <p>Sending order data...</p>;

  const submittedModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClickClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClickBackdrop={props.onClickClose}>
      {!submitting && !submitted && cartModalContent}
      {submitting && submittingModalContent}
      {!submitting && submitted && submittedModalContent}
    </Modal>
  );
}
