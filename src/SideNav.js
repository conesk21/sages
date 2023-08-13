import React, { Component } from "react";

class SideNav extends Component {
    render() {
      return (
        <div className="sidenav">
          <h1>SAGES</h1>
          {this.props.names.map((name,i)=><button key={name+i} onClick={()=>{this.props.onChange(name)}}><h4>{name} Economy</h4></button>)}
          <button onClick={()=>{this.props.onChange("edit")}}><h4>Add Economy</h4></button>
        </div>
    )}
  }
  
  
  
  export default SideNav;
  