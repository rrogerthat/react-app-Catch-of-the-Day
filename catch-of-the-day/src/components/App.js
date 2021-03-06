/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import PropTypes from "prop-types"; 
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";    //can rename it since we're importing default
import Fish from "./Fish";   
import base from "../base";


class App extends Component {
    state = {
        fishes: {},
        order: {}       //persisted in local storage
    };  

    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount() {
        const {storeId} = this.props.match.params;  //from Router under App
        //first reinstate our localStorage since on refresh it will trigger an update (componentDidUpdate) and empty out what's in order in localStorage
        const localStorageRef = localStorage.getItem(storeId);  //returns order state for this store
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });   //convert string back to object
        }

        this.ref = base.syncState(`${storeId}/fishes`, {    //reference to which store, then to fish obj that db will mirror its state
            context: this,
            state: "fishes"
        }); 
    }

    componentDidUpdate() {      //after props or state gets updated and component re-renders (not called after initial render)
        // console.log(this.state.order);
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));    //this sets the key in key:value under local storage
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }



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

    updateFish = (key, updatedFish) => {
        //1.Take copy of current state
        const fishes = {...this.state.fishes};
        //2. Update that state
        fishes[key] = updatedFish;
        //3. Set that to state
        this.setState({
            fishes
        });
    }

    deleteFish = (key) => {
        //1. take a copy of state
        const fishes = {...this.state.fishes};
        //2. update the state
        fishes[key] = null; //in order to delete from Firebase (can't use delete)
        //3. update state
        this.setState({
            fishes
        });
    }

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

    deleteOrder = (key) => {
        const order = {...this.state.order};
        delete order[key];
        this.setState({
            order
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
                <Order fishes={this.state.fishes} order={this.state.order} deleteOrder={this.deleteOrder} />   {/* can also do {...this.state} but not as modular */}
                <Inventory 
                    storeId={this.props.match.params.storeId}
                    fishes={this.state.fishes} 
                    addFish={this.addFish} 
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    deleteOrder={this.deleteOrder}
                    loadSampleFishes={this.loadSampleFishes} />  {/*add prop with same name as property of method- goal is to update state from form*/}
                    
            </div>
        );
    }
}

export default App;