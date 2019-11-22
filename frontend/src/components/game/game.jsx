import React from "react";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      businesses: [],
      managers: []
    };

    this.waitTimers = [1000, 3000, 10000, 30000, 60000];

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
    // populate game component's state with loaded player progress
    this.props.getPlayerProgress(this.props.authenticatedPlayer.id).then(() => {
      this.setState({
        score: this.props.currentPlayer.score,
        businesses: this.props.currentPlayer.businesses,
        managers: this.props.currentPlayer.managers
      });
    });
  }

  purchaseBusiness(idx) {
    let temp = Object.values(Object.assign({}, this.state.businesses));
    temp[idx]++;
    this.setState({ businesses: temp }, () => {
      this.props.savePlayerState(this.props.authenticatedPlayer.id, this.state);
    });
  }

  renderGameboard() {
    return (
      <div className="gameboard-container">
        <p className="gameboard-score">Bits: {this.state.score}</p>
        <ul className="gameboard-businesses">
          {this.state.businesses.map((business, i) => (
            <li key={`business-${i}`}>
              {business}
              <button onClick={() => this.purchaseBusiness(i)}>Buy 1</button>
              <button>Collect</button>
            </li>
          ))}
          <button onClick={this.debugGameState}>DEBUG</button>
        </ul>
      </div>
    );
  }

  render() {
    if (!this.props.currentPlayer) return null;

    return <>{this.renderGameboard()}</>;
  }
}

export default Game;
