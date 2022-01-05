import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';



class ContactData extends Component {
    state = {
        orderForm: {
             name: {
                 elementType: 'input',
                 elementConfig:{
                     type: 'text',
                     placeholder: 'Your name'
                 },
                 value: '',
                 validation:{
                     required: true
                 },
                 valid: false,
                 touched: false
             },
            
            street:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country:{
                elementType: 'input',
                elementConfig:{
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            email:{
                elementType: 'input',
                elementConfig:{
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation:{
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig:{
                    options:[
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                // default value is given because if the user didn't 
                // even click on the dropdown because the method shows
                // fastest by default it would send empty string to server
                // because then the value property of deliveryMethod
                // is not set
                validation: {},
                valid: true 
                // we added valid property for handling edge cases in loop of inputChangeHandler
                // for formIsValid
            },
     
        },
        loading: false,
        formIsValid: false 
    }


    orderHandler = (event)=>{
        event.preventDefault();
        // this prevent the default behaviour of forms we are using ie. 
        // refreshing .. so the page loads again
        console.log(this.props.ingredients);

        // send request to server
        this.setState({loading: true});

        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }


        const order = {
            ingredients : this.props.ingredients,
            price: this.props.price,
            orderData: formData    
        }
    
            

        axios.post('./orders.json', order)
            .then(response=>{
                this.setState({loading: false});
                // to redirect we can push the redirected page
                this.props.history.push('/');
                console.log(order);
                // but we didn't take 
                // help of Route while rendering ContactData...
                // so history isn't available to us in ContactData
                // in route we manually rendered ContactData
// to ways to handle
// 1. we can wrap contactData with  withRouter hoc 
// 2. pass the history object from property of checkout

            })
            .catch(error=>{
                this.setState({loading: false});
            });
  



    }

    checkValidity(value, rules){
        // adjust validity and se in inputChangedHandler
        let isValid = true;
        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length<= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangeHandler = (event,inputIdentifier)=>{
        console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        // we shouldn't change the state directly... because some other function 
        // may be needing it... asynchronous function..
        // simply spreading the orderForm doesn't copy the object properties
        // inside ,, it gives a reference .. still we are accessing the inner 
        // properties directly... again we need to clone
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = formIsValid && updatedOrderForm[inputIdentifier].valid;
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});

    }


    render (){

        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                
                {formElementsArray.map(formElement=>(
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value = {formElement.config.value}
                        invalid = {!formElement.config.valid}
                        shouldValidate = {formElement.config.validation}
                        touched={formElement.config.touched}
                        
                        changed= {(event)=>this.inputChangeHandler(event,formElement.id)} />
                ))}
                {/* <Button btnType="Success"
                        clicked={this.orderHandler}>ORDER</Button> */}
                        <Button 
                            btnType="Success"
                            disabled={!this.state.formIsValid}>ORDER</Button>
               
                </form>
        );
        if(this.state.loading){
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        );
    }




}



export default ContactData;