import React from 'react';
import { Switch, Route, BrowserRouter, DefaultRoute, Redirect, Link } from 'react-router-dom';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import Card from './Card.jsx';
import Game from './Game.jsx';
import Deal from './Deal.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="main">

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

export default App;
