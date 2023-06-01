import React, { Component } from "react";
import SideNav from "./SideNav.js";
import Economy from "./economy.js";
import { itemFactory, items } from "./classes.js";
import data from "./items.json";
import CurrencyForm from "./CurrencyForm.js";
const itemArray = data.map((item)=>{
  return itemFactory(item[0],item[1])
})
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     view: true
    };
}
  changeVeiw=(boolean)=>{
    this.setState({
      view: boolean
    })
  }
  render() {
    
    return (
      <div className="veiw">
        <SideNav onChange={this.changeVeiw}/>
        {this.state.view && <Economy items={itemArray}/>}
        {!this.state.view && <CurrencyForm />}
      </div>)
  }
}



export default App;
