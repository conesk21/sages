import React, { Component } from "react";
import {coinFactory, currencyFacory} from "./classes";

class Conversion extends Component{
  constructor(props) {
    super(props);
    this.state = {
      primaryName: this.props.primary,
      coin: 1,
      primary: 1
    };
  }
  handleCoinChange=(e)=>{
    
    if(!(e.target.value==="0")){
      this.setState({
      coin: e.target.value
    })
    var value = this.state.primary/e.target.value
    this.props.onChange(this.props.coin, value)
    } else {
      alert("The value of any coin cannot be 0")
    }
  }

  handlePrimaryChange=(e)=>{
    if(!(e.target.value==="0")){
    this.setState({
      primary: e.target.value
    })
    var value = e.target.value/this.state.coin
    this.props.onChange(this.props.coin, value)
    } else {
      alert("The value of any coin cannot be 0")
    }
  }
  
  componentDidUpdate(prevProps){
    if(prevProps.primary !== this.props.primary){
        this.setState({          
            primary:1,
            coin: 1 
        });
    }
}

  render(){
      return <div className="conversion">
        <input type="number"   value={this.state.coin} onChange={this.handleCoinChange}></input> {this.props.coin} 
        <span> = </span> 
        <input type="number"  value={this.state.primary} onChange={this.handlePrimaryChange}></input> {this.props.primary}
        </div>
  
  }
}

class Preveiw extends Component{
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      text: "cowboy"
    };
  }

  hasError=()=>{
    
    var found = false
    var vals = []
    for (var i in this.props.object){
      var target = this.props.object[i]
      
      if (target===0 || target===Infinity){
        found = true 
        this.setState({
          error: true, 
          text: "Currency values cannot be 0"
        })
      }
       if (target<0){
        found = true 
        this.setState({
          error: true, 
          text: "Currency values cannot be Negative"
        })
      }
      if (target>0 && target<.01){
        found = true 
        this.setState({
          error: true, 
          text: "Currency values cannot be miniscule"
        })
      }
      
      if(vals.indexOf(target)===-1){
          vals.push(target)
      } else{
         found = true 
          this.setState({
            error: true, 
            text: "Currency values must be Unique"
          })
      }
       }
      if (!found){
        this.setState({
          error: false, 
          text: ""
        })
      }
      this.props.onError(found)

      }
    
  
  componentDidUpdate(prevProps){
    if(prevProps.object !== this.props.object){
       this.hasError()
    }
  }
  render(){
    
    return ( 
      <div className = "previewGroup">
        <div className="preview">
      {Object.keys(this.props.object).sort((a,b)=>{
        return this.props.object[a]-this.props.object[b]}).map((item,i)=>{
          return<div key={i} className="coin-preview">{item}: {this.props.object[item]}</div>
        })}
        </div>
      {this.state.error &&  <p>WARNING: {this.state.text}</p>}
    </div>
    
    )
   
  }
}

class Names extends Component{
    

  onSave=(oldName, newName)=>{
    if(newName ===""){
      alert("Coins mut have a name")
    } else if(this.props.names.indexOf(newName) !== -1){
      alert("All names must be unique!")
    } else if (/\d/.test(newName)){
      alert("Names can't contain numbers, silly")
    } else {
      this.props.onSave(oldName,newName)
    }

  }
  
  

  render(){
    return(
      <div className="denominations">
      
        <NameInput save={this.onSave} />
        <div className="preview">
        {this.props.names.map((item,i)=>{
          return <CoinCard key={i} name={item} save={this.onSave} delete={this.props.onRemove}/>
        })} 
        </div>
        <p>primary coin:</p>
        <select onChange={this.props.onPrimaryChange}>
          {this.props.names.map((item)=>{
          return <option key={item}>{item}</option>
        })}</select>
      </div>
    )
  }
}

class NameInput extends Component{
  constructor(props) {
    super(props);
    this.state = {
      temp: "",
    };
  }

  onChange=(e)=>{
    this.setState({
      temp: e.target.value
    })
  }
  

  onSave=()=>{
    
    this.props.save("", this.state.temp)
    this.setState({
      temp: ""
    })
  }
  

  render(){
    return(
      <div> 
      <input type="text" value={this.state.temp} onChange={this.onChange}></input>
      <button type="button" className="add-coin" onClick={this.onSave}>add coin</button>
      </div>
    )
  }

}

class CoinCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      temp: this.props.name,
      display: true
    };
  }

  onChange=(e)=>{
    this.setState({
      temp: e.target.value
    })
  }
  changeDisplay = (e) =>{
    this.setState({
      display: !this.state.display
    })
  }

  onRevert=()=>{
    this.setState({
      temp: this.props.name, 
      display: true
    })
  }
  onSave=()=>{
    this.setState({
      display: true
    })
    this.props.save(this.props.name, this.state.temp)
  }

    componentDidUpdate(prevProps){
      if(prevProps.name !== this.props.name){
          this.setState({          
              temp: this.props.name,
              display:true 
          });
      }
  }

  render(){

    var title = <div>
      <p onClick={this.changeDisplay}>{this.props.name}</p> 
      <button type="button" onClick={()=>{this.props.delete(this.props.name)}}>
        <span className="material-symbols-outlined">close</span>
        </button>
    </div>
    var input =<div>
      <input type="text" value={this.state.temp} onChange={this.onChange}></input>
      <button type="button"onClick={this.onRevert}>
      <span className="material-symbols-outlined">undo</span>
        </button> 
      <button type="button"onClick={this.onSave}>
        <span className="material-symbols-outlined">done</span>
        </button> 
    </div> 
    return(
      <div className="coin-card">
        {this.state.display ? title:input}</div>
     

    )
  }

}


class CurrencyForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      primary: "",
      currency: {},
      error: true
    };
  }
    
    addName =(newName)=>{
      var coins = {...this.state.currency}
      coins[newName] = 1
      if (Object.keys(this.state.currency).length === 0){
        this.setState({
          currency: coins,
          primary: newName
          })
      } else {
        this.setState({
        currency: coins,
        })
      }
      
    }
    changeName=(oldName, newName)=>{
      
        if(oldName===""){
          this.addName(newName)
        } else{
          var coins = {...this.state.currency}
          coins[newName] = coins[oldName]
          delete coins[oldName]
          this.setState({
            currency: coins
          })
        }
   
  }
  

    deleteName=(name)=>{
      var coin = {...this.state.currency}
      delete coin[name] 
      this.setState({
        currency: coin
      })
    }

    onPrimaryChange=(e)=>{
      var coin = {...this.state.currency}
      var names = Object.keys(this.state.currency)
      for(var i=0; i<names.length;i++){
        coin[names[i]] = 1 
      }
      this.setState({
        primary: e.target.value,
        currency: coin
      })
    }

    updateObject=(name,denom)=>{
      var coin = {...this.state.currency}
      coin[name] = denom
      this.setState({
        currency: coin
      })

    }
    changeError=(boolean)=>{
      this.setState({
        error: boolean
      })
    }

    onSave=(e)=>{
      e.preventDefault()
      var coinArray = Object.keys(this.state.currency).sort((a,b)=>{
        return this.state.currency[a]-this.state.currency[b]}).map((item,i)=>{
          return coinFactory(item, this.state.currency[item])})
      console.log(coinArray)
      var newCurrency = currencyFacory(coinArray)
      this.props.onSave("New Economy", newCurrency)
    }
    render(){
    
    return (
      <div className="currency">
      <form className="currency-form">
        <h1>Change Currency</h1>
        <h4>Denominations</h4>
        <Names names={Object.keys(this.state.currency)} onSave={this.changeName} onPrimaryChange={this.onPrimaryChange} onRemove={this.deleteName}/>
        <h4>Conversions</h4>
        <div className="conversions">
          <p>how the coins get their value, all based on the primary coin.</p>
          <p className="side-note">*note: coins bigger than the primary should look like this: <span>1 platinum = 10 gold</span> and coins smaller than the primary should look like this: <span>10 silver = 1 gold</span></p>
        {Object.keys(this.state.currency).filter((item)=> item !== this.state.primary).map((name,i)=>{
          return <Conversion key={i} coin={name} primary={this.state.primary} onChange={this.updateObject}/>
        })}</div>
        <h4>Preveiw</h4>
        <div className="previews">
          <p>the names of the coins and their value, in ascending order</p>
        <Preveiw object={this.state.currency} onError={this.changeError}/>
        <p>primary: {this.state.primary}</p>
        </div>
        <button onClick={this.onSave} disabled={this.state.error} type="submit" className="primary">Save</button>
      </form></div>
      )
  }
}

  




export default CurrencyForm;