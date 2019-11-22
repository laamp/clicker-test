import React from "react";

class Leaderboard extends React.Component {
  componentDidMount() {
    this.props.getLeaderboard();
  }

  render() {
    if (!this.props.leaderboard) return null;

    return (
      <div className="leaderboard">
        <h3>Leaderboard</h3>
        <ul>
          {this.props.leaderboard.map((player, i) => (
            <li key={`leader-${i}`}>
              <div>{player.name}</div>
              <div>{player.score}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Leaderboard;
