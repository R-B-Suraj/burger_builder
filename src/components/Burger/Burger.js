// import React from 'react';
// import classes from './Burger.module.css';
// // burger is just a wrapper aroung all the ingredient


// import BurgerIngredient from './BurgerINgredient/BurgerIngredient';

// const burger = (props)=>{
//     // in the end this is just a way to transform an object of key-value pairs.. from BuggerBuilder
//     // to an array of burger ingredients where the value of that object
//     // is important to how many ingredients we need
//     // key is important for which type of ingredient we need 
//     const transformedIngredients = Object.keys(props.ingredients)
//             .map(ingreKey => {
//                 return [...Array(props.ingredients[ingreKey])].map((_,i)=>{
//                     return <BurgerIngredient key = {ingreKey+i} type={ingreKey} />
//             });
//             });
//     // if there is not ingredient added we want to display message "add some ingredient"...
//     // Object.keys(object) returns array of all attribute names... ie. meat,cheese,salad etc...
//     // on this array we are calling map function... and for each of these field names(ie. ingredient types) we make 
//     // ingredients of the same number as that is stored inside the props.ingredients[ingreKey]
//     // Array(props.ingredients[ingreKey]) returns array of empty arrays which we spread using '...' operator
//     // then for each of these empty arrays we make an ingredient of type ingreKey..
    
    
    
    
    
//     return (
//         <div className={classes.Burger}>
//             <BurgerIngredient type="bread-top" />
//             {transformedIngredients}
//             <BurgerIngredient type="bread-bottom" />
            
//         </div>
//     );

// };

// export default burger;






















//...........  calculating ingredient sum dynamically..........
import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerINgredient/BurgerIngredient';
import {withRouter} from 'react-router-dom';
// this is a higher order component which injects the router properties 
// to any component which it wraps
// here match will refer to the nearest route which was matched in the past


const burger = (props)=>{
    console.log("inside Burger", props);
    // here we don't have access route properties here, even though Burger
    // comes under the routable area of the app...
    // because Burger is not rendered using <Route> 
    // BurgerBuilder is ... so route props are available there
    
    let transformedIngredients = Object.keys(props.ingredients)
            .map(ingreKey => {
                return [...Array(props.ingredients[ingreKey])].map((_,i)=>{
                    return <BurgerIngredient key = {ingreKey+i} type={ingreKey} />
                });
            })
            .reduce((arr, el)=>{
                return arr.concat(el);
            },[]);
    console.log(transformedIngredients);
    if(transformedIngredients.length === 0)
     transformedIngredients = <p>Please start adding ingredients!</p>

// inintial value of this reduced array is [](initial value of reduced value)  we have to return something
// it will loop through all elements and simply add them to the initial value step by step
// we want to return updated value starting with initial one 
// arr always updated  
// el is current element for which we are looping is added to empty array
// so this gives us total number of ingredients 
// we flatened the array transformedIngredients
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
            
        </div>
    );

};

export default withRouter(burger);