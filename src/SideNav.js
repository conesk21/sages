import React, { Component } from "react";

class SideNav extends Component {
    render() {
      return (
        <div class="sidenav">
          <h1>SAGES</h1>
          <button onClick={()=>{this.props.onChange(true)}}><h4>View Economy</h4></button>
          <button onClick={()=>{this.props.onChange(false)}}><h4>Add Currency</h4></button>
        </div>
    )}
  }
  
  
  
  export default SideNav;
  