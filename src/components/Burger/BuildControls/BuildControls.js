import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
// there are more than one build control so it makes sense 
// to outsource that

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls =(props)=>(
    <div className={classes.BuildControls}>
        {/* to show burger price */}
        <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>
        {/* toFixed(2) means upto 2 decimals */}
        {controls.map(ctrl=>(
            <BuildControl 
            key={ctrl.label} 
            label={ctrl.label} 
            added={()=>props.ingredientAdded(ctrl.type)}
            removed={()=>props.ingredientRemoved(ctrl.type)}
            disabled = {props.disabled[ctrl.type]}/>
        ))}
        {/* we also need to track which type of ingredient 
        we can pass it to buildControl using a type property
        but here we have access to the type variable for each BuildControl
        so we can pass it to the function. ie we are returning 
        the handler function with an argument added, which we'll call inside buildCOntrol*/}
   
    <button className={classes.OrderButton}
    disabled={!props.purchasable}
    onClick={props.ordered}
    >ORDER NOW</button>
    {/* we have to have the logic for this button to get disable
    if nothing is added with the burger then it shgould be 
    disabled */}
   
    </div>
);


export default buildControls;