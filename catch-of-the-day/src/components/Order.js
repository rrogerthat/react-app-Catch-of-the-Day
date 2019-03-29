import React from "react";
import {formatPrice} from "../helpers";
// eslint-disable-next-line no-unused-vars
import {TransitionGroup, CSSTransition} from "react-transition-group";

class Order extends React.Component {
    
    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status ===  "available"; 
        const transitionOptions = {
            classNames: "order", 
            key: key,
            timeout: {enter: 500, exit: 500}
        };

        if (!fish) return null;   //if null, nothing gets rendered. For a split sec when Order component first loads, list will say 'item not available" since data from localStorage loads first in this component prior to data in Fish component gets loaded from Firebase. Therefore,set to null. Make sure fish state is loaded before we continue.
        if (!isAvailable) {
            return (
                <CSSTransition {...transitionOptions} >    
                    <li key={key}>
                        Sorry {fish ? fish.name: "fish"} is no longer available
                    </li>
                </CSSTransition>  
            );
        
        }
        return (
            <CSSTransition {...transitionOptions} >          
                
                <li key={key}>
                    <span>
                        <TransitionGroup component="span" className="count">
                            <CSSTransition 
                                classNames="count" 
                                key={count}     //refer to this so one number exits and next number enters in visually
                                timeout={ {enter: 500, exit: 500} }
                            >
                                <span>{count}</span>
                            </CSSTransition>
                        </TransitionGroup>
                        lbs {fish.name + " "}
                        {formatPrice(count * fish.price)}
                        <button onClick={() => this.props.deleteOrder(key)}>&times;</button>
                    </span>
                </li>
            </CSSTransition>  
        );
        
    };

    render () {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {     //key represent one element in orderIds array
            const fish = this.props.fishes[key];    //bracket notation since property is a variable
            const count = this.props.order[key];
            const isAvailable = fish && fish.status ===  "available"; //Boolean to see if fish is available- if not, don't price to Order 

            if (isAvailable) {
                return prevTotal + (count * fish.price);
            }
            return prevTotal;   //fish is not available
        }, 0);
        
        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;