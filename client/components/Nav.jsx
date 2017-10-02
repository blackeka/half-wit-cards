import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.refreshPage = this.refreshPage.bind(this);
  }


  refreshPage() { 
    window.location.reload(); 
  }  

  render() {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/game"> Half-Wit Cards</Link>
          </div>
          <ul className="nav navbar-nav">
            <li><Link to="/cards">Shuffle</Link></li><br />
            <li className="new-game"><a onClick={this.refreshPage}>New Game</a></li>
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