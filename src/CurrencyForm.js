import React, { Component } from "react";

class Conversion extends Component{
  constructor(props) {
    super(props);
    this.state = {
      coin: 1,
      primary: 1
    };
  }
  handleCoinChange=(e)=>{
    this.setState({
      coin: e.target.value
    })
    var value = this.state.primary/e.target.value
    this.props.onChange(this.props.coin, value)

  }
  handlePrimaryChange=(e)=>{
    this.setState({
      primary: e.target.value
    })
    var value = e.target.value/this.state.coin
    this.props.onChange(this.props.coin, value)

  }

  render(){
      return <div className="conversion">
        <input type="number"   value={this.state.coin} onChange={this.handleCoinChange}></input> {this.props.coin} = 
        <input type="number"  value={this.state.primary} onChange={this.handlePrimaryChange}></input> {this.props.primary}
        </div>
  
  }
}

class Preveiw extends Component{
  render(){
    return ( 
    <div className="preview">
      {Object.keys(this.props.object).sort((a,b)=>{
        return this.props.object[a]-this.props.object[b]}).map((item)=>{
          return<span>{item}: {this.props.object[item]}</span>
        })}
    </div>
    )
   
  }
}

class Names extends Component{
  render(){
    return(
      <div>
        
      </div>
    )
  }
}



class CurrencyForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      temp:"",
      primary: "",
      currency: {}
    };
  }
    onNameChange=(e)=>{
      this.setState({
        temp: e.target.value
      })
    }
    addName =()=>{
      var nam = this.state.temp
      var coin = {...this.state.currency}
      coin[nam] = 1
      if (Object.keys(this.state.currency).length === 0){
        this.setState({
          temp: "",
          currency: coin,
          primary: this.state.temp
          })
      } else {
        this.setState({
        temp: "",
        currency: coin,
        })
      }
      
    }
    onPrimaryChange=(e)=>{
      this.setState({
        primary: e.target.value
      })
    }

    updateObject=(name,denom)=>{
      var coin = {...this.state.currency}
      coin[name] = denom
      this.setState({
        currency: coin
      })

    }
    render(){
    
    return (
      <div className="currency">
      <form className="currency-form">
        <h1>Change Currency</h1>
        <h4>Denominations</h4>
        <p>input the names of each coin (order)</p>
        <input type="text" value={this.state.temp} onChange={this.onNameChange}></input> < button type="button" onClick={this.addName}>add denomination</button>
        <p>primary coin:</p>
        <select onChange={this.onPrimaryChange}>
          {Object.keys(this.state.currency).map((item)=>{
          return <option key={item}>{item}</option>
        })}</select>
        <h4>Conversions</h4>
        {Object.keys(this.state.currency).filter((item)=> item !== this.state.primary).map((name)=>{
          return <Conversion coin={name} primary={this.state.primary} onChange={this.updateObject}/>
        })}
        <h4>Preveiw</h4>
        <Preveiw object={this.state.currency} />
        <p>primary: {this.state.primary}</p>
        <button type="submit">Save</button>
      </form></div>
      )
  }
}

  




export default CurrencyForm;