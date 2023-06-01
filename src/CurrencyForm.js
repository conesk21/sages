import React, { Component } from "react";

class CurrencyForm extends Component{
    render() {
    
    return (
      <div className="currency">
      <form className="currency-form">
        <h2>Change Currency</h2>
        <h3>Denominations</h3>
        <p>names of coins</p>
        <input type="text"></input> < button>add denomination</button>
        <h3>Primary coin</h3>
        <select></select>
        <h3>Conversions</h3>
        <input type="number"></input> = <input type="number"></input>
        <h3>Preveiw</h3>

        <button type="submit">Save</button>
      </form></div>
      )
  }
}

  




export default CurrencyForm;