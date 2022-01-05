import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props)=>(
    props.show? <div 
    className={classes.Backdrop}
    onClick={props.clicked}
    ></div>: null
);
// where to add the backdrop...
// there are multiple places where we can put this...
// if the modal is shown then the backdrop should be shown...


export default backdrop;