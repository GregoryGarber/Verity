import React from "react";
import styles from "./contactRow.module.css";
import Box from "./box";

type Props = {
  title: string;
};

const ContactRow = (props: Props) => {
  return (
    <div className={styles.contactRow_main}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.row}>
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
        <Box />
      </div>
    </div>
  );
};

export default ContactRow;
