import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Wordle from "./Wordle/Wordle";
import TicTacToe from "./TicTacToe_react/tictac_r";
import TipCalculator from "./TipCalculator/index";
import Memory from "./Memory/index";
import Timer from "./Timer/index";
import ClosedList, { items } from "./Closed-list/ClosedList";
import PhoneInput from "./PhoneNumber/phone";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ClosedList items={items} />
    <hr />
    <PhoneInput />
    <hr />
    <Timer />
    <hr />
    <Memory />
    <hr />
    <Wordle />
    <hr />
    <TipCalculator /> <hr />
    <TicTacToe /> <hr />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
