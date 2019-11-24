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
      progressBars: [0, 0, 0, 0, 0],
      lastLoggedIn: null,
      loginMoney: null
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
    this.profitPerSecond = 0;
    // end of global game vars

    this.autosave = this.autosave.bind(this);
    this.onExit = this.onExit.bind(this);
    this.calculateProfitPerSecond = this.calculateProfitPerSecond.bind(this);
  }

  componentDidMount() {
    // populate game component's state with loaded player progress
    // also setup autosave once progress has been grabbed
    this.props.getPlayerProgress(this.props.authenticatedPlayer.id).then(() => {
      const timeElapsed =
        (Date.now() - this.props.currentPlayer.lastLoggedIn) / 1000;

      const id = setInterval(this.autosave, this.autosaveFreq);

      this.setState(
        {
          score: this.props.currentPlayer.score,
          businesses: this.props.currentPlayer.businesses,
          managers: this.props.currentPlayer.managers,
          autosaveId: id,
          lastLoggedIn: this.props.currentPlayer.lastLoggedIn
        },
        () => {
          this.startManagedBusinesses();
          this.props.getLeaderboard();

          if (timeElapsed > 10) {
            const earnings = timeElapsed * this.calculateProfitPerSecond();
            if (earnings > 0) {
              this.setState({ loginMoney: Math.floor(earnings) });
            }
          }
        }
      );

      window.addEventListener("beforeunload", this.onExit);
    });
  }

  componentDidUpdate() {
    this.startManagedBusinesses();
  }

  componentWillUnmount() {
    this.onExit();
  }

  onExit() {
    clearInterval(this.state.autosaveId);
    this.progressBarIds.forEach(id => clearInterval(id));
    this.autosave();
  }

  autosave() {
    let leftoverMoney = 0;
    if (this.state.loginMoney) leftoverMoney += this.state.loginMoney;

    this.setState(
      { lastLoggedIn: Date.now(), score: this.state.score + leftoverMoney },
      () => {
        this.props.clearGameErrors();
        this.props.savePlayerState(
          this.props.authenticatedPlayer.id,
          this.state
        );
      }
    );
  }

  startManagedBusinesses() {
    this.state.managers.forEach((purchased, i) => {
      if (purchased && this.state.businesses[i] > 0) {
        this.startCollectTimer(i);
      }
    });
  }

  purchaseBusiness(idx) {
    if (this.state.score < this.calculatePurchaseCost(idx)) return;

    let temp = Object.values(Object.assign({}, this.state.businesses));
    temp[idx]++;
    this.setState(
      {
        businesses: temp,
        score: this.state.score - this.calculatePurchaseCost(idx)
      },
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
    return this.baseCosts[idx] * (this.state.businesses[idx] + 1);
  }

  calculateProfit(idx) {
    let profit = this.baseProfit[idx] * this.state.businesses[idx];

    return profit;
  }

  calculateProfitPerSecond() {
    let pps = 0;

    this.state.managers.forEach((purchased, i) => {
      if (purchased) {
        pps += this.calculateProfit(i) / (this.baseTimers[i] / 1000);
      }
    });

    return pps;
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

  renderEarningsPopup() {
    if (this.state.loginMoney) {
      return (
        <div className="scrim">
          <div className="earnings-modal">
            <h2>You earned {this.state.loginMoney} while you were away!</h2>
            <button
              onClick={() => {
                this.setState(
                  {
                    score: this.state.score + this.state.loginMoney,
                    loginMoney: null
                  },
                  this.autosave
                );
              }}
            >
              Collect!
            </button>
          </div>
        </div>
      );
    }
  }

  renderGameboard() {
    return (
      <div className="gameboard-container">
        <ul className="gameboard">
          <h3 className="gameboard-score">Bits: {this.state.score}</h3>
          {this.state.businesses.map((business, i) => (
            <li key={`business-${i}`}>
              {`${this.businessNames[i]} -- lvl ${business}`}
              <button
                className="buy-button"
                onClick={() => this.purchaseBusiness(i)}
              >
                Buy for {this.calculatePurchaseCost(i)}
              </button>
              {this.state.businesses[i] > 0 && !this.state.managers[i] ? (
                <button
                  className="collect-button"
                  onClick={() => this.startCollectTimer(i)}
                >
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
                  <button
                    className="buy-manager"
                    onClick={() => this.purchaseManager(i)}
                  >
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

    return (
      <>
        {this.renderEarningsPopup()}
        {this.renderGameboard()}
      </>
    );
  }
}

export default Game;
