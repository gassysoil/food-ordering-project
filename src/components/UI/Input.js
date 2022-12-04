import React from "react";
import classes from "./Input.module.css";

export default function Input(props) {
  return (
    <div className={classes.input}>
      {/* When used together with the <label> element, 
      the for attribute specifies which form element a label is bound to. */}
      <label htmlFor={props.input.id}>{props.label}</label>
      <input id={props.input.id} {...props.input}></input>
    </div>
  );
}
