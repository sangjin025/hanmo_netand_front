import React from "react";
import SignUpForm from "./components/SignUpForm";
import styles from "./components/SignUpForm.module.css";

const SignUpPage = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>회원가입</h2>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
