import React, { Component } from "react";

class SideNav extends Component {
    render() {
      return (
        <div class="sidenav">
          <h1>SAGES</h1>
          <button onClick={()=>{this.props.onChange(true)}}>View Economy</button>
          <button onClick={()=>{this.props.onChange(false)}}>Add Currency</button>
        </div>
    )}
  }
  
  
  
  export default SideNav;
  