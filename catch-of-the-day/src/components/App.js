/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";    //can rename it since we're importing default

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

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                </div>
                <Order />
                <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} />  {/*add prop with same name as property of method- goal is to update state from form*/}
            </div>
        );
    }
}

export default App;