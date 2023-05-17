import React,{Component} from "react";
import { fantasy } from "./classes.js";

class Card extends Component{
    constructor(props) {
        super(props);
        this.state = {
            item: props.item,
            value: 1,
            view: "static",
            price: fantasy.getCoins(props.item.getValue()),
            discount: {value: 10, price: fantasy.getCoins(props.item.getValue()*.9)},
            markup: {value: 10, price: fantasy.getCoins(props.item.getValue()*1.1)},
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

    changeDiscount = (e) =>{
        if (e.target.value.toString().length===0){
            e.target.style.width = 2 + "ch"; 
        }else {
            e.target.style.width = e.target.value.toString().length + "ch";
        }
        
        var dis = 1 - (e.target.value/100)

        this.setState(
            {
                discount:{value: e.target.value, price: fantasy.getCoins(this.state.item.getValue()*dis)}
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
                markup:{value: e.target.value, price: fantasy.getCoins(this.state.item.getValue()*mar)}
            }
        )
        
    }

    render(){
        let middle; 
        if (this.state.view === "edit") {
            middle = <div>
                <div className="item-var"> <span><input type="number"   placeholder={this.state.discount.value} onChange={this.changeDiscount}></input>% discount: </span> <p>{this.state.discount.price}</p></div>
            <div className="item-var"> <span><input type="number" placeholder={this.state.markup.value} onChange={this.changeMarkup}></input>% markup: </span> <p>{this.state.markup.price}</p></div>
               
            </div> 

        } 
    return (
        <div className="item-card">
            <div className="item-title">
            <h3>{this.state.item.name}</h3>
            <button className="item-more" onClick={this.changeView}><span class="material-symbols-outlined">
more_horiz
</span></button>
            </div>
            
            
            {middle}
            <div className="item-price">
             <span>{this.state.price}</span>   
            </div>
            
        </div>
    )
    }
}

export default Card;