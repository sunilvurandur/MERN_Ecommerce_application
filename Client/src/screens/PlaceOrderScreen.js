import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/cartActions';
import {Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';

function PlaceOrderScreen(props){

    const cart = useSelector(state => state.cart);
    const {cartItems, shipping, payment} = cart;
    if(!shipping.address){
        props.history.push("/shipping");
    }else if(!payment.paymentMethod){
        props.history.push("/payment");
    }



const ItemsPrice  = cartItems.reduce((a,c) => a+c.price * c.qty, 0);
const shippingPrice = ItemsPrice > 100 ? 0 : 10;
const taxPrice = 0.15 * ItemsPrice;
const totalprice = ItemsPrice + shippingPrice + taxPrice;


    const dispatch = useDispatch();
   const  placeOrderHandler =() =>{
       //create order
   }
    useEffect(() =>{
       
    }, [])

const checkoutHandler = () =>{
    props.history.push("/signin?redirect=shipping");
}
    return <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className="cart">
    <div className="placeorder-info">
        <div>
            <h3>Shipping
                </h3>
                <div>
                    {cart.shipping.address}, {cart.shipping.city},
                    {cart.shipping.pinCode}, {cart.shipping.country},
                </div>
                <div>
                    <h3>Payment
                        </h3>
                        <div>
                            Payment Method: {cart.payment.paymentMethod}
                        </div>
                </div>
        </div>
        <div>
        <ul className="cart-list-container">
        <li>
          <h3>
            Shopping Cart
          </h3>
          <div>
            Price
          </div>
        </li>
        
                {
                    cartItems.length === 0 ?
                    <div>
                        Cart is empty
                    </div>:
                    cartItems.map(item =>
                        <li>
                            <div className="cart-image">
                            <img src = {item.image} alt = "product" />
                                </div>
                        
                           
                            <div className = "cart-name">
                                
                                <Link to ={"/product/" + item.product }>
                                    { item.name}
                                    </Link>
                                
                                <div>
                                    Qty: {item.qty}
                                    
                                    
                                </div>
                                </div>
                                <div className="cart-price">
                  ${item.price}
                </div>
                            </li>
                            
                          )
                }
               
            </ul>
        </div>
     
        </div>
        <div className="placeorder-action">
            <ul>
                <li>
                    <button onClick = {placeOrderHandler} className="button primary full-width">Place Order</button>
                </li>
                <li>
                    <h3>Order Summary</h3>
                </li>
                <li>
                    <div>Items</div>
                    <div>${ItemsPrice}</div>
                </li>
                <li>
                    <div>Shipping</div>
                    <div>${shippingPrice}</div>
                </li>
                <li>
                    <div>tax</div>
                    <div>${taxPrice}</div>
                </li>
                <li>
                    <div>Total</div>
                    <div>${totalprice}</div>
                </li>
                
            </ul>
            
            
               </div>

    </div>

    </div>
   
}
export default PlaceOrderScreen;