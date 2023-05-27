import React, { Component } from "react";
import { fantasy } from "./classes.js";

class Revalue extends Component{
    constructor(props) {
      super(props);
      this.state = {
        items: this.props.items,
        coins: fantasy.valueToCoins(props.items[0].getValue()),
        index: 0
      };
  }

  onChangeSelect =(e)=>{
    var newIndex = e.target.selectedIndex
    var val = this.state.items[newIndex].getValue()
    this.setState(
      {
        coins: fantasy.valueToCoins(val),
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
    var newVal = fantasy.coinToValue(this.state.coins);
    var reval = newVal/oldVal
    this.props.onChange(reval)
  

  }
    render(){
      var coinInputs = [];
      for (var key in this.state.coins){
          coinInputs.push(<label for={key}>
              <input onChange={this.onCoinChange}type="number" name={key} value={this.state.coins[key]}></input> 
              {key}</label>)
      }
      return(
        <form>
            1 <select onChange={this.onChangeSelect}>
            {this.props.items.map((item, i)=>{
              return <option value={item.name} key={i} data={item.getValue()}>{item.name}</option>
            })}
          </select> = {coinInputs}
          <button type="submit" onClick={this.onSave}>revalue</button>
        </form>
      )
    }
  }

  export default Revalue;