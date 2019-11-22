import React from "react";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentScore: 0
    };
  }

  componentDidMount() {
    this.props.getPlayerProgress(this.props.authenticatedPlayer.id);
  }

  renderGameboard() {
    return (
      <div className="gameboard-container">
        <div>Tile 01</div>
        <div>Tile 02</div>
        <div>Tile 03</div>
        <div>Tile 04</div>
        <div>Tile 05</div>
        <div>Tile 06</div>
      </div>
    );
  }

  render() {
    if (!this.props.currentPlayer) return null;

    return <>{this.renderGameboard()}</>;
  }
}

export default Game;
