import React from "react";
import classes from './NavigationItems.module.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = ()=>(
    
        // {/* <li><a href="/">A Link</a></li>
        // better to oursource the list element too
        // because we have uite styling to be done with li */}
    <ul className={classes.NavigationItems}>
        <NavigationItem 
        link="/"
        exact >Burger Builder</NavigationItem>
         {/* active={true}>Burger Builder</NavigationItem> 
         using navlink in routing now we don't have to set property
         active explicitly.. it's already taken care of */}

        <NavigationItem
        link="/orders"
         >Orders</NavigationItem>

    </ul>
);


export default navigationItems;