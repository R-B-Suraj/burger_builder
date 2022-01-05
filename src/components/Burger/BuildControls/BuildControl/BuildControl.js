import React from "react";
import classes from './BuildControl.module.css';

const buildControl = (props)=>(
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        
        <button 
        className={classes.Less}
        onClick={props.removed}
        disabled={props.disabled}>Less</button>
        {/* onClick and disabled attributes are built in */}
   

        <button 
        className={classes.More}
        onClick={props.added}
        >More</button>
        {/* More button is not disabled anytime */}
    </div>
);

export default buildControl;