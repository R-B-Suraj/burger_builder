// import React from "react";
// import Modal from "../../components/UI/Modal/Modal";
// import Aux from "../Auxi/Auxi";

// // it receive the axios instance
// const withErrorHandler = (WrappedComponent, axios)=>{
//     return (props)=>{
//         return (
//             <Aux>
//                 <Modal show>
//                     {/* here show by default means true if not specified  */}
//                     Something didn't work !
//                 </Modal>
//                 <WrappedComponent {...props} />
//             </Aux>
//         );
//     }
// }


// export default withErrorHandler;













// ............................global error handler .........
import React, {Component} from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxi/Auxi";


const withErrorHandler = (WrappedComponent, axios)=>{
    return class extends Component{
        state = {
            error: null
        }
        // 
        // componentDidMount()
        componentWillMount(){
            // set state values on go
            this.reqInterceptor = axios.interceptors.request.use(req=>{
                this.setState({error: null});
                return req;
                // we return req so that request can continue
            });
// interceptors helps in modifying while request or response intercepts
// before sending request we should set there is no error
// in response if we receive any error we show that in the handler
            this.resInterceptor = axios.interceptors.response.use(res => res ,error =>{
                this.setState({error: error});
                // we return res 
            });
        }

// whenever we wrap withErrorHandler around any component 
// the above class is executed, axios interceptors are 
// initiated which still remain and listen to req/res
// eventhough the wrapped component is not needed anymore..
// we have some unnecessary code running...
// so we remove these when we don't need it... while 
// componentWillUnmount... prevent memory leaks

        componentWillUnmount(){
            console.log('[withErrorHandler] componentWillUnmount after removing burgerBuilder which is wrapped inside it',
            this.reqInterceptor, this.resInterceptor);
            // we output the Interceptors to see whether these are set after WillMount is called ?? because we are using them  below
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }


// in modal clicked property occurs when we click the backdrop
// when clicked we don't show it anymore.. ie. set error: null
        errorConfirmedHandler = ()=>{
            this.setState({error: null});
        }

        render(){
            return (
                <Aux>
                    <Modal show={this.state.error}
                           modalClosed={this.errorConfirmedHandler}>
                        {this.state.error? this.state.error.message : null}
                        {/* this.state.error.message would throw
                        error initially because modal is present 
                        even if we don't show it. if error is null
                        we can't access message property of null*/}
                    </Modal>
                    <WrappedComponent {...this.props} />
                    {/* from lifecycle hook we know componentDidMount is called only after all child componentDidMount is executed
                    we wrapped BurgerBuilder here ... 
                    componentDidMount of withErrorHandler will only be called once componentDidMount is called for the wrapped component
                    since we rich out to web in componentDidMount of the wrapped component and it failed... we actually didn't call
                    componentDidMount of  withErrorHandler  so we didn't set up the interceptors which was responsible for global error handling
                    
                    so we use componentWillMount  this will be called before child componentDidMount
                    we are not doing side-effects  we are just registering interceptors */}
                </Aux>
            );
        }
    }
}



export default withErrorHandler;