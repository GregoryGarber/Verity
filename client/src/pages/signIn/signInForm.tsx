import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import styles from "./signInForm.module.css";
import axios from "axios";

const SignInForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    onSubmit: (values) => {
      axios
        .post("http://localhost:4007/api/auth/signIn", {
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
    <form className={styles.signInForm} onSubmit={formik.handleSubmit}>
      <h1 className={styles.title}>User Login</h1>
      <div className={styles.input_div}>
        <label className={styles.label} htmlFor="username">
          Email
        </label>
        <input
          className={styles.input}
          id="username"
          name="username"
          type="email"
          required
          onChange={formik.handleChange}
          value={formik.values.username}
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
          required
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </div>
      <br />
      <div className={styles.options_container}>
        <div>Forget Password</div>
        <div onClick={() => navigate("/signUp")}>Register</div>
      </div>
      <div className={styles.button_container}>
        <button className={styles.button} type="submit">
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
