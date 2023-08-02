import { useEffect, useState } from "react";

export default function PhoneInput() {
  // Write your code here.
  const [phone, setPhone] = useState("");

  const typePhone = (event) => {
    setPhone(phoneFormat(event.target.value));
  };
  console.log(phone, phone.length);

  return (
    <>
      <h3>Implement a phone number input field</h3>
      <ol>
        <li>Correct format is (123) 456-7890</li>
        <li>Let there be a placeholder in correct format.</li>
        <li>
          Make sure that you can only type numbers, and they appear in correct
          format.
        </li>
        <li>
          Make sure that when you delete characters, phone number keeps its
          format.
        </li>
        <li>Submit button is disabled until you have a valid phone number.</li>
      </ol>
      <input
        type="tel"
        onChange={typePhone}
        value={phone}
        placeholder="(555) 555-5555"
      />
      <button disabled={phone.length < 14}>Submit</button>
    </>
  );
}

const phoneFormat = (str) => {
  const stringArray = str.replace(/\D/g, "").split("");
  if (stringArray.length > 0) {
    stringArray.unshift("(");
  }
  if (stringArray.length > 4) {
    stringArray.splice(4, 0, ") ");
  }

  if (stringArray.length > 8) {
    stringArray.splice(8, 0, "-");
  }
  if (stringArray.length > 13) {
    stringArray.splice(13);
  }
  return stringArray.join("");
};
