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
  constructor(props) {
    super(props);
    this.state = {
      temp: false
    };
  }
  switchTemp=()=>{
    this.setState({
      temp: !this.state.temp
    })
  }

  onSave=(oldName, newName)=>{
    this.props.onSave(oldName,newName)
    this.setState({
      temp:false
    })

  }
  
  

  render(){
    return(
      <div>
        <p>input the names of each coin (order doesn't matter)</p>
        <button type="button" onClick={this.switchTemp}>add coin</button>
        {this.state.temp && <CoinCard name={""} display={false} save={this.onSave} revert={this.switchTemp}/>}
        {this.props.names.map((item)=>{
          return <CoinCard name={item} display={true} save={this.onSave} revert={this.switchTemp} delete={this.props.onRemove}/>
        })}

        <p>primary coin:</p>
        <select onChange={this.props.onPrimaryChange}>
          {this.props.names.map((item)=>{
          return <option key={item}>{item}</option>
        })}</select>
      </div>
    )
  }
}

class CoinCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      temp: this.props.name,
      display: this.props.display
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
    this.props.revert()
    this.setState({
      temp: this.props.name, 
      display: true
    })
  }
  onSave=()=>{
    this.setState({
      display: true
    })
    this.props.save(this.props.name, this.state.temp)}
  

  render(){

    var title = <div>
      <p onClick={this.changeDisplay}>{this.props.name}</p> 
      <button type="button" onClick={()=>{this.props.delete(this.props.name)}}>delete</button>
    </div>
    var input =<div>
      <input type="text" value={this.state.temp} onChange={this.onChange}></input>
      <button type="button"onClick={this.onRevert}>X</button> 
      <button type="button"onClick={this.onSave}>+</button> 
    </div> 
    return(
      <div>
        {this.state.display ? title:input}</div>
     

    )
  }

}


class CurrencyForm extends Component{
  constructor(props) {
    super(props);
    this.state = {
      primary: "",
      currency: {}
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
        <Names names={Object.keys(this.state.currency)} onSave={this.changeName} onPrimaryChange={this.onPrimaryChange} onRemove={this.deleteName}/>
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