import React from 'react';
import { Switch, Route, BrowserRouter, DefaultRoute, Redirect } from 'react-router-dom';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Card from './Card.jsx';
import Game from './Game.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
     
    };
  }
 
  render() {
    return (
      <div className="main">
        <h1 >Half-Wit Cards</h1>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/game' component={Game} />
          <Route path='/cards' component={Card} />
        </Switch>
      </div>
    );
  }
}

{/* <Card /> */}
export default App;
