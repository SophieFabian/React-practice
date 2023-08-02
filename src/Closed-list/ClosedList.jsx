import React, { useState, memo } from "react";
import "./closed-list.css";

// Implement a feature to allow item selection with the following requirements:
// 1. Clicking an item selects/unselects it.
// 2. Multiple items can be selected at a time.
// 3. Make sure to avoid unnecessary re-renders of each list item in the big list (performance).
// 4. Currently selected items should be visually highlighted.
// 5. Currently selected items' names should be shown at the top of the page.
//
// Feel free to change the component structure at will.

export default function ClosedList({ items }) {
  const [highlightedElements, setHighlightedElements] = useState(new Set());

  const selectItem = (name) => {
    if (!highlightedElements.has(name)) {
      setHighlightedElements((prevSet) => new Set([...prevSet, name]));
    } else {
      setHighlightedElements((prevSet) => {
        const newSet = new Set(prevSet);
        newSet.delete(name);
        return newSet;
      });
    }
  };

  return (
    <>
      <SelectedApples highlightedElements={highlightedElements} />
      <ul className="List" key="colored-apples-list">
        {items.map((item, index) => {
          const { name, color } = item;
          return (
            <ListItemMemo
              key={index}
              name={name}
              color={color}
              selectItem={() => selectItem(name)}
              highLighted={!!highlightedElements.has(name)}
            />
          );
        })}
      </ul>
    </>
  );
}

const SelectedApples = ({ highlightedElements }) => {
  return (
    <div className="SelectedApples">{[...highlightedElements].join(", ")}</div>
  );
};

function arePropsEqual(prevProps, nextProps) {
  return prevProps.highLighted === nextProps.highLighted;
}

const ListItem = ({ name, color, selectItem, highLighted }) => {
  console.log("rerender list item", name);

  return (
    <li
      key={name}
      className={`List__item List__item--${color} ${
        highLighted ? "Highlighted" : ""
      }`}
      onClick={selectItem}
    >
      {name}
    </li>
  );
};

const ListItemMemo = memo(ListItem, arePropsEqual);

// ---------------------------------------
// Do NOT change anything below this line.
// ---------------------------------------

const sizes = ["tiny", "small", "medium", "large", "huge"];
const colors = [
  "navy",
  "blue",
  "aqua",
  "teal",
  "olive",
  "green",
  "lime",
  "yellow",
  "orange",
  "red",
  "maroon",
  "fuchsia",
  "purple",
  "silver",
  "gray",
  "black",
];
const fruits = [
  "apple",
  "banana",
  "watermelon",
  "orange",
  "peach",
  "tangerine",
  "pear",
  "kiwi",
  "mango",
  "pineapple",
];

export const items = sizes.reduce(
  (items, size) => [
    ...items,
    ...fruits.reduce(
      (acc, fruit) => [
        ...acc,
        ...colors.reduce(
          (acc, color) => [
            ...acc,
            {
              name: `${size} ${color} ${fruit}`,
              color,
            },
          ],
          []
        ),
      ],
      []
    ),
  ],
  []
);

// ReactDOM.render(<List items={items} />, document.getElementById("root"));
