// we need a toggle button and sideDrawer.. menu button
// we'll need a backdrop for the side drawer



import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "../SideDrawer/SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxi/Auxi";
const sideDrawer  =(props)=>{
    //... conditionally attach open or close classes

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <Aux>
            <Backdrop 
            show={props.open}
            clicked={props.closed}
            />
{/* we don't have to write show=true because it is a boolean
value and if this property is present then it is true 
if not it is false  */}
        
        <div className={attachedClasses.join(' ')}>
            {/* <Logo height="11%"/> */}
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems /> 
            </nav>
        </div>

        </Aux>
    );
}

export default sideDrawer;