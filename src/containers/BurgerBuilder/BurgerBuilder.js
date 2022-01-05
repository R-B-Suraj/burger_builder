// stateful components extends Component 

// import React, {Component} from 'react';
// import Aux from '../../hoc/Auxi';
// import Burger from '../../components/Burger/Burger';

// class BurgerBuilder extends Component {
//     render(){
//         return (
//             <Aux>
//                 {/* <div> Burger graphic</div> */}
//                 <Burger />

//                 <div> Build Controls</div>
//             </Aux>
//         );
//     }
// }


// export default BurgerBuilder;






















//......................outputting dynamically..............
// Burger builder is a stateful component.. we can use state to 
// add ingredients dynamically....

// import React, {Component} from 'react';
// import Aux from '../../hoc/Auxi';
// import Burger from '../../components/Burger/Burger';


// class BurgerBuilder extends Component {
//     // constructor(props){
//     //     super(props);
//     //     this.state = {....}
//     // }

//     state = {
//         ingredients:{
//             salad: 0,
//             bacon:0,
//             cheese:0,
//             meat:0 
//         }
//         // these are the states/quantities present with us..
//         // somehow we have to pass this array to the burger
//     }
//     render(){
//         return (
//             <Aux>
//                 <Burger ingredients ={this.state.ingredients} />
//                 <div> Build Controls</div>
//             </Aux>
//         );
//     }
// }


// export default BurgerBuilder;



















// .................. adding build controls ..........

// import React, {Component} from 'react';
// import Aux from '../../hoc/Auxi';
// import Burger from '../../components/Burger/Burger';
// import BuildControls from '../../components/Burger/BuildControls/BuildControls';

// // naming convention constants we wanna use as global
// // are in uppercase letters
// const INGREDIENT_PRICES ={
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 1.3,
//     bacon: 0.7
// };

// class BurgerBuilder extends Component {

//     state = {
//         ingredients:{
//             salad: 0,
//             bacon:0,
//             cheese:0,
//             meat:0 
//         },
//         totalPrice: 4,
//         purchasable: false
        
//     }

//     // check whether we can order or not 
//     updatePurchaseState(){
//         const ingredients = {
//             ...this.state.ingredients
//         };
//         // convert this array to the array of values
//         const sum = Object.keys(ingredients).map(igkey=>{
//             return ingredients[igkey];
//         })
//         .reduce((sum,el)=>{
//             return sum + el;
//         },0);

//         this.setState({purchasable: sum>0});
//     }

//     // in here we need two methods which enable us to change state
//     // when a button in BuildControl is clicked
//     addIngredientHandler = (type)=>{
//         const oldCount = this.state.ingredients[type];
//         const updatedCount = oldCount + 1;
//         // we should update state in a immutable way
//         const UpdatedIngredients = {
//             ...this.state.ingredients
//         };
//         UpdatedIngredients[type] = updatedCount;
//         const priceAddition = INGREDIENT_PRICES[type];
//         const oldPrice = this.state.totalPrice;
//         const newPrice = oldPrice + priceAddition;

//         this.setState({
//             totalPrice: newPrice,
//             ingredients:UpdatedIngredients
//         });

//         this.updatePurchaseState();
//     }

//     removeIngredientHandler = (type)=>{
//         const oldCount = this.state.ingredients[type];
//         //it gives error if we try to remove something 
//         // where there are no ingredients...
//         if(oldCount <= 0){
//             return;
//         }
//         const updatedCount = oldCount - 1;
//         // we should update state in a immutable way
//         const UpdatedIngredients = {
//             ...this.state.ingredients
//         };
//         UpdatedIngredients[type] = updatedCount;
//         const priceDeduction = INGREDIENT_PRICES[type];
//         const oldPrice = this.state.totalPrice;
//         const newPrice = oldPrice - priceDeduction;

//         this.setState({
//             totalPrice: newPrice,
//             ingredients:UpdatedIngredients
//         });

//         this.updatePurchaseState();
//     }



//     render(){
// // it would be even better if the button would be desabled 
// // when we don't have anything to remove
// // 
//         const disableInfo = {
//             ...this.state.ingredients
//         }
//         for(let key in disableInfo){
//             disableInfo[key] = disableInfo[key] <= 0;
//         }

//         return (
//             <Aux>
//                 <Burger ingredients ={this.state.ingredients} />
//                 <BuildControls 
//                     ingredientAdded={this.addIngredientHandler}
//                     ingredientRemoved={this.removeIngredientHandler}
//                     disabled = {disableInfo}
//                     price= {this.state.totalPrice}
//                     purchasable={this.state.purchasable}
//                     />
//             </Aux>
//         );
//     }
// }


// export default BurgerBuilder;
























