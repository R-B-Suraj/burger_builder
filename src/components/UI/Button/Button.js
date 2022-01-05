import React from "react";
import classes from './Button.module.css';

const button = (props)=>(
    // conditionally we add success or danger class
    <button
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
    disabled={props.disabled}
    >{props.children}</button>
)

export default button;