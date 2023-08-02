import React, { useState, useEffect } from "react";

const PersistedCounter = () => {
  const [count, setCount] = useState(
    Number(sessionStorage.getItem("myCounter")) || 0
    // Number(localStorage.getItem("myCounter")) || 0
  );

  const Counter = ({ count }) => {
    return <div style={{ margin: "8px" }}>Counter: {count}</div>;
  };

  const Button = ({ text, offset }) => {
    return (
      <button
        onClick={() => setCount((prev) => prev + offset)}
        style={{ margin: "8px" }}
      >
        {text}
      </button>
    );
  };

  useEffect(() => {
    sessionStorage.setItem("myCounter", count);
  }, [count]);

  // useEffect(() => {
  //   localStorage.setItem("myCounter", count);
  // }, [count]);

  return (
    <div>
      <h3>Implement and persist a counter</h3>
      <ol>
        <li>There is a counter showing the current count.</li>
        <li>There is an increase and a decrease button.</li>
        <li>
          Make sure that the counter says the same when you refresh the page.
        </li>
        <li>
          Make sure that if you open the counter in diffent tabs, the states of
          the 2 separate counters do not interfere with each other.
        </li>
      </ol>
      <Counter count={count} />
      <Button text="Increase" offset={1} />
      <Button text="Decrease" offset={-1} />
    </div>
  );
};

export default PersistedCounter;
