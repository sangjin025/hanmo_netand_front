import React from "react";
import Sidebar from "./components/SideBar";
import styles from "./layout.module.css";

export default function IssuesListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
