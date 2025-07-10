import React from "react";
import styles from "../components/mypage.module.css"; // 한 단계 위 components 폴더
import Issues from "./components/issues"; // issues/components/issues.tsx

export default function Page() {
  return (
    <div className={styles.container}>
      <Issues />
    </div>
  );
}
