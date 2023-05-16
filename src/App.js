import React, { Component } from "react";
import { smallTown } from "./classes.js";
import Card from "./Card.js";

class App extends Component {
  render() {
    const array = smallTown.names()
    return (
      <div className="card-holder">
      {array.map((itemName) =>{
        return <Card name={itemName} value={smallTown.getItemValue(itemName)} price={smallTown.getPrice(itemName)}/>
      })}
      </div>)
  }
}



export default App;
