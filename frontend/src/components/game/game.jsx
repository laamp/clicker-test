import React from "react";
import ProgressBar from "./progressBar/progressBar";
import globals from "../../game/globalVars";

import "../../styles/game.scss";
import Cubit from "./cubit/cubit";

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

    this.progressBarIds = [null, null, null, null, null];

    this.autosave = this.autosave.bind(this);
    this.onExit = this.onExit.bind(this);
    this.calculateProfitPerSecond = this.calculateProfitPerSecond.bind(this);
    this.collectEarnings = this.collectEarnings.bind(this);
  }

  componentDidMount() {
    // populate game component's state with loaded player progress
    this.props.getPlayerProgress(this.props.authenticatedPlayer.id).then(() => {
      // calc time since last log in
      const timeElapsed =
        (Date.now() - this.props.currentPlayer.lastLoggedIn) / 1000;

      // start autosaving feature
      const id = setInterval(this.autosave, globals.autosaveFreq);

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

          // if player has been gone long enough and earned money show modal
          if (timeElapsed > 10) {
            const earnings = timeElapsed * this.calculateProfitPerSecond();
            if (earnings > 0) {
              this.setState({ loginMoney: Math.floor(earnings) });
            }
          }
        }
      );

      // listen for leaving page and clean up
      window.addEventListener("beforeunload", this.onExit);
    });
  }

  componentDidUpdate() {
    // start collecting if player buys a manager
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
    // collect money if save happens and player hasn't collected
    this.collectEarnings();

    this.setState({ lastLoggedIn: Date.now() }, () => {
      this.props.clearGameErrors();
      this.props.savePlayerState(this.props.authenticatedPlayer.id, this.state);
    });
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
    if (this.state.score < globals.managerCosts[idx]) return;

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
        score: this.state.score - globals.managerCosts[idx]
      },
      this.autosave
    );
  }

  calculatePurchaseCost(idx) {
    return globals.baseCosts[idx] * (this.state.businesses[idx] + 1);
  }

  calculateProfit(idx) {
    let profit = globals.baseProfit[idx] * this.state.businesses[idx];

    return profit;
  }

  // used to determine earnings upon player returning
  calculateProfitPerSecond() {
    let pps = 0;

    this.state.managers.forEach((purchased, i) => {
      if (purchased) {
        pps += this.calculateProfit(i) / (globals.baseTimers[i] / 1000);
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
            return bar + 1000 / globals.baseTimers[idx];
          } else {
            return bar;
          }
        });

        return { progressBars: newBars, score: this.state.score + points };
      });
    }, 10);
  }

  collectEarnings() {
    if (this.state.loginMoney) {
      this.setState(
        {
          score: this.state.score + this.state.loginMoney,
          loginMoney: null
        },
        this.autosave
      );
    }
  }

  renderEarningsPopup() {
    if (this.state.loginMoney) {
      return (
        <div className="scrim">
          <div className="earnings-modal">
            <h1>Welcome Back!</h1>
            <h2>You earned {this.state.loginMoney} while you were away!</h2>
            <button onClick={this.collectEarnings}>Collect!</button>
          </div>
        </div>
      );
    }
  }

  renderBusinesses() {
    return this.state.businesses.map((business, i) => (
      <li key={`business-${i}`}>
        <Cubit color={globals.cubitColors[i]} speed={globals.cubitSpeed[i]} />
        {`${globals.businessNames[i]} -- lvl ${business}`}
        <button className="buy-button" onClick={() => this.purchaseBusiness(i)}>
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
    ));
  }

  renderManagers() {
    return this.state.managers.map((purchased, i) => {
      if (!purchased) {
        return (
          <li key={`manager-${i}`}>
            <button
              className="buy-manager"
              onClick={() => this.purchaseManager(i)}
            >
              Hire {globals.managerNames[i]} for {globals.managerCosts[i]}
            </button>
          </li>
        );
      } else {
        return null;
      }
    });
  }

  renderGameboard() {
    return (
      <div className="gameboard-container">
        <ul className="gameboard">
          <h3 className="gameboard-score">Bits: {this.state.score}</h3>
          {this.renderBusinesses()}
        </ul>
        <ul className="gameboard-managers">
          <h3>Hackers for hire</h3>
          {this.renderManagers()}
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
