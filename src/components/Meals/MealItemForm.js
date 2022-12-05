import React, { useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";

export default function MealItemForm(props) {
  const [enteredAmount, setEnteredAmount] = useState("1");

  function submitHandler(event) {
    event.preventDefault(); //make sure browser doesn't reload the page on default when submit
    props.onAddToCart(+enteredAmount);
  }

  const enteredAmountHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          // defaultValue: "1",
          value: enteredAmount,
          onChange: enteredAmountHandler,
        }}
      ></Input>
      <button>Add</button>
    </form>
  );
}
