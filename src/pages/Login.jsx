import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      redirect: false,
      email: '',
      password: '',
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
    this.handleLogin();
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
    this.handleLogin();
  }

  handleLogin() {
    const { email, password } = this.state;
    const passwordLength = 6;
    if (
      email.match(/((\w+)@(\w+)\.(\w+))/i)
      && password.length >= passwordLength
    ) {
      this.setState((value) => ({ active: !value }));
    }
  }

  handleClick() {
    const { email } = this.state;
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email }));
    this.setState({ redirect: true });
  }

  render() {
    const { active, redirect } = this.state;
    if (redirect) return <Redirect to="/comidas" />;
    return (
      <div>
        <h2>Login</h2>
        <label htmlFor="email">
          <input
            onChange={ this.handleEmail }
            type="text"
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          <input
            onChange={ this.handlePassword }
            type="password"
            data-testid="password-input"
          />
        </label>
        <button
          disabled={ active }
          data-testid="login-submit-btn"
          type="button"
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
