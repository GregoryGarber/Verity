import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import styles from "./signUpForm.module.css";
import axios from "axios";

const SignUpForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: (values) => {
      axios
        .post("http://localhost:4007/api/auth/signup", {
          email: values.username,
          password: values.password,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            const token = res.data.data.accessToken;
            const id = res.data.data.id;
            localStorage.setItem("token", JSON.stringify(token));
            localStorage.setItem("id", JSON.stringify(id));
          } else {
            alert(res.data.data.message);
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
          console.log(err);
        });
    },
  });

  return (
    <form className={styles.signUpForm} onSubmit={formik.handleSubmit}>
      <h1 className={styles.title}>User Sign Up</h1>
      <div className={styles.input_div}>
        <label className={styles.label} htmlFor="username">
          Email
        </label>
        <input
          className={styles.input}
          id="username"
          name="username"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.username}
          required
        />
      </div>
      <br />
      <div className={styles.input_div}>
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          className={styles.input}
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          required
        />
      </div>
      <br />
      <div
        className={styles.options_container}
        onClick={() => navigate("/signIn")}
      >
        Already a user?
      </div>
      <div className={styles.button_container}>
        <button className={styles.button} type="submit">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
