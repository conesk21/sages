import React,{Component} from "react";

class Card extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            value: props.value,
            view: "static",
            price: props.price
        };
    }

    render(){

    return (
        <div className="item-card">
            <h1>{this.state.name}</h1>
            <p>{this.state.price}</p>
        </div>
    )
    }
}

export default Card;