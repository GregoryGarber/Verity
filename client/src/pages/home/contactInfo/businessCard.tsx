import React from "react";
import styles from "./businessCard.module.css";
import InfoSection from "./infoSection";

const BusinessCard = () => {
  return (
    <div className={styles.businessCard}>
      <div className={styles.header}>Business Info</div>
      <InfoSection title={"Email"} editMode={true} />
      <InfoSection title={"Phone Number"} editMode={true} />
      <InfoSection title={"Location"} editMode={true} />
      <InfoSection title={"Company"} editMode={true} />
      <InfoSection title={"Position"} editMode={true} />
      {/* <div className={styles.section}></div> */}
    </div>
  );
};

export default BusinessCard;
