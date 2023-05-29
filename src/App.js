import React, { Component } from "react";
import Header from "./header.js";
import Economy from "./economy.js";
import { itemFactory, items } from "./classes.js";
import data from "./items.json";
const itemArray = data.map((item)=>{
  return itemFactory(item[0],item[1])
})
class App extends Component {
  render() {
    
    return (
      <div className="veiw">
        <Header />
        <Economy items={itemArray}/>

      </div>)
  }
}



export default App;
