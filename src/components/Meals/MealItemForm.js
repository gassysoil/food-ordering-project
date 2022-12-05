import React, { useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";

export default function MealItemForm(props) {
  //unlike chapter 144, I use useState instead of useRef
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
          value: enteredAmount,
          onChange: enteredAmountHandler,
        }}
      ></Input>
      <button>+ Add</button>
    </form>
  );
}

// import { useRef, useState } from "react";

// import Input from "../UI/Input";
// import classes from "./MealItemForm.module.css";

// const MealItemForm = (props) => {
//   const [amountIsValid, setAmountIsValid] = useState(true);
//   const amountInputRef = useRef();

//   const submitHandler = (event) => {
//     event.preventDefault();

//     const enteredAmount = amountInputRef.current.value;
//     const enteredAmountNumber = +enteredAmount;

//     if (
//       enteredAmount.trim().length === 0 ||
//       enteredAmountNumber < 1 ||
//       enteredAmountNumber > 5
//     ) {
//       setAmountIsValid(false);
//       return;
//     }

//     props.onAddToCart(enteredAmountNumber);
//   };

//   return (
//     <form className={classes.form} onSubmit={submitHandler}>
//       <Input
//         ref={amountInputRef}
//         label="Amount"
//         input={{
//           id: "amount_" + props.id,
//           type: "number",
//           min: "1",
//           max: "5",
//           step: "1",
//           defaultValue: "1",
//         }}
//       />
//       <button>+ Add</button>
//       {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
//     </form>
//   );
// };

// export default MealItemForm;
