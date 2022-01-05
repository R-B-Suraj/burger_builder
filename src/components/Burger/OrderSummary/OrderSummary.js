// import React from "react";
// import Aux from '../../../hoc/Auxi';
// import Button from "../../UI/Button/Button";
// // the BurgerBuilder file is getting quite crowded so
// // we are outsourcing some of its code..

// const orderSummary = (props)=>{
//     const ingredientSummary = Object.keys(props.ingredients)
//     .map(igKey =>{
//         return <li>
//             <span style={{textTransform: 'capitalize'}}>
//                 {igKey}</span>: {props.ingredients[igKey]}
            
//             </li>;
//     });

//     return (
//         <Aux>
//             <h3>Your Order</h3>
//             <p>A delicious burger with the following ingredients:</p>
//             <ul>
//                 {ingredientSummary}
//             </ul>
//             <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
//             <p>Continue to CheckOut?</p>
//             {/* <button>CANCEL</button>
//             <button>CONTINUE</button>
// {/* even though we have html button still we might want to 
// keep a button component with separate style so that for every
// button we use further we don't have to style them again */}
//             <Button btnType="Danger"
//             clicked={props.purchaseCancel}
//             >CANCEL</Button>

//             <Button btnType="Success"
//             clicked={props.purchaseContinue}
//             >CONTINUE</Button>
//             {/* order summary is used inside the Burger Builder container
//             so we have to pass the function from there */}

//         </Aux>
//     );

// };


// export default orderSummary;



















//.......... adding lifecycle hooks...............
// we don't have to rerender order summary if modal is
// invisible.. so we must make it a class component
// to implement lifecycle hooks

import React, {Component} from "react";
import Aux from "../../../hoc/Auxi/Auxi";
import Button from '../../UI/Button/Button';


class OrderSummary extends Component{

// see component will update eventhough we are not
// showing the modal.. if modal doesn't update this also 
// won't update
    componentWillUpdate(){
        console.log('[OrderSummary] willUpdate');
    }


    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey =>{
                return <li>
                    <span style={{textTransform: 'capitalize'}}>
                        {igKey}</span>: {this.props.ingredients[igKey]}
                    
                    </li>;
            });
        
            return (
                <Aux>
                    <h3>Your Order</h3>
                    <p>A delicious burger with the following ingredients:</p>
                    <ul>
                        {ingredientSummary}
                    </ul>
                    <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                    <p>Continue to CheckOut?</p>
                   <Button btnType="Danger"
                    clicked={this.props.purchaseCancel}
                    >CANCEL</Button>
        
                    <Button btnType="Success"
                    clicked={this.props.purchaseContinue}
                    >CONTINUE</Button>
                    
                </Aux>
            );
    }
}


export default OrderSummary;