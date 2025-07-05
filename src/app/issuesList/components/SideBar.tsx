"use client";

import styles from "./SideBar.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SideBar() {
  const pathname = usePathname();
  return (
    <div className={styles.container}>
      <div className={styles.title}> 이슈 관리 </div>
      <div className={styles.nav}>
        <Link
          href="/issuesList"
          className={`${styles.nav_item} ${
            pathname === "/issuesList" ? styles.active : ""
          }`}
        >
          조회
        </Link>
        <Link
          href="/issuesList/create"
          className={`${styles.nav_item} ${
            pathname === "/issuesList/create" ? styles.active : ""
          }`}
        >
          등록
        </Link>
      </div>
    </div>
  );
}
