import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../store/CartContext";
import { useContext } from "react";

export default function MealItem(props) {
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.desciption}>{props.desciption}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm
          id={props.id}
          onAddToCart={addToCartHandler}
        ></MealItemForm>
      </div>
    </li>
  );
}
