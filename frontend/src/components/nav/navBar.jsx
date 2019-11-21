import React from "react";

class NavBar extends React.Component {
  componentDidMount() {
    console.log(this.props.state);
  }

  render() {
    return (
      <>
        <p>This is your nav bar.</p>
        {this.props.loggedIn ? (
          <p>Hello, PLAYERNAME "logout goes here"</p>
        ) : (
          <p>Please log in to play</p>
        )}
      </>
    );
  }
}

export default NavBar;
