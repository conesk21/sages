import React, { Component } from "react";
import SideNav from "./SideNav.js";
import Economy from "./economy.js";
import { itemFactory, items} from "./classes.js";
import { fantasy } from "./classes.js";
import data from "./items.json";
import CurrencyForm from "./CurrencyForm.js";

const itemArray = data.map((item)=>{
  return itemFactory(item[0],item[1])
})
const baseEconomy = {name:"Unremembered Kingdoms", items: itemArray, currency: fantasy}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
     economies: [baseEconomy],
     display: baseEconomy,
     edit: false 
    };
}
  changeVeiw=(name)=>{
    if(name==="edit"){
      this.setState({
        edit:true
      })
    } else{
      const newDisplay = this.state.economies.find((item)=>item.name === name)
      console.log(newDisplay)
      this.setState({
        display: newDisplay, 
        edit: false
      })
    }
    
  }
  addEconomy=(newName, newCurrency)=>{
    const newEcon = {name: newName, items: itemArray, currency: newCurrency}
    this.state.economies.push(newEcon)
    console.log(newEcon, this.state.economies)
    this.setState({
      display: newEcon,
      edit: false
    })
    
  }
  render() {
    return (
      <div className="veiw">
        <SideNav onChange={this.changeVeiw} names={this.state.economies.map((item)=> item.name)}/>
        {!this.state.edit && <Economy name={this.state.display.name} items={itemArray} currency={this.state.display.currency}/>}
        {this.state.edit && <CurrencyForm onSave={this.addEconomy} />}
      </div>)
  }
}



export default App;
