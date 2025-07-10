import React from "react";
import styles from "./components/mypage.module.css";
import MyPage from "./components/mypage";

export default function Page() {
  return (
    <div className={styles.container}>
      <MyPage />
    </div>
  );
}
