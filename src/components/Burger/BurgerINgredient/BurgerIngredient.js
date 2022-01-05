// import React from 'react';
// import classes from './BurgerIngredient.module.css';

// // there are different ingredients... which ingredients to render
// // access via props... which we will pass through an attribute
// const burgerIngredient = (props)=>{
//     let ingredient = null;
//     switch (props.type){
//         case ('bread-bottom'):
//             ingredient = <div className={classes.BreadBottom}></div>
//             break;
//         case ('bread-top'):
//             ingredient = (
//                 <div className = {classes.BreadTop}>
//                     <div className={classes.Seeds1}></div>
//                     <div className={classes.Seeds2}></div>
//                     break;
//                 </div>
//             );
//             break;
//         case ('meat'):
//             ingredient = <div className={classes.Meat}></div>
//             break;
//         case ('cheese'):
//             ingredient = <div className={classes.Meat}></div>
//             break;
//         case ('bacon'):
//             ingredient = <div className={classes.Meat}></div>
//             break;
//         case ('salad'):
//             ingredient = <div className={classes.Meat}></div>
//             break;
//         default:
//             ingredient = null;
        
        
//     }
//     return ingredient;
//     // we will also add a prop type validation
//     // install prop-types package from react. which is used
//     // for prop types validation
// };


// export default burgerIngredient;

















//.................. props validation ....................
// we can't apply prps validation with functional components 
// so we have to make it a class..
// but that doesn't mean we are making it a container... it is still a dumb object because we don't manage
// state here...
import React, {Component} from 'react';
import classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component{
    
    
    render(){

    let ingredient = null;
    switch (this.props.type){
        case ('bread-bottom'):
            ingredient = <div className={classes.BreadBottom}></div>
            break;
        case ('bread-top'):
            ingredient = (
                <div className = {classes.BreadTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                   
                </div>
            );
            break;
        case ('meat'):
            ingredient = <div className={classes.Meat}></div>
            break;
        case ('cheese'):
            ingredient = <div className={classes.Cheese}></div>
            break;
        case ('bacon'):
            ingredient = <div className={classes.Bacon}></div>
            break;
        case ('salad'):
            ingredient = <div className={classes.Salad}></div>
            break;
        default:
            ingredient = null;
        
        }
        return ingredient;
       
    }
   

}

// property validation....
BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
    // configure the type property using the PropTypes we 
    // imported from prop-types package.
    // we made sure that we must pass type attribute whenever
    // we try to use ingredient and it should be a string
};

export default BurgerIngredient;

