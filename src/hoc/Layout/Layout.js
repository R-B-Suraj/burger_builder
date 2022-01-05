// import React from 'react';
// import Aux from '../../hoc/Auxi';
// import classes from './Layout.module.css';
// // we are importing as an object.. so its not global style

// import Toolbar from '../Navigation/Toolbar/Toolbar';

// const layout = (props)=>(
//     <Aux>
//         <Toolbar />
//         <main className = {classes.Content }>
//         {props.children}
//         </main>

//     </Aux>
// );


// export default layout;
// // we have two areas.... a main area and a div  with three components..above it  <main> element is an html tag
// // we use this as a wrapper around the core component we want to  render to the screen
// //  we still get error... because we can't have two root elements to return in ejx..
// // to solve this we had two solutions...
// // 1. return these in an array .. the we have to assign each element of the array a unique key...
// // 2. or we can wrap this with a Higher Order component.. which immediately returns these elements and hense serves the 
// // requirement of having only one root element in return statement


























// // ................. side drawer ...........
// import React from 'react';
// import Aux from '../../hoc/Auxi';
// import classes from './Layout.module.css';

// import Toolbar from '../Navigation/Toolbar/Toolbar';
// import SideDrawer from '../Navigation/SideDrawer/SideDrawer';



// const layout = (props)=>(
//     <Aux>
//         <Toolbar />
//         <SideDrawer />
//         <main className = {classes.Content }>
//         {props.children}
//         </main>

//     </Aux>
// );


// export default layout;






















//  turn the layout component to a class..
// so that we can listen to sideDrawer closing 
// and toolbar opening in the same file

import Aux from "../Auxi/Auxi";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import React,{Component} from 'react';

class Layout extends Component {


   state = {
       showSD:false
   }
   SDclosedHandler = ()=>{
       this.setState({showSD: false})
   }

   sideDrawerToggleHandler = ()=>{
    // this.setState({showSD: !this.state.showSD});
    // this works unexpectedly becasue setState is asynchronous
    // clean way of setting the state when it depends on 
    // previous state which may get change unexpectedly
    this.setState((prevState)=>{
        return {showSD: !prevState.showSD}
        });
    }


   render(){
       return (
           <Aux>
               <Toolbar 
               drawerToggleClicked={this.sideDrawerToggleHandler}/>
               <SideDrawer 
               closed={this.SDclosedHandler}
               open={this.state.showSD}/>
               
               <main className={classes.Content} >
                   {this.props.children}
               </main>
           </Aux>
       )
   }
}


export default Layout;