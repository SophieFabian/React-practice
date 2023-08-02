import "./wStyles.css";
import React, { useEffect, useState } from "react";

const WORD_LIST_API_URL = "https://api.frontendexpert.io/api/fe/wordle-words";

export default function Wordle() {
  const MAX_GUESS = 6;
  const [solutionWord, setSolutionWord] = useState(null);
  const [actualWord, setActualWord] = useState("");
  const [guessedWords, setGuessedWords] = useState([]);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const handleKeyPress = ({ key, keyCode }) => {
      // console.log("handleKeyPress", key, keyCode);
      if (ended) {
        return;
      }
      if (keyCode === 13) {
        // console.log("GuessedWords", guessedWords, "ActualWord", actualWord);
        if (actualWord.length === 5) {
          if (guessedWords.length > 5 || actualWord === solutionWord) {
            setEnded(true);
            window.removeEventListener("keydown", handleKeyPress);
          }
          setGuessedWords([...guessedWords, actualWord]);
          setActualWord("");
        }
      } else if (keyCode === 8) {
        const newWord = actualWord.substring(0, actualWord.length - 1);
        setActualWord(newWord);
      } else if (keyCode > 64 && keyCode < 91) {
        const newWord =
          actualWord.length < 5 ? actualWord + key.toUpperCase() : actualWord;
        setActualWord(newWord);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    // Clean up event listeners
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [actualWord, guessedWords, solutionWord, ended]);

  useEffect(() => {
    // const fetchData = async () => {
    //   const response = await fetch(WORD_LIST_API_URL);
    //   const words = await response.json();
    // const index = Math.floor(Math.random() * words.length);
    setSolutionWord("INDEX");
    // console.log("WORD IS", words[index]);
    // };
    // fetchData().catch((error) => console.error(error));
  }, []);

  const tiles = [...Array(5).keys()];
  const lines = [...Array(MAX_GUESS).keys()];
  // console.log("🚀 ~ file: Wordle.js:48 ~ Wordle ~ lines:", lines);

  useEffect(() => {}, []);

  const getTileClass = (actual, solution, index) => {
    if (
      !actual ||
      actual === undefined ||
      index === undefined ||
      actual?.length < 1 ||
      !solution
    ) {
      return "";
    } else if (actual[index] === solution[index]) {
      return "correct";
    } else if (solution.indexOf(actual[index]) > -1) {
      return "close";
    } else if (actual[index] && solution.indexOf(actual[index]) === -1) {
      return "incorrect";
    }
  };

  return (
    <>
      <h1>WORDLE</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <ul>
          <li>Just start typing!</li>
          <li>
            Game follows the rules of the classic NYT wordle:
            <ul>
              <li>Start typing! (Yes, just start it!)</li>
              <li>
                You can add or delete letters, and after you filled a row, you
                can hit enter to reveal your luck.
              </li>
              <li>If the letter is grey, it's a miss.</li>
              <li>
                If the letter is yellow, it's a half hit: correct letter, wrong
                place.
              </li>
              <li>
                If the letter is grey, it's a hit: correct letter, correct
                place.
              </li>
              <li>You have 5 guesses.</li>
              <li style={{ color: "grey", fontSize: 10 }}>
                Khmmm.... there is no dictionary behind it, so you can type
                non-words too....
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="board">
        {lines.map((lineIndex) => {
          if (guessedWords.length === lineIndex) {
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
                  const tileClass = getTileClass(
                    lineWord,
                    solutionWord,
                    tileIndex
                  );
                  return (
                    <div
                      className={`tile ${tileClass}`}
                      key={`${lineIndex}_${tileIndex}`}
                    >
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
    </>
  );
}
