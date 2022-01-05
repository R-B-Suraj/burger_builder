import React from "react";
import classes from './Spinner.module.css';
const spinner = ()=> (
    <div className={classes.Loader}>Loading...</div>
);

// to make css spinner take help of internet
// https://projects.lukehaas.me/css-loaders/
export default spinner;


