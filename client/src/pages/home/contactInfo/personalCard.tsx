import React from "react";
import styles from "./personalCard.module.css";
import InfoSection from "./infoSection";

const PersonalCard = () => {
  return (
    <div className={styles.personalCard}>
      <div className={styles.header}>Personal Info</div>
      <InfoSection title={"Family"} editMode={true} />
      <InfoSection title={"Hobbies"} editMode={true} />
      <InfoSection title={"Fun Facts"} editMode={true} />
      {/* <div className={styles.section}></div> */}
    </div>
  );
};

export default PersonalCard;
