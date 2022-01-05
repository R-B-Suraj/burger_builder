// import React from "react";
// import classes from './NavigationItem.module.css';

// const navigationItem = (props)=>(
//     <li className={classes.NavigationItem}
//     >
//         <a  href={props.link}
//             className= {props.active ? classes.active: null}>
//             {props.children}</a>
//     </li>

// );

// export default navigationItem; 















//................. routing................
// while using routing we don't have to .... we use navlink from router


import {NavLink} from 'react-router-dom';
import React from "react";
import classes from './NavigationItem.module.css';

const navigationItem = (props)=>(
    <li className={classes.NavigationItem}
    >
        {/* <NavLink  to={props.link}>{props.children}</NavLink> */}
    {/* in navlink we have a className .active for active links  
    which is the same name used for active link styling inside our 
    navigationitem css file... so our css will overwrite 
    navlink's  default active class 
    
    ????   this will not happen because active class attached by navlink
    during runtime is not same as our active class defined...
    becasue during runtime our active class is hashed into unique
    names ... even though we defined same classname it won't be same
    during runtime 

    we can set active classname in navlink ... which will be same as ours
    */}


<NavLink  to={props.link} exact = {props.exact}
          activeClassName={classes.active}>{props.children}</NavLink>

    {/* navlink to path is considered as prefix.. so we can have more
    than one active styles at a time...
    we can put exact here but this will make all routes exact..
    instead we pass it from navigationitems */}

    </li>

);

export default navigationItem; 