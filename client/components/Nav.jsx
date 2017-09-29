import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/game"> Half-Wit Cards</Link>
          </div>
          <ul className="nav navbar-nav">
            <Link to="/cards">Shuffle</Link>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <Link to="/login">Logout</Link>
          </ul>
        </div>
      </nav>
     
    )
  }
}

export default Nav;