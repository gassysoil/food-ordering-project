import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

export default function MealItem(props) {
  const price = `$${props.meal.price.toFixed(2)}`;

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={classes.desciption}>{props.meal.desciption}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm></MealItemForm>
      </div>
    </li>
  );
}
