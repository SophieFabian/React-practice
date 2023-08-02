import React, { useState, useEffect } from "react";

const PersistedCounter = () => {
  const [count, setCount] = useState(
    Number(sessionStorage.getItem("myCounter")) || 0
    // Number(localStorage.getItem("myCounter")) || 0
  );
  // const num = 0;

  const Counter = ({ count }) => {
    return <div>Counter: {count}</div>;
  };

  useEffect(() => {
    sessionStorage.setItem("myCounter", count);
  }, [count]);

  // useEffect(() => {
  //   localStorage.setItem("myCounter", count);
  // }, [count]);

  const Button = ({ text, offset }) => {
    return <button onClick={() => setCount(count + offset)}>{text}</button>;
  };

  return (
    <div>
      <Counter count={count} />
      <Button text="Increase" offset={1} />
      <Button text="Decrease" offset={-1} />
    </div>
  );
};

export default PersistedCounter;
