import { Fragment } from "react";
import classes from "./Header.module.css";
import mealImage from "../../assets/meals.jpeg";
import HeaderCartButton from "./HeaderCartButton";

export default function Headers(props) {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClickCart={props.onClickCart}>
          Cart
        </HeaderCartButton>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImage} alt="A table full of delicious food!"></img>
      </div>
    </Fragment>
  );
}
