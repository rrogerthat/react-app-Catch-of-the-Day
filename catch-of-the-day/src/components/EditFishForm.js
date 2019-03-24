import React from "react";

class EditFishForm extends React.Component {

    handleChange = (event) => {
        //update that fish
        //1. take a copy of the current fish
        const updatedFish = {...this.props.fish, [event.currentTarget.name]: event.currentTarget.value};     //similar to: "name: event.currentTarget.value". When property in "prop:value" is a variable, wrap in [].
        this.props.updateFish(this.props.index, updatedFish);

    }

    render () {
        return <div className="fish-edit">
            <input 
                type="text" 
                name="name" //so the prop in "prop:value" can be dynamically updated in state using "event.currentTarget.name"
                onChange={this.handleChange} 
                value={this.props.fish.name} />
            <input 
                type="text" 
                name="price" 
                onChange={this.handleChange} 
                value={this.props.fish.price} />
            <select 
                type="text" 
                name="status" 
                onChange={this.handleChange} 
                value={this.props.fish.status}>
                <option value="available">Fresh!</option>
                <option value="unavailable">Sold Out!</option>
            </select>
            <textarea 
                name="desc" 
                onChange={this.handleChange} 
                value={this.props.fish.desc}></textarea>
            <input 
                type="text" 
                name="image" 
                onChange={this.handleChange} 
                value={this.props.fish.image} />
            <button onClick={() => {
                this.props.deleteFish(this.props.index);
                this.props.deleteOrder(this.props.index);}
            }>Remove Fish</button>
        </div>;
    }
}

export default EditFishForm;