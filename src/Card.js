import React,{Component} from "react";
import { fantasy } from "./classes.js";

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
           coins: props.coins,
           value: 0
        };
    }

    onTitleChange=(e)=>{
        if (e.target.value.toString().length<=5){
            e.target.style.width = 6 + "ch"; 
        }else {
            e.target.style.width = (e.target.value.toString().length + 2 )+ "ch";
        }
        this.setState(
            {
            title: e.target.value}

        )
    }

    onCoinChange=(e)=>{
        var cons = this.state.coins
        cons[e.target.name] = e.target.value
        this.setState(
            {
            coins: cons,
            }

        )
    }

    onSave=(e)=>{
        if(fantasy.coinToValue(this.state.coins)>0 & this.state.title !== ""){
            this.props.onSave(this.state.title, fantasy.coinToValue(this.state.coins))
    } else {
        alert("An item can't be worthless! It's special in its own way...")
    }
}




    render(){
        var coinInputs = [];
        for (var key in this.state.coins){
            coinInputs.push(<label htmlFor={key}>
                <input onChange={this.onCoinChange}type="number" name={key} key={key} value={this.state.coins[key]}></input> 
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
                <button onClick={this.onSave}className="save">
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
            middle: false
        };
    }


    render(){
    return(
        <div className="item-card">
            <div className="item-title">
            <h3 onClick={this.props.changeDisplay}>{this.props.name}</h3>
            <button className="item-more" onClick={() => this.setState({ middle: !this.state.middle})}>
                <span className="material-symbols-outlined">more_horiz</span>
                </button>
            </div> 
            {this.state.middle && <Slight value={this.props.value}/> }
            <div className="item-price">
            <span onClick={this.props.changeDisplay}>{fantasy.valueToString(this.props.value)}</span>   
            </div>  
      </div>
    )
    }
}



class Card extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            value: props.val,
            edit: props.edit,
        };
    }

    onRevert=(e)=>{
        this.props.onRevert()
        this.changeDisplay()
    }

    changeDisplay = (e)=>{
        this.setState(
            {
                edit: !this.state.edit
            }
        )
    }

    onSave =(title, val)=>{
        this.props.onSave(this.state.name, title, val)
       
            this.setState({
                name: title,
                value: val,
                price: fantasy.valueToString(val)
            })
        
        
        this.changeDisplay()
        
    }


    render(){
        var show;
        if (this.state.edit){
            show = <Form title={this.props.name} coins={fantasy.valueToCoins(this.props.val)} onRevert={this.onRevert} onSave={this.onSave}/>
        } else {
            show = <Display name={this.props.name} value={this.props.val} changeDisplay={this.changeDisplay} /> 
        }
    return (

      <div>
        {show}
      </div>
        
    )
    }
}

export default Card;