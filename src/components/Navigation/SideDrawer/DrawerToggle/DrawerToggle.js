import React from "react";
import classes from "./DrawerToggle.module.css";

const drawerToggle =(props)=>(
    // <div onClick={props.clicked}>MENU</div>
    <div className={classes.DrawerToggle}
      onClick={props.clicked}>
          <div></div>
          <div></div>
          <div></div>
      </div>

);

export default drawerToggle;