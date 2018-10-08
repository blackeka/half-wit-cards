import React from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import {Navbar, Jumbotron, Button, Form, FormControl, FormGroup} from 'react-bootstrap';

//TODO add a tutorial page
class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      message:'',
      loggedIn: false
    }
    this.checkCredentials = this.checkCredentials.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
  }

  usernameChange (e) {
    this.setState({
      username: e.target.value
    })
  }

  passwordChange (e) {
    this.setState({
      password: e.target.value
    })
  }

  checkCredentials () {
    let username = this.state.username;
    let password = this.state.password;
    if (username.length > 0 && password.length > 0) {
      axios.post('/signup', {username, password})
        .then((result) => {
          if (result.data) {
            this.setState({
              loggedIn: true,
              password: ''
            });
          } else {
            this.setState({
              username: '',
              password: ''
            });
          }
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      this.setState({
        message:'Something went wrong try again.'
      })
    }
  }

  
  render() {
    return(
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/login"> Half-Wit Cards</Link>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Jumbotron className="login">
          <Form >
            <FormGroup controlId="name">
              <FormControl
                type="text"
                value={this.state.username}
                placeholder="username"
                onChange={this.usernameChange}
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="name">
              <FormControl
                type="password"
                value={this.state.password}
                placeholder="password"
                onChange={this.passwordChange}
              />
              <FormControl.Feedback />
            </FormGroup>
            <Button type="submit" value="Submit" onClick={this.checkCredentials}>Create Account</Button><br/>
            {this.state.message ? <p>{this.state.message}</p> : <div></div>}
          </Form>
          {this.state.loggedIn ? <Redirect to="/game" /> : <div></div>}
        </Jumbotron>
      </div>
      )
  }
};

export default Signup;
