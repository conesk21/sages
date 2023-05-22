import React,{Component, createRef} from "react";
import { fantasy } from "./classes.js";
import { isContentEditable } from "@testing-library/user-event/dist/utils/index.js";

class Slight extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            discount: {value: 10, price: fantasy.valueToString( props.value*.9)},
            markup: {value: 10, price: fantasy.valueToString( props.value*1.1)},
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
                discount:{value: e.target.value, price: fantasy.valueToString(this.state.value*dis)}
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
                markup:{value: e.target.value, price: fantasy.valueToString(this.state.value*mar)}
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

class Form extends Component{
    constructor(props) {
        super(props);
        this.state = {
           title: props.title,
           coins: props.coins
        };
    }

    onTitleChange=(e)=>{
        if (e.target.value.toString().length===0){
            e.target.style.width = 2 + "ch"; 
        }else {
            e.target.style.width = e.target.value.toString().length + "ch";
        }
        this.setState(
            {
            title: e.target.value}

        )
    }

    onCoinChange=(e)=>{
        if (e.target.value.toString().length===0){
            e.target.style.width = 2 + "ch"; 
        }else {
            e.target.style.width = e.target.value.toString().length + "ch";
        }
        var cons = this.state.coins
        cons[e.target.name] = e.target.value
        this.setState(
            {
            coins: cons
            }

        )
    }




    render(){
        var coinInputs = [];
        for (var key in this.state.coins){
            coinInputs.push(<label for={key}>
                <input onChange={this.onCoinChange}type="number" name={key} value={this.state.coins[key]}></input> 
                {key}</label>)
        }
    return (
        <div className="item-card">
        <div className="item-title">
        <input onChange={this.onTitleChange} value={this.state.title}></input>
                <div className="card-buttons">
                <button onClick={ this.props.onRevert}>
                    <span className="material-symbols-outlined">close</span>
                </button>
                <button onClick={()=>(this.props.onSave(this.state.title, fantasy.coinToValue(this.state.coins)))}className="save">
                    <span className="material-symbols-outlined">done</span>
                </button>
                </div>
            </div> 
            <div className="item-price">
             {coinInputs} 
            </div>
        </div>
    )

    }

}

class Display extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            value: props.value,
            middle: false,
            price: fantasy.valueToString(props.value),
        };
    }


    render(){
    return(
        <div className="item-card">
            <div className="item-title">
            <h3 onClick={this.props.onRevert}>{this.state.name}</h3>
            <button className="item-more" onClick={() => this.setState({ middle: !this.state.middle})}>
                <span className="material-symbols-outlined">more_horiz</span>
                </button>
            </div> 
            {this.state.middle && <Slight value={this.state.value}/> }
            <div className="item-price">
            <span onClick={this.props.onRevert}>{this.state.price}</span>   
            </div>  
      </div>
    )
    }
}



class Card extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: props.item.name,
            value: props.item.getValue(),
            edit: false,
        };
    }

    onRevert=(e)=>{
        this.setState(
            {
                edit: !this.state.edit,
            }
        )
    }

    onSave =(title, val)=>{
        this.setState({
            edit: !this.state.edit,
            name: title,
            value: val,
            price: fantasy.valueToString(val)
        }
            
        )
    }


    render(){
        var show;
        if (this.state.edit){
            show = <Form title={this.state.name} coins={fantasy.valueToCoins(this.state.value)} onRevert={this.onRevert} onSave={this.onSave}/>
        } else {
            show = <Display name={this.state.name} value={this.state.value} onRevert={this.onRevert} /> 
        }
    return (

      <div>
        {show}
      </div>
        
    )
    }
}

export default Card;