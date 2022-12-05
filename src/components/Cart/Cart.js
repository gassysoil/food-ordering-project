import React from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";

export default function Cart(props) {
  const cartItems = (
    <ul className={classes.cartitems}>
      {[{ id: "c1", name: "sushi", amount: 2, price: 12.99 }].map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );
  return (
    <Modal onClickClose={props.onClickClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>35.62</span>
      </div>
      <div className={classes.actions}>
        <button className={classes.buttonalt} onClick={props.onClickClose}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
}