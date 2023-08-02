import "./style.css";

import React, { useState, useMemo, useEffect } from "react";

export const shuffle = (array) => {
  const shuffledArray = [...array];
  for (let index in shuffledArray) {
    const i = Number(index);
    const randomIndex = Math.floor(Math.random() * shuffledArray.length);
    [shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[i],
    ];
  }
  return shuffledArray;
};
const TILE_COLORS = ["red", "green", "blue", "yellow"];

export default function Memory() {
  const [tiles, setTiles] = useState();
  const [turnedUpColor, setTurnedUpColor] = useState(null);
  const [tilesUp, setTilesUp] = useState([]);
  const [freezeBoard, setFreezeBoard] = useState(false);
  const [usedColors, setUsedColors] = useState([]);

  useEffect(() => {
    setTiles(shuffle([...TILE_COLORS, ...TILE_COLORS]));
  }, []);

  const handleTileClick = (event) => {
    if (!freezeBoard) {
      const index = Number(event.target.id);
      const actualColor = tiles[index];
      // 1 tile turned up
      if (!turnedUpColor) {
        setTurnedUpColor(actualColor);
        setTilesUp([...tilesUp, index]);
        // a pair turned up
      } else if (turnedUpColor === actualColor) {
        setUsedColors([...usedColors, actualColor]);
        setTurnedUpColor(null);
        setTilesUp([]);
        // not a pair turned up
      } else {
        setTurnedUpColor(null);
        setTilesUp([...tilesUp, index]);
        setFreezeBoard(true);
        setTimeout(() => {
          setTilesUp([]);
          setFreezeBoard(false);
        }, 1000);
      }
    }
  };
  const restart = () => {
    // console.log("Restart");
    setUsedColors([]);
    setFreezeBoard(false);
    setTilesUp([]);
    setTurnedUpColor(null);
    setTiles(shuffle([...TILE_COLORS, ...TILE_COLORS]));
  };

  return (
    <div>
      <h3>Memory Game</h3>
      <ol>
        <li>You have 4 pairs of colored tiles.</li>
        <li>
          Colors are randomly associated with the tiles, and hidden at start.
        </li>
        <li>
          When you click on a tile, it "turns" (colored to the associated
          color).
        </li>
        <li>
          When you click on a 2nd tile,{" "}
          <ul>
            <li>if it matches the 1st upturned tile, it stays that way</li>
            <li> otherwise they stay for a second and then turn back.</li>
          </ul>
        </li>
        <li>You win when all tiles are turned up.</li>
        <li>You can restart after you won.</li>
      </ol>
      <h1>{usedColors.length !== 4 ? "Memory" : "You Won!"}</h1>
      <div className="memoryBoard">
        {tiles &&
          tiles.map((tile, index) => {
            const upTurned =
              usedColors.includes(tiles[index]) || tilesUp.includes(index);
            return (
              <div
                className={`memoryTile ${upTurned ? tiles[index] : ""}`}
                key={`tile_${index}`}
                id={index}
                onClick={handleTileClick}
              ></div>
            );
          })}
      </div>
      <button
        disabled={usedColors.length !== 4}
        onClick={restart}
        className={
          usedColors.length == 4
            ? "memoryBoardButton"
            : "disabledMemoryBoardButton"
        }
      >
        Restart
      </button>
    </div>
  );
}
