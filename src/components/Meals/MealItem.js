import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../store/CartContext";
import { useContext } from "react";

export default function MealItem(props) {
  const cartContext = useContext(CartContext);

  const price = `$${props.meal.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartContext.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={classes.desciption}>{props.meal.desciption}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler}></MealItemForm>
      </div>
    </li>
  );
}
