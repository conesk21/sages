import React, { Component } from "react";
import { itemFactory } from "./classes.js";

import Card from "./Card.js";

class Globals extends Component{
  constructor(props) {
    super(props);
    
}
  render(){
    return(
      <section className="globals">
        <h3>global transformations</h3>
      </section>
    )
  }
}

class Holder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemArray: props.items,
      temp: false
    };
}
  addItem = () =>{
    this.setState({
      temp: true
    })
    
  }

  onSave =(oldName, newName, newVal)=>{
    if (oldName===""){
      var newItem = itemFactory(newName,newVal)
      this.state.itemArray.push(newItem)

    } else{
      this.setState({itemArray: this.state.itemArray.filter(function(item) { 
      if (item.name === oldName ){
        item.name = newName
        item.setValue(newVal)
      }
      return item
  })});
    }
    this.setState({
      temp: false
    })
    

  }

  onRevert = ()=>{
    this.setState({
      temp: false
    })
  } 

  onDelete = (name)=>{
    this.setState({itemArray: this.state.itemArray.filter(function(item) { 
      return item.name !== name 
  })});

  }

  render() {
    return (
      <div className="card-holder">
      {this.state.itemArray.map((items, i) =>{
        return <Card key={i} name={items.name} val={items.getValue()} edit={false} onSave={this.onSave} onRevert={this.onRevert}/>
      })}

      {this.state.temp && <Card key={"temp"} name={""} val={0} edit={true} onSave={this.onSave} onRevert={this.onRevert}/>
      }
      <button onClick={this.addItem} className="card-button">
        <h3>new item</h3>
        </button>
      </div>)
  }
}


class Economy extends Component{ 
  constructor(props) {
    super(props);
    this.state = {
      items: props.items
    };
}
  render(){
    return (
      <div>
        <Globals />
        <Holder items={this.state.items} />
      </div>
    )
  }
}


export default Economy;
