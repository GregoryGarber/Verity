import React, { useState } from "react";
import styles from "./signUpPage.module.css";
import RightTriangle from "../components/triangle";
import SignUpForm from "./signUpForm";
import Header from "../components/header";

const SignUpPage = () => {
  return (
    <div>
      <div className={styles.header_container}>
        <Header />
      </div>
      <div className={styles.signInPage}>
        <div className={styles.topbar}></div>
        <div className={styles.page_container}>
          {/* <div className={styles.left_triangle_container}>
            <RightTriangle angle={270} />
          </div> */}
          <div className={styles.form_container}>
            <div className={styles.catch_phrase}>
              A Source of Truth For All of Your Business Contacts
            </div>
            <SignUpForm />
          </div>
          {/* <div className={styles.right_triangle_container}>
            <RightTriangle angle={90} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
