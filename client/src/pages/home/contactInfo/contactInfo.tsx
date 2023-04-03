import React from "react";
import styles from "./contactInfo.module.css";
import BusinessCard from "./businessCard";
import PersonalCard from "./personalCard";
type Props = {
  name: String;
};

const ContactInfo = (props: Props) => {
  return (
    <div className={styles.contactInfo}>
      <div className={styles.name}>{props.name}</div>
      <div className={styles.infoContainer}>
        <BusinessCard />
        <PersonalCard />
      </div>
    </div>
  );
};

export default ContactInfo;