//...........................  order button , adding modal............................................
// above we added updatePurchaseState after each change in state.. ie adding and removing ingredients...
// but still the button doesn't seem to work well...
// because  setState is asynchronous  and updatePurchaseState  executes before the setState is executed completely
// so we pass updated state to the updatePurchaseState function.....

import React, {Component} from 'react';
import Aux from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES ={
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        // ingredients:{
        //     salad: 0,
        //     bacon:0,
        //     cheese:0,
        //     meat:0 
        // },
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing : false,
        loading: false,
        error: false
        
    }

    // fetch data from server
    // for firebase.. endpoint link .joson
    componentDidMount(){
// BurgerBuilder comes under the routable areac of our app so we have access
// to match property
        console.log("[BurgerBuilder] didMount",this.props);

        axios.get('https://burger-builder-dfa69-default-rtdb.firebaseio.com/ingredients.json')
            .then(response=>{
                this.setState({ingredients: response.data});
            })
            .catch(error=>{
                console.log(error);
                this.setState({error: true});
            });
    }
    // we see error because when the app starts data isn't received
    // so ingredients is null.. and UI which depends upon ingredients
    // fail


    






    updatePurchaseState(ingredients){
       
        const sum = Object.keys(ingredients).map(igkey=>{
            return ingredients[igkey];
        })
        .reduce((sum,el)=>{
            return sum + el;
        },0);

        this.setState({purchasable: sum>0});
    }

    addIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const UpdatedIngredients = {
            ...this.state.ingredients
        };
        UpdatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients:UpdatedIngredients
        });

        this.updatePurchaseState(UpdatedIngredients);
    }

    removeIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const UpdatedIngredients = {
            ...this.state.ingredients
        };
        UpdatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingredients:UpdatedIngredients
        });

        this.updatePurchaseState(UpdatedIngredients);
    }



    // purchaseHandler(){
    //     this.setState({purchasable: true});
    // }
    // // this function doesn't work because  its a named function and the this keywork here won't refer to the class it is in
    // // it will refer to the object which called this function...
    purchaseHandler = ()=>{
        this.setState({purchasing: true});
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = ()=>{

//         this.setState({loading: true});
//         // alert('You continue !');
//         const order = {
//             ingredients : this.state.ingredients,
//             price: this.state.totalPrice,
//             // for production app we should calculate price 
//             // on server so that user couldn't manipulate price
//             // but here we'll do
//             customer: {
//                 name: 'suraj',
//                 address: {
//                     street: 'bbsr',
//                     zipcode: '3434',
//                     country: 'india'
//                 },
//                 email: 'test@gmail.com'
//             },
//             deliveryMethod: 'fastest'
//         }
// // after post is done or some error occured.. we close the spinenr ie. set
// // loading to false also we close the modal ie. purchasing is false
//         axios.post('./orders.json', order)
//             .then(response=>{
//                 // console.log(response);
//                 this.setState({loading: false, purchasing: false});
//             })
//             .catch(error=>{
//                 // console.log(error);
//                 this.setState({loading: false, purchasing: false});
//             });
//         // for firebase  any node name .json


//.................. ROUTIG .......................
        // history.push  allows us to switch the page and push different page
        // on stack of pages
        // this.props.history.push("/checkout");

        // now we want to pass the actual used ingredients as query params 
       
       
       const queryParams = [];
       for(let i in this.state.ingredients){
           queryParams.push(encodeURIComponent(i) + '='
           +encodeURIComponent(this.state.ingredients[i]));
           // encodeURIComponent is helper method provided by javascript
           // which encodes our element such that they can be used in 
           // URL , this is relevant for white spaces 
       };

       queryParams.push('price='+this.state.totalPrice);
       // pass the total price to checkout page 

       const queryString = queryParams.join('&');
       // queryString is the string of the ingredients
       // we need to parse this url in Checkout page
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString 
        });

    }

    render(){

        const disableInfo = {
            ...this.state.ingredients
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let orderSummary = null;
        // we want to show burger and build controls only when we receive
        // data from server.. else spinner...
        // two adjacent components can't be together.. use Aux  hoc

        let burger =  this.state.error ? <p>Ingredients can't be loaded !</p> :<Spinner/> ;
        // in this case application is broken , but atleast we are able to show it to user

        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients ={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled = {disableInfo}
                    price= {this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                   />
                </Aux>
            );
            orderSummary = <OrderSummary 
            price={this.state.totalPrice}
            ingredients = {this.state.ingredients}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            />
        }


        // overwrite orderSummary when loading 
        if(this.state.loading){
            orderSummary= <Spinner />;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
{/* order summary uses this.state..... so it will get rerendered whenever the state changes.... 
this shouldn't happen when the modal itself is not visibile.... here we can get some improved performance by not updating it */}

                {burger}
                
            </Aux>
        );
    }
}

// export default BurgerBuilder;

export default withErrorHandler(BurgerBuilder, axios);