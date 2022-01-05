// import React from "react";

// const logo = (props)=>(
//     <div>
//         {/* <img src="../../assets/images/burger-logo.png" />
//         this won't work here because  in the end we don't have 
//         any assets folder in production 
//         it is modified and optimized , different folders 
//         are made
//         so we try to import image ... and this just makes webpack
//         that we have this file using which we are doing something
//         here*/}

          
//     </div>
// );

// export default logo;

















import React from "react";
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

// burgerLogo here simply stores the path of the image
// as a string which will referer to the where image is 
// which will be dynamically resolved in optimized code
const logo = (props)=>(
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>
);

export default logo;






