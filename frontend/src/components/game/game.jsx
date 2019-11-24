import React from "react";
import ProgressBar from "./progressBar/progressBar";

import "../../styles/game.scss";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      businesses: [],
      managers: [],
      autosaveId: null,
      progressBars: [0, 0, 0, 0, 0]
    };

    // global game vars
    this.baseCosts = [1, 10, 1000, 100000, 1000000];
    this.baseTimers = [1000, 3000, 10000, 30000, 60000];
    this.baseProfit = [1, 2, 4, 16, 24];
    this.businessNames = [
      "Bytes",
      "Kilobytes",
      "Megabytes",
      "Gigabytes",
      "Terabytes"
    ];

    this.managerCosts = [25, 100, 10000, 100000, 1000000];
    this.managerNames = [
      "Cereal Killer",
      "Lord Nikon",
      "Zer0 Cool",
      "Acid Burn",
      "Joey"
    ];

    this.businessIds = [null, null, null, null, null];
    this.progressBarIds = [null, null, null, null, null];

    this.autosaveFreq = 20000;
    // end of global game vars

    this.autosave = this.autosave.bind(this);
    this.onExit = this.onExit.bind(this);
  }

  componentDidMount() {
    // populate game component's state with loaded player progress
    // also setup autosave once progress has been grabbed
    this.props.getPlayerProgress(this.props.authenticatedPlayer.id).then(() => {
      const id = setInterval(this.autosave, this.autosaveFreq);

      this.setState(
        {
          score: this.props.currentPlayer.score,
          businesses: this.props.currentPlayer.businesses,
          managers: this.props.currentPlayer.managers,
          autosaveId: id
        },
        this.startManagedBusinesses
      );

      window.addEventListener("beforeunload", this.onExit);
    });
  }

  componentDidUpdate() {
    this.startManagedBusinesses();
  }

  componentWillUnmount() {
    clearInterval(this.state.autosaveId);
    this.progressBarIds.forEach(id => clearInterval(id));
  }

  onExit() {
    clearInterval(this.state.autosaveId);
    this.autosave();
  }

  autosave() {
    this.props.clearGameErrors();
    this.props.savePlayerState(this.props.authenticatedPlayer.id, this.state);
  }

  startManagedBusinesses() {
    this.state.managers.forEach((purchased, i) => {
      if (purchased) this.startCollectTimer(i);
    });
  }

  purchaseBusiness(idx) {
    if (this.state.score < this.baseCosts[idx]) return;

    let temp = Object.values(Object.assign({}, this.state.businesses));
    temp[idx]++;
    this.setState(
      { businesses: temp, score: this.state.score - this.baseCosts[idx] },
      this.autosave
    );
  }

  purchaseManager(idx) {
    if (this.state.score < this.managerCosts[idx]) return;

    const newManagers = this.state.managers.map((purchased, i) => {
      if (i === idx) {
        return true;
      } else {
        return purchased;
      }
    });

    this.setState(
      {
        managers: newManagers,
        score: this.state.score - this.managerCosts[idx]
      },
      this.autosave
    );
  }

  calculatePurchaseCost(idx) {
    return this.baseCosts[idx];
  }

  calculateProfit(idx) {
    return this.baseProfit[idx];
  }

  startCollectTimer(idx) {
    if (this.progressBarIds[idx]) return;

    this.progressBarIds[idx] = setInterval(() => {
      this.setState(() => {
        let points = 0;

        const newBars = this.state.progressBars.map((bar, j) => {
          if (j === idx) {
            // if bar is full collect money and reset
            if (bar >= 100) {
              // stop interval if player doesn't have the manager
              if (!this.state.managers[idx]) {
                clearInterval(this.progressBarIds[idx]);
                this.progressBarIds[idx] = null;
              }

              points = this.calculateProfit(j);
              return 0;
            }
            return bar + 1000 / this.baseTimers[idx];
          } else {
            return bar;
          }
        });

        return { progressBars: newBars, score: this.state.score + points };
      });
    }, 10);
  }

  renderGameboard() {
    return (
      <div className="gameboard-container">
        <ul className="gameboard">
          <h3 className="gameboard-score">Bits: {this.state.score}</h3>
          {this.state.businesses.map((business, i) => (
            <li key={`business-${i}`}>
              {`${this.businessNames[i]}: ${business}`}
              <button onClick={() => this.purchaseBusiness(i)}>
                Buy for {this.calculatePurchaseCost(i)}
              </button>
              {this.state.businesses[i] > 0 ? (
                <button onClick={() => this.startCollectTimer(i)}>
                  Collect
                </button>
              ) : null}
              <ProgressBar progress={this.state.progressBars[i]} />
            </li>
          ))}
        </ul>
        <ul className="gameboard-managers">
          <h3>Managers for hire</h3>
          {this.state.managers.map((purchased, i) => {
            if (!purchased) {
              return (
                <li key={`manager-${i}`}>
                  <button onClick={() => this.purchaseManager(i)}>
                    Hire {this.managerNames[i]} for {this.managerCosts[i]}
                  </button>
                </li>
              );
            } else {
              return null;
            }
          })}
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
