/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";    //can rename it since we're importing default
import Fish from "./Fish";   

class App extends Component {
    state = {
        fishes: {},
        order: {}
    };  

    addFish = (fish) => {
        //1. Take copy of existing state (i.e thru object spread)
        const fishes = {...this.state.fishes};
        //2. Add new fish to existing fishes variable (in #1)
        fishes[`fish${Date.now()}`] = fish; 
        //3. Set the new fishes object to state
        this.setState({
            fishes: fishes  //or just fishes since prop & value are same
        });
    };

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        });
    }

    addToOrder = (key) => {
        //1. Take a copy of state
        const order = {...this.state.order};
        //2. Either add to the order, or update the number in our order
        order[key] = order[key] + 1 || 1; 
        //3. Call setState to update our state object
        this.setState({
            order: order    //or just 'order'
        });
    }

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />   {/* can also do {...this.state} but not as modular */}
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />  {/*add prop with same name as property of method- goal is to update state from form*/}
            </div>
        );
    }
}

export default App;