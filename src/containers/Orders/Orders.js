import React,{Component} from "react";
import Order from "../../components/Order/Order";
import axios from '../../axios-orders';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";





class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    // we only go and fetch orders once it is mounted there is no way we
    // fetch order without mounting orders... 
    componentDidMount(){
        axios.get('/orders.json')
            .then(res =>{
                console.log(res.data);
                // we don't get array we get js object...
                // key is id, value is data

                const fetchedOrders = [];
                for( let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key 
                    });
                    console.log(res.data[key].price);
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err =>{
                this.setState({loading: false});
            });
    }


    render(){
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order 
                        key = {order.id}
                        ingredients = {order.ingredients}
                        price = {+order.price}/>
                ))}
                
            </div>
        );
    }
}



export default withErrorHandler(Orders, axios);