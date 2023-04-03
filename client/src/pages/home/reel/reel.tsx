import React from "react";
import styles from "./reel.module.css";
import ContactMiniCard from "./contactMiniCard";

type Props = {
  title: string;
  data: Object[];
};
const Reel = (props: Props) => {
  return (
    <div className={styles.reel}>
      <div className={styles.title}>{props.title}</div>
      <div className={styles.card_container}>
        <ContactMiniCard data={[]} />
        <ContactMiniCard data={[]} />
        <ContactMiniCard data={[]} />
        <ContactMiniCard data={[]} />
        <ContactMiniCard data={[]} />
        <ContactMiniCard data={[]} />
        <ContactMiniCard data={[]} />
      </div>
    </div>
  );
};

export default Reel;
