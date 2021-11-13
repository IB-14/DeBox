import React, { Component } from 'react';
import Identicon from 'identicon.js';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar p-4 text-monospace">
        <div className="navbar-nav px-3" style={{display: 'flex', justifyContent:"space-between", alignItems:"center", width:"100%", flexDirection: "row"}}>
          <img className="logo" src={process.env.PUBLIC_URL + './DeFeed_Logo.svg'} alt="logo" />
          <div style={{display:"flex", alignItems:"center"}}>
            <small id="account">
              <a target="_blank"
                 alt=""
                 className="text-white"
                 rel="noopener noreferrer"
                 href={"https://etherscan.io/address/" + this.props.account}>
                {this.props.account}
              </a>
            </small>
            { this.props.account
              ? <img
                  alt=""
                  className='ml-2'
                  width='30'
                  height='30'
                  src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                />
              : <span></span>
            }
            </div>
          
        </div>
      </nav>
    );
  }
}

export default Navbar;