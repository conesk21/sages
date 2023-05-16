import React,{Component} from "react";
import { fantasy } from "./classes.js";

class Card extends Component{
    constructor(props) {
        super(props);
        this.state = {
            item: props.item,
            value: 1,
            view: "static",
            price: fantasy.getCoins(props.item.getValue())
        };
    }
    handleInput = (event) =>{
        let val = event.target.value/100
        let itemVal = this.state.item.getValue()
        this.setState(
            { value: val,
                price: fantasy.getCoins(val*itemVal)}
        )
    }
    changeView = (e) =>{
        var ne;
        this.state.view === "edit"? ne="static": ne = "edit"
        this.setState({
            view: ne
            });
            
        
    }

    render(){
        let middle; 
        if (this.state.view === "edit") {
            middle = <div>
                <input onChange={this.handleInput} type="range" min="1" max="200"step=".1"value="100"></input>
                <button onClick={()=>{
                    this.state.item.revalue(this.state.value)
                    this.setState({
                        price: fantasy.getCoins(this.state.item.getValue())
                    })
                    this.changeView();}}>save</button> 
                <button onClick={()=>{
                    this.setState({
                        price: fantasy.getCoins(this.state.item.getValue())
                    })
                    this.changeView();}}>revert</button>
            </div> 

        } else {
            middle = <button onClick={this.changeView}>edit</button>
        }
    return (
        <div className="item-card">
            <h1>{this.state.item.name}</h1>
            
            {middle}
            <p>{this.state.price}</p>
        </div>
    )
    }
}

export default Card;