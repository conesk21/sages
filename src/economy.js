import React, { Component } from "react";

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
      temp: []
    };
}
  addItem = () =>{
    var tempItem = {name: "", value: 0}
    this.setState({
      temp: [tempItem]
    })
    
  }

  onSave =(oldName, newName, newVal)=>{
    this.setState({itemArray: this.state.itemArray.filter(function(item) { 
      if (item.name === oldName ){
        item.name = newName
        item.setValue(newVal)
      }
      return item
  })});

  }

  onRevert = ()=>{
    this.setState({
      temp: []
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
      {this.state.temp.map((items, i) =>{
        return <Card key={i+"temp"} name={items.name} val={items.value} edit={true} onSave={this.onSave} onRevert={this.onRevert}/>
      })}
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
