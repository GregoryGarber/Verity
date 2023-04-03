import React from "react";
import styles from "./section.module.css";

type Props = {
  data: {
    firstName: string;
    lastName: string;
  }[];
};

const Section = (props: Props) => {
  console.log(props.data);
  return (
    <div className={styles.section}>
      <div className={styles.header}>{props.data[0].lastName[0]}</div>
      {props.data.map((person, index) => {
        return (
          <div className={styles.person} key={index}>
            {person.firstName} {person.lastName}
          </div>
        );
      })}
    </div>
  );
};

export default Section;
