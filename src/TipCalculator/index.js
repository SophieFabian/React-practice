import "./style.css";

import React, { useState } from "react";

export default function TipCalculator() {
  const [bill, setBill] = useState(50);
  const [percent, setPercent] = useState(18);
  const [people, setPeople] = useState(1);

  const totalTip = (bill * percent) / 100;
  const personTip = totalTip / people;

  console.log("bill", bill, typeof bill);
  console.log("percent", percent);
  console.log("people", people);
  console.log("totalTip", totalTip);
  console.log("personTip", personTip);

  const calculateTip = () => {
    return isNaN(personTip) || !(people > 0) ? "-" : `$${personTip.toFixed(2)}`;
  };

  return (
    <div>
      <h1>TIP CALCULATOR</h1>
      <form>
        <label htmlFor="bill">Bill</label>
        <input
          id="bill"
          min={0}
          type="number"
          placeholder={50}
          onChange={(event) => setBill(event.target.value)}
          value={bill}
        />
        <label htmlFor="percent">Tip Percentage</label>
        <input
          id="percent"
          type="number"
          min={0}
          placeholder={18}
          onChange={(event) => setPercent(event.target.value)}
          value={percent}
        />
        <label htmlFor="people">Number of People</label>
        <input
          id="people"
          type="number"
          min={1}
          placeholder={1}
          onChange={(event) => setPeople(event.target.value)}
          value={people}
        />
        <p>Total Tip: {`$${totalTip.toFixed(2)}`}</p>
        <p>Tip Per Person: {calculateTip()}</p>
      </form>
    </div>
  );
}

// .toFixed(2)
