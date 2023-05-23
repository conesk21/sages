import React, { Component } from "react";
import Header from "./header.js";
import Economy from "./economy.js";
import { items } from "./classes.js";
class App extends Component {
  render() {
    
    return (
      <div >
        <Header />
        <Economy items={items}/>

      </div>)
  }
}



export default App;
