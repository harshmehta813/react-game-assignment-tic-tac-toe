import React, { useState } from "react";
import { calculateWinner } from "./Winner";
import Grid from "./Grid";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "X" : "O";

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    if (winner || squares[i]) return;
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const reset = () =>
    history.map(() => {
      return (
        <div className="goto-btn">
          <button onClick={() => jumpTo(0)}>RESET</button>
        </div>
      );
    });

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className="main">
        <Grid squares={history[stepNumber]} onClick={handleClick} />
      </div>
      <div className="info-wrapper">
        <button onClick={() => jumpTo(0)}>RESET</button>
        <h3>
          {winner
            ? "Winner: " + winner
            : stepNumber < 9
            ? "Next Player: " + xO
            : "Draw"}
        </h3>
      </div>
    </>
  );
};

export default Game;
