// import React, {Component} from 'react';

// import Layout from './hoc/Layout/Layout';
// import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

// class App extends Component {

//     state = {
//         show: true
//     };

//     componentDidMount(){
//         setTimeout(()=>{
//             this.setState({show: false});
//         }, 5000);
//         // 5s after app is mounted we are removing butgerBuilder
//     }

//     render(){
//         return (
//             <div>
//                 <Layout>
//                     {this.state.show ? <BurgerBuilder /> : null}

//                 </Layout>
//             </div>
//         );
//     }
// }

// export default App;












import React, {Component} from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';


class App extends Component {

    render(){
        return (
            <div>
                <Layout>
                    {/* using switch... the first path which is in the url 
                    is rendered... and other is not looked at by the switch..
                    we also need to re order the routes.. else 
                    for checkout we render both burger_builder and checkout page */}
                <Switch >
                    <Route path="/checkout" component={Checkout} />
                    <Route path='/orders' component={Orders} />
                    <Route path = "/" excact component={ BurgerBuilder} />
                    
                </Switch>
                
                
                
                </Layout>
            </div>
        );
    }
}

export default App;