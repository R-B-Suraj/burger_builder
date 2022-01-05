import React from "react";
import classes from './Toolbar.module.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
// import { checkPropTypes } from "prop-types";

// we want toolbar in every page not only in burger builder page
// so we add it inside layout
const toolbar = (props)=>(
    <header className={classes.Toolbar}>
        {/* <div>MENU</div> */}
        {/* <Logo height="80%" /> 
        assigning height through a property is not  a bad 
        approach but still it will be better if we can
        wrap with div and those div will adjust the height */}

        <DrawerToggle 
        clicked = {props.drawerToggleClicked}/>

        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />

        </nav>
    </header>
    
);

  
export default toolbar;