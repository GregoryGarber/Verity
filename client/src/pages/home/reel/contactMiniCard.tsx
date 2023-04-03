import React from "react";
import styles from "./contactMiniCard.module.css";

type Props = {
  data: Object[];
};

const ContactMiniCard = (props: Props) => {
  return <div className={styles.card}></div>;
};

export default ContactMiniCard;
