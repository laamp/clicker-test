import React from "react";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      signingUp: true
    };

    this.submitForm = this.submitForm.bind(this);
  }

  updateForm(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  submitForm(e) {
    e.preventDefault();

    if (this.state.signingUp) {
      let newPlayer = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      };

      this.props.signup(newPlayer);
    } else {
      let player = {
        email: this.state.email,
        password: this.state.password
      };

      this.props.login(player);
    }

    this.setState({
      name: "",
      email: "",
      password: "",
      password2: ""
    });
  }

  renderForm() {
    if (this.state.signingUp) {
      return (
        <form onSubmit={this.submitForm}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.updateForm("name")}
            placeholder="Your name here"
          />
          <input
            type="email"
            value={this.state.email}
            onChange={this.updateForm("email")}
            placeholder="Email address (you@email.com)"
          />
          <input
            type="password"
            value={this.state.password}
            onChange={this.updateForm("password")}
            placeholder="Create a password"
          />
          <input
            type="password"
            value={this.state.password2}
            onChange={this.updateForm("password2")}
            placeholder="Type it again"
          />
          <input type="submit" value="Create account" />
        </form>
      );
    } else {
      return (
        <form onSubmit={this.submitForm}>
          <input
            type="email"
            value={this.state.email}
            onChange={this.updateForm("email")}
            placeholder="Email address (you@email.com)"
          />
          <input
            type="password"
            value={this.state.password}
            onChange={this.updateForm("password")}
            placeholder="Enter your password"
          />
          <input type="submit" value="Sign in" />
        </form>
      );
    }
  }

  renderErrors() {
    return (
      <>
        <p>errors go here</p>
      </>
    );
  }

  render() {
    return (
      <>
        <p>This is your session form.</p>
        <button
          onClick={() => this.setState({ signingUp: !this.state.signingUp })}
        >
          Switch to {this.state.signingUp ? "login" : "signup"}
        </button>
        {this.renderForm()}
        {this.renderErrors()}
      </>
    );
  }
}

export default SessionForm;
