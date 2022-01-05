// import React from 'react';
// import classes from './Modal.module.css';
// import Aux from '../../../hoc/Auxi';
// import Backdrop from '../Backdrop/Backdrop';

// const modal = (props)=>(
//     <Aux>
//         <Backdrop show={props.show}
//         clicked={props.modalClosed} />
//     <div 
//     className={classes.Modal}
//     style={{
//         transform: props.show? 'translateY(0)': 'translateY(-100vh)',
//         opacity: props.show? '1':'0'
//     }}
//     >
//         {props.children}
//     </div>
//     </Aux>
// );

// export default modal;

// // we add it in a place where we wan't to show it...
// // that is logical place where it belongs and we have the state
// // and the methods to control the display
// // Burger Builder...



















//. ... should component update ......

import React, {Component} from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxi/Auxi';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{

    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show !== this.props.show || 
              nextProps.children !== this.props.children;
        // the modal actually didn't show up/ spinner
        // because we are checking for the show state
        // but we did change the children of the modal
        // spinner instead of orderSummary
    }
    componentWillUpdate(){
        console.log('[Modal] willUpdate');
    }
    // we saw that the wrapping component controls the 
    // updating of the wrapped components

    render(){
        return (
         <Aux>
            <Backdrop show={this.props.show}
             clicked={this.props.modalClosed} />
            <div 
              className={classes.Modal}
              style={{
            transform: this.props.show? 'translateY(0)': 'translateY(-100vh)',
            opacity: this.props.show? '1':'0'
             }}
            >
              {this.props.children}
            </div>
         </Aux>
        
        );
    }
}

export default Modal;