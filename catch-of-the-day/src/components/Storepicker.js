/* eslint-disable no-console */
import React from "react";
import PropTypes from "prop-types"; 
import { getFunName } from "../helpers";

class StorePicker extends React.Component {
    myInput = React.createRef();
    // constructor() {
    //     super();
    //     this.goToStore = this.goToStore.bind(this);
    // }

    static propTypes = {
        history: PropTypes.object
    }

    goToStore = (event) => {
        event.preventDefault(); //stops form from submitting
        const storeName = this.myInput.current.value; //get text from input
        this.props.history.push(`/store/${storeName}`); //change page to /store/'whatever they entered'
    }

    render() {
        return (
            <React.Fragment>
                <form className="store-selector" onSubmit={this.goToStore}>
                    <h2>Please Enter a Store</h2>
                    <input 
                        type="text" 
                        ref={this.myInput}
                        required 
                        placeholder="Store Name"
                        defaultValue={ getFunName() }
                    />
                    <button type="submit">Visit Store</button>
                </form>
            </React.Fragment>
        );
    }
}

export default StorePicker;