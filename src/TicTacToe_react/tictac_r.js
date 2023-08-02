import React, { useState, useEffect } from "react";

export default function TicTacToe() {
  const rows = [0, 1, 2];
  const cells = [0, 1, 2];
  const winnerStates = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const xHeader = "Player X's turn";
  const oHeader = "Player O's turn";
  const xWonHeader = "Player X WON";
  const oWonHeader = "Player O WON";

  const [xMoves, setXMoves] = useState([]);
  const [oMoves, setOMoves] = useState([]);
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState("");
  const [headerText, setHeaderText] = useState(xHeader);

  const Cell = ({ cellIndex }) => {
    const cellContent = xMoves.includes(cellIndex)
      ? "X"
      : oMoves.includes(cellIndex)
      ? "O"
      : ""; // or cellindex
    return (
      <div
        style={{
          width: "24px",
          height: "24px",
          margin: "8px",
          border: "2px solid grey",
          display: "flex",
          flexAlign: "center",
          justifyContent: "center",
        }}
        onClick={cellClickHandler}
        id={cellIndex}
      >
        {cellContent}
      </div>
    );
  };

  const cellClickHandler = (event) => {
    console.log("🚀 ~ file: tictac_r.js:54 ~ cellClickHandler ~ event:", event);
    const cell = Number(event.target.id);
    const lastMove = xMoves.length + oMoves.length === 8;
    if (winner === "") {
      if (isXTurn) {
        const newXMoves = [...xMoves, cell];
        setXMoves(newXMoves);
        if (evaluate(newXMoves)) {
          setWinner("X");
          setHeaderText(xWonHeader);
        } else {
          setIsXTurn(false);
          setHeaderText(!lastMove ? oHeader : "It's a tie");
        }
      } else {
        const newOMoves = [...oMoves, cell];
        setOMoves(newOMoves);
        if (evaluate(newOMoves)) {
          setWinner("O");
          setHeaderText(oWonHeader);
        } else {
          setIsXTurn(true);
          setHeaderText(!lastMove ? xHeader : "It's a tie");
        }
      }
    }
  };

  const evaluate = (moves) => {
    return winnerStates.some((state) =>
      state.every((cell) => moves.includes(cell))
    );
  };

  const Row = ({ rowIndex }) => {
    return (
      <div id="row1" style={{ display: "flex", flexDirection: "row" }}>
        {cells.map((cell) => (
          <Cell cellIndex={rowIndex * 3 + cell} key={rowIndex * 3 + cell} />
        ))}
      </div>
    );
  };

  return (
    <>
      <h1>{headerText}</h1>
      <h4 style={{ textAlign: "center" }}>
        Classic Tic Tac Toe, 2 players on 1 computer, show whose turn it is and
        declare the winner.
      </h4>
      <div
        id="board"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {rows.map((row) => {
          return <Row rowIndex={row} key={row} />;
        })}
      </div>
    </>
  );
}
