import React from "react";
import styles from "./sidebar.module.css";
import Section from "./section";

let data = [
  {
    firstName: "Stevie",
    lastName: "Wonder",
  },
  {
    firstName: "Blake",
    lastName: "Griffin",
  },
  {
    firstName: "Stewie",
    lastName: "Griffin",
  },
  {
    firstName: "Bill",
    lastName: "Wonder",
  },
  {
    firstName: "Kyle",
    lastName: "Gates",
  },
];

const Sidebar = () => {
  data.sort((a, b) => {
    if (a.lastName < b.lastName) {
      return -1;
    }
    if (a.lastName > b.lastName) {
      return 1;
    }
    return 0;
  });

  const obj: Record<string, { firstName: string; lastName: string }[]> = {};

  data.forEach((person) => {
    if (person.lastName[0] in obj) {
      obj[person.lastName[0]].push(person);
    } else {
      obj[person.lastName[0]] = [person];
    }
  });

  return (
    <div className={styles.sidebar}>
      {Object.keys(obj).map((key, index) => {
        return <Section key={index} data={obj[key]} />;
      })}
    </div>
  );
};

export default Sidebar;
