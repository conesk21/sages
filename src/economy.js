import React, { Component } from "react";
import { smallTown } from "./classes.js";
import Card from "./Card.js";

class Holder extends Component {
  render() {
    const array = smallTown.names();
    return (
      <div className="card-holder">
      {array.map((itemName, i) =>{
        return <Card key={i}name={itemName} value={smallTown.getItemValue(itemName)} price={smallTown.getPrice(itemName)}/>
      })}
      </div>)
  }
}



export default Holder;
