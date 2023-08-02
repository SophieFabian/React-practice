import { useEffect, useState } from "react";

export default function PhoneInput() {
  // Write your code here.
  const [phone, setPhone] = useState("");

  const typePhone = (event) => {
    setPhone(phoneFormat(event.target.value));
  };
  // console.log(phone);

  return (
    <>
      <input
        type="tel"
        onChange={typePhone}
        value={phone}
        placeholder="(555) 555-5555"
      />
      <button>Submit</button>
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
