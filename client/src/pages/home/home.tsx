import React from "react";
import styles from "./home.module.css";
import Sidebar from "./sidebar/sidebar";
import Reel from "./reel/reel";
import Header from "../components/header";
import ContactInfo from "./contactInfo/contactInfo";

const Home = () => {
  return (
    <div className={styles.home}>
      <Sidebar />
      <div className={styles.main_container}>
        <div className={styles.header}>
          <Header />
        </div>
        <Reel title={"Your Favorites / Recently Viewed"} data={[]} />
        <Reel title={"Meeting Today"} data={[]} />
        <ContactInfo name={"Stevie Wonders"} />
      </div>
    </div>
  );
};

export default Home;
