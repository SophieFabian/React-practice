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
  const xWonHeader = "Player X's WON";
  const oWonHeader = "Player O's WON";

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
    if (winner === "") {
      const cell = Number(event.target.id);
      if (isXTurn) {
        const newXMoves = [...xMoves, cell];
        setXMoves(newXMoves);
        const didXWin = evaluate(newXMoves);
        if (evaluate(newXMoves)) {
          setWinner("X");
          setHeaderText(xWonHeader);
        } else {
          setIsXTurn(false);
          setHeaderText(xHeader);
        }
      } else {
        const newOMoves = [...oMoves, cell];
        setOMoves(newOMoves);
        if (evaluate(newOMoves)) {
          setWinner("O");
          setHeaderText(oWonHeader);
        } else {
          setIsXTurn(true);
          setHeaderText(oHeader);
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
      <button style={{ marginLeft: 500, marginTop: 24 }}>Reset</button>
    </>
  );
}
