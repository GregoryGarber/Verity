import React from "react";
import Header from "../components/header";
import styles from "./verityPage.module.css";
import Sidebar from "./sidebar/sidebar";
import ContactRow from "./contactRow/contactRow";

const VerityPage = () => {
  return (
    <div className={styles.verity_main}>
      <Sidebar />
      <div className={styles.right_content}>
        <div className={styles.header_container}>
          <Header />
        </div>
        <ContactRow title="Favorites" />
        <ContactRow title="Calender" />
        <div className={styles.info}>Info</div>
      </div>
    </div>
  );
};

export default VerityPage;
