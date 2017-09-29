import React from 'react';
import axios from 'axios';
import { Link, Redirect} from 'react-router-dom';
import { Form, Button, FormControl, FormGroup } from 'react-bootstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false
    }
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  usernameChange(e) {
    this.setState({username: e.target.value})
  }

  passwordChange(e) {
    this.setState({password: e.target.value})
  }

  onLogin() {
    let username = this.state.username;
    let password = this.state.password;
    axios.get('/login', {params: {username, password}})
    .then((result) => {
      console.log('in login in  axios')
        if (result.data) {
          this.setState({
            loggedIn: true,
            password: ''
          })
        } else {
          this.setState({
            username: '',
            password: ''
          })
        }
      })
      .catch((err) => {
        console.error('is it this one?', err);
      })
  }

  render() {
    return (
      <div className="login">
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
        </Form>
        <Link to="/signup">
          <Button className="create-account" bsSize="lg" onClick={() => {<Redirect to="/signup" />}}>
            New Account
          </Button>
        </Link>
        <Button bsSize="lg" onClick={this.onLogin}>
          Login
        </Button>
        {this.state.loggedIn ? <Redirect to="/game" /> : <div></div>}
      </div>
    )
  }
};

export default Login;

