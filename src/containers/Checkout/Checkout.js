import React,{Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

import {Route} from 'react-router-dom';
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {


    // dummy ingredients... 
    state = {
        ingredients:null,
        price: 0
    }

    // when we load this it will mount... there is not way we route to it
    // without being mounted again. because is isn't nested inside anything
    // so we use componentDidMount  not update
    // componentDidMount()
    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        // this.props.location.search contains the search query params
        // including the ? sign and other signs in url
        // URLSearchParams parses it to objects of this form
        // ['salad', '1']
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()){
            if(param[0] === 'price')
              price = param[1];
            else 
              ingredients[param[0]] = +param[1];
            // +sign is used to convert it to a number
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }



    checkoutCancelledHandler=()=>{
        this.props.history.goBack();
        // goes back to the last page
    }

    checkoutContinuedHandler = ()=>{
        this.props.history.replace('/checkout/contact-data');
        // replace current route with above path
    }

    render(){
        return (
            <div>
                <CheckoutSummary 
                ingredients= {this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler} />
                
                {/* <Route path={this.props.match.path + '/contact-data'}
                       component={ContactData} /> */}
                {/* we used nested routing. load with routing
                 and we don't replace the checkoutSummary... 
                 in above way of routing react renders the component 
                 ContactData for us... but this way we can't 
                 pass data to CotactData (ie. to another page )
                 if we want... so we'll render it manually*/}
                 <Route 
                    path={this.props.match.path + '/contact-data'}
                    render = {(props)=>(
                        <ContactData ingredients={this.state.ingredients}
                                     price = {this.state.totalPrice}
                                      {...props}/>
    // in contactdata we are passing ingredients which are initialized with
    // null... so we get an error because we set the ingredients.. in 
    // componentDidMount. but this executes after all the child components
    // are mounted.... so make it componentWillMount
                    )} />

            </div>
        );
    }
}

// show summary
export default Checkout;