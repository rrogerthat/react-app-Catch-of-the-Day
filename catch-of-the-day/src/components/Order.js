import React from "react";
import {formatPrice} from "../helpers";

class Order extends React.Component {
    
    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status ===  "available"; 

        if (!fish) return null;   //if null, nothing gets rendered. For a split sec when Order component first loads, list will say 'item not available" since data from localStorage loads first in this component prior to data in Fish component gets loaded from Firebase. Therefore,set to null. Make sure fish state is loaded before we continue.
        if (!isAvailable) {
            return <li key={key}>
                Sorry {fish ? fish.name: "fish"} is no longer available
            </li>;
        }
        return <li key={key}>
            {count} lbs {fish.name + " "}
            {formatPrice(count * fish.price)}
            <button onClick={() => this.props.deleteOrder(key)}>&times;</button>
        </li>;
    }

    render () {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
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
                <ul className="order">
                    {orderIds.map(this.renderOrder)}
                </ul>
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;