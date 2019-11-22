import React from "react";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      businesses: [],
      managers: [],
      autosaveId: null
    };

    // global game constants
    this.baseTimers = [1000, 3000, 10000, 30000, 60000];
    this.baseProfit = [1, 2, 4, 8, 12];
    this.autosaveFreq = 10000;

    this.debugGameState = this.debugGameState.bind(this);
    this.autosave = this.autosave.bind(this);
    this.onExit = this.onExit.bind(this);
  }

  // remove this later
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
    // also setup autosave once progress has been grabbed
    this.props.getPlayerProgress(this.props.authenticatedPlayer.id).then(() => {
      const id = setInterval(this.autosave, this.autosaveFreq);

      this.setState({
        score: this.props.currentPlayer.score,
        businesses: this.props.currentPlayer.businesses,
        managers: this.props.currentPlayer.managers,
        autosaveId: id
      });

      window.addEventListener("beforeunload", this.onExit);
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.autosaveId);
  }

  onExit() {
    clearInterval(this.state.autosaveId);
    this.autosave();
  }

  autosave() {
    this.props.clearGameErrors();
    this.props.savePlayerState(this.props.authenticatedPlayer.id, this.state);
  }

  purchaseBusiness(idx) {
    let temp = Object.values(Object.assign({}, this.state.businesses));
    temp[idx]++;
    this.setState({ businesses: temp }, () => this.autosave());
  }

  collectProfit(idx) {
    this.setState({
      score: this.state.score + this.baseProfit[idx]
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
          {/* Remove this button later */}
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
