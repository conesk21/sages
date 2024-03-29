import React, { Component } from "react";
import { fantasy } from "./classes.js";

class Revalue extends Component{
    constructor(props) {
      super(props);
      this.state = {
        items: this.props.items,
        coins: this.props.currency.valueToCoins(props.items[0].getValue()),
        index: 0
      };
  }

  onChangeSelect =(e)=>{
    var newIndex = e.target.selectedIndex
    var val = this.state.items[newIndex].getValue()
    this.setState(
      {
        coins: this.props.currency.valueToCoins(val),
        index: newIndex
      }
    )

  }

  onCoinChange = (e)=>{
    var cons = this.state.coins
        cons[e.target.name] = e.target.value
        this.setState(
            {
            coins: cons,
            }

        )

  }

  onSave = (e)=>{
    e.preventDefault()
    var oldVal = this.state.items[this.state.index].getValue()
    var newVal = this.props.currency.coinToValue(this.state.coins);
    var reval = newVal/oldVal
    if (newVal=== 0){
      alert("You can't revalue an item to zero, because it will revalue everything to zero!")
    } else {
      this.props.onChange(reval)
    }
    
    
  

  }
    render(){
      var coinInputs = [];
      for (var key in this.state.coins){
          coinInputs.push(<label for={key}>
              <input onChange={this.onCoinChange}type="number" key={key} name={key} value={this.state.coins[key]}></input> 
              {key}</label>)
      }
      return(
        <div className = "content">
          <p >adjust the price of all items relative to the change made to one specific item (i.e. doubling the price of bread will double the price of everything)</p>
        <form>
            <div className="global-form">
              <div>
            <select onChange={this.onChangeSelect}>
            {this.props.items.map((item, i)=>{
              return <option value={item.name} key={i} data={item.getValue()}>{item.name}</option>
            })}
          </select> <span>is worth</span>{coinInputs}</div>
          <button type="submit" onClick={this.onSave}>REVALUE</button>
        </div></form>
        </div>
      )
    }
  }

  export default Revalue;