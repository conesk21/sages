import React, { Component } from "react";

class Revert extends Component{
    constructor(props) {
      super(props);
      this.state = {
      };
  }
  onSave = (e)=>{
    e.preventDefault()
    var reval = 1/this.props.global
    this.props.onChange(reval)
  }
    render(){
      
      return(
        <div className = "content">
          <p>un-does previous transformations</p>
        <form>
            <div className="global-form">
          <button type="submit" onClick={this.onSave}>REVERT</button>
        </div></form>
        </div>
      )
    }
  }

  export default Revert;