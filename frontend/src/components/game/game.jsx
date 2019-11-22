import React from "react";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      businesses: [],
      managers: []
    };

    this.debugGameState = this.debugGameState.bind(this);
  }

  debugGameState() {
    this.setState(
      {
        score: 123,
        businesses: [9, 7, 5, 3, 1],
        managers: [true, false, false, false, false]
      },
      () => {
        this.props.savePlayerState(
          this.props.authenticatedPlayer.id,
          this.state
        );
      }
    );
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
        <button onClick={this.debugGameState}>DEBUG</button>
      </div>
    );
  }

  render() {
    if (!this.props.currentPlayer) return null;

    return <>{this.renderGameboard()}</>;
  }
}

export default Game;
