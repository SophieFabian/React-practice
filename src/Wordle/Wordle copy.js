import "./wStyles.css";
import React, { useEffect, useState } from "react";

const WORD_LIST_API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";

export default function Wordle() {
  const MAX_GUESS = 6;
  const [solutionWord, setSolutionWord] = useState(null);
  const [actualWord, setActualWord] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);
  const [fired, setFired] = useState(false);
  useEffect(() => {
    const handleKeyPress = ({ key, keyCode }) => {
      setFired(true);
      // console.log("🚀 handleKeyPress ~ keyCode:", keyCode);
      setActualWord((prevWord) => {
        if (keyCode === 13) {
          if (prevWord.length === 5) {
            setGuessedWords((prevWords) => {
              if (prevWords && prevWords[prevWords.length - 1] !== prevWord) {
                const newWords = [...prevWords, prevWord];
                return newWords;
              } else {
                return prevWords;
              }
            });
            return "";
          } else {
            return prevWord;
          }
        } else if (keyCode === 8) {
          const newWord = prevWord.substring(0, prevWord.length - 1);
          return newWord;
        } else if (keyCode > 64 && keyCode < 91) {
          return prevWord.length < 5 ? prevWord + key.toUpperCase() : prevWord;
        }
      });
    };
  }, [solutionWord]);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", setFired(false));
    setSolutionWord("INDEX");
  }, []);

  const tiles = [...Array(5).keys()];
  const lines = [...Array(MAX_GUESS).keys()];

  useEffect(() => {}, []);

  return (
    <div className="board">
      {solutionWord === guessedWords[guessedWords.length - 1] && (
        <div>YOU WIN</div>
      )}
      <div>{solutionWord}</div>
      <div>{actualWord}</div>
      <div>{guessedWords}</div>
      {solutionWord !== guessedWords[guessedWords.length - 1] &&
        guessedWords.length >= 6 && <div>YOU LOST</div>}
      {guessedWords.length < 6 &&
        lines.map((lineIndex) => {
          if (guessedWords.length == lineIndex) {
            return (
              <div className="line" key={lineIndex} id={lineIndex}>
                {tiles.map((tileIndex) => {
                  return (
                    <div className="tile" key={`${lineIndex}_${tileIndex}`}>
                      {actualWord[tileIndex]}
                    </div>
                  );
                })}
              </div>
            );
          } else if (guessedWords && lineIndex < guessedWords.length) {
            const lineWord = guessedWords[lineIndex];
            return (
              <div className="line" key={lineIndex} id={lineIndex}>
                {tiles.map((tileIndex) => {
                  return (
                    <div className="tile" key={`${lineIndex}_${tileIndex}`}>
                      {lineWord[tileIndex]}
                    </div>
                  );
                })}
              </div>
            );
          } else {
            return (
              <div className="line" key={lineIndex} id={lineIndex}>
                {tiles.map((tileIndex) => {
                  return (
                    <div
                      className="tile"
                      key={`${lineIndex}_${tileIndex}`}
                    ></div>
                  );
                })}
              </div>
            );
          }
        })}
    </div>
  );
}
