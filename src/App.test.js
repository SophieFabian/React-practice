import { render, screen, fireEvent, getByText } from "@testing-library/react";
import App from "./App";
import Wordle from "./Wordle/Wordle";
import { shuffle } from "./Memory/index";

test("renders learn react link", () => {
  render(<App />);
  screen.logTestingPlaygroundURL();
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test.only("Wordle has title", () => {
  const wordle = render(<Wordle />);
  const header = screen.getByRole("heading");
  const header2 = screen.getByText("WORDLE");

  const board = wordle.container.querySelector(".board");
  // console.log("🚀 ~ file: App.test.js:18 ~ test.only ~ board:", board);
  expect(header).toHaveTextContent("WORDLE");
  expect(header2).toHaveTextContent("WORDLE");
  fireEvent.keyDown(board, { key: "A" });
  screen.logTestingPlaygroundURL();

  expect(aTile).toBeInTheDocument();
});
