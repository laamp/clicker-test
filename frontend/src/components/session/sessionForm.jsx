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

    this.switchForms = this.switchForms.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  switchForms() {
    this.setState({
      name: "",
      email: "",
      password: "",
      password2: "",
      signingUp: !this.state.signingUp
    });

    this.props.clearSessionErrors();
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
            placeholder="Confirm your password"
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
        <ul>
          {Object.values(this.props.sessionErrors).map((err, i) => (
            <li key={`error-${i}`}>{err}</li>
          ))}
        </ul>
      </>
    );
  }

  render() {
    return (
      <>
        <button onClick={this.switchForms}>
          Switch to {this.state.signingUp ? "login" : "signup"}
        </button>
        {this.renderForm()}
        {this.renderErrors()}
      </>
    );
  }
}

export default SessionForm;
