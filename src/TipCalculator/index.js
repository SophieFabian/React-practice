import "./style.css";

import React, { useState } from "react";

export default function TipCalculator() {
  const [bill, setBill] = useState(50);
  const [percent, setPercent] = useState(18);
  const [people, setPeople] = useState(1);

  const totalTip = (bill * percent) / 100;
  const personTip = totalTip / people;

  // console.log("bill", bill, typeof bill);
  // console.log("percent", percent);
  // console.log("people", people);
  // console.log("totalTip", totalTip);
  // console.log("personTip", personTip);

  const calculateTip = () => {
    return isNaN(personTip) || !(people > 0) ? "-" : `$${personTip.toFixed(2)}`;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: 17,
      }}
    >
      <h1>TIP CALCULATOR</h1>
      <ul>
        <li>
          Create a form with the bill sum, tip percentage and party size as
          input fields.
        </li>
        <li>
          As these inputs are entered, calculate the total tip and the tip per
          person on screen.
        </li>
        <li>If bill is zero ur undefined, tip should be 0.</li>
        <li>
          If persons are 0 or not definedm show "-" instead of the tip amount.
        </li>
      </ul>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <label
          htmlFor="bill"
          style={{ margin: "8px 0 4px 0", fontWeight: 600 }}
        >
          Bill
        </label>
        <input
          id="bill"
          min={0}
          type="number"
          placeholder={100}
          onChange={(event) => setBill(event.target.value)}
          value={bill}
          style={{ width: 300 }}
        />

        <label
          htmlFor="percent"
          style={{ margin: "8px 0 4px 0", fontWeight: 600 }}
        >
          Tip Percentage
        </label>
        <input
          id="percent"
          type="number"
          min={0}
          placeholder={0}
          onChange={(event) => setPercent(event.target.value)}
          value={percent}
          style={{ width: 300 }}
        />

        <label
          htmlFor="people"
          style={{ margin: "8px 0 4px 0", fontWeight: 600 }}
        >
          Number of People
        </label>
        <input
          id="people"
          type="number"
          min={1}
          placeholder={0}
          onChange={(event) => setPeople(event.target.value)}
          value={people}
          style={{ width: 300 }}
        />

        <p>
          <span style={{ fontWeight: 600 }}>Total Tip:</span>{" "}
          {`$${totalTip.toFixed(2)}`}
        </p>
        <p>
          <span style={{ fontWeight: 600 }}>Tip Per Person:</span>{" "}
          {calculateTip()}
        </p>
      </form>
    </div>
  );
}

// .toFixed(2)
