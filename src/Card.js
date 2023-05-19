import React,{Component} from "react";
import { fantasy } from "./classes.js";

class Display extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            discount: {value: 10, price: fantasy.getCoins( props.value*.9)},
            markup: {value: 10, price: fantasy.getCoins( props.value*1.1)},
        };
    }
    changeDiscount = (e) =>{
        if (e.target.value.toString().length===0){
            e.target.style.width = 2 + "ch"; 
        }else {
            e.target.style.width = e.target.value.toString().length + "ch";
        }
        
        var dis = 1 - (e.target.value/100)

        this.setState(
            {
                discount:{value: e.target.value, price: fantasy.getCoins(this.state.value*dis)}
            }
        )
        
    }

    changeMarkup = (e) =>{
        if (e.target.value.toString().length===0){
            e.target.style.width = 2 + "ch"; 
        }else {
            e.target.style.width = e.target.value.toString().length + "ch";
        }
        var mar = 1 + (e.target.value/100)

        this.setState(
            {
                markup:{value: e.target.value, price: fantasy.getCoins(this.state.value*mar)}
            }
        )
        
    }
    render(){
        return(
            <div>
            <div className="item-var"> <span><input type="number"   value={this.state.discount.value} onChange={this.changeDiscount}></input>% discount: </span> <p>{this.state.discount.price}</p></div>
            <div className="item-var"> <span><input type="number" value={this.state.markup.value} onChange={this.changeMarkup}></input>% markup: </span> <p>{this.state.markup.price}</p></div>
               
            </div> 

        )
    }
}

class Card extends Component{
    constructor(props) {
        super(props);
        this.state = {
            item: props.item,
            view: "static",
            price: fantasy.getCoins(props.item.getValue()),
        };
    }
    
    changeView = (e) =>{
        var ne;
        this.state.view === "edit"? ne="static": ne = "edit"
        this.setState({
            view: ne
            });
            
        
    }

    render(){

    return (
        <div className="item-card">
            <div className="item-title">
            <h3>{this.state.item.name}</h3>
            <button className="item-more" onClick={this.changeView}><span className="material-symbols-outlined">
more_horiz
</span></button>
            </div>
            
            
            {this.state.view === "edit" && <Display value={this.state.item.getValue()}/> }
            <div className="item-price">
             <span>{this.state.price}</span>   
            </div>
            
        </div>
    )
    }
}

export default Card;