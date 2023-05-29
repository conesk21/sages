import React, { Component } from "react";
import { itemFactory } from "./classes.js";
import Revalue from "./revalue.js";
import Card from "./Card.js";

class Globals extends Component{
  constructor(props) {
    super(props);
    this.state ={
      global: 1,
      revalue: false
    };
}
  onRevalue = (multiplier) =>{
   this.setState({
    global: this.state.global*multiplier
   })
   this.props.onChange(this.props.items.filter((item)=>{
    item.revalue(multiplier)
    return item
  }))
  }

  render(){
    var revalSpan;
    if (this.state.revalue){
      revalSpan = <span class="material-symbols-outlined">
      expand_less
      </span>
    } else {
      revalSpan = <span class="material-symbols-outlined">
      expand_more
      </span>
    }
    return(
      <section className="globals">
        <div className="global-content">
        <h2>cross-economy changes</h2>
        <p>changes that will effect every item within the economy</p>
        <div className="tranformations">
          <div className="colapsible"><h4>revalue</h4> 
          <button onClick={()=>{
            this.setState({
              revalue: !this.state.revalue
            })
          }}>
            {revalSpan}</button></div>
       {this.state.revalue && <Revalue items={this.props.items} onChange={this.onRevalue}/>} 
       </div>
       </div>
      </section>
    )
  }
}

class Holder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
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
      this.state.items.push(newItem)

    } else{
      this.setState({items: this.state.items.filter(function(item) { 
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
    this.props.onChange(this.state.items)
    

  }

  onRevert = ()=>{
    this.setState({
      temp: false
    })
  } 

  onDelete = (name)=>{
    this.setState({items: this.state.items.filter(function(item) { 
      return item.name !== name 
  })});

  }

  render() {
    return (
      <div className="card-holder">
        
      {this.state.items.map((items, i) =>{
        return <Card key={i} name={items.name} val={items.getValue()} edit={false} onSave={this.onSave} onRevert={this.onRevert}/>
      })}

      {this.state.temp && <Card key={"temp"} name={""} val={0} edit={true} onSave={this.onSave} onRevert={this.onRevert}/>
      }
      
      <button onClick={this.addItem} className="card-button">
        <h3>add item</h3>
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
  newItemArray = (array)=>{
    this.setState({
      items: array
    })
  }

  render(){
    return (
      <div className="economy">
        <Globals items={this.state.items} onChange={this.newItemArray}/>
        <Holder items={this.state.items} onChange={this.newItemArray}/>
      </div>
    )
  }
}


export default Economy;
