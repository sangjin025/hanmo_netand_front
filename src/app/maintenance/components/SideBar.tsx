"use client";

import styles from "./SideBar.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SideBar() {
  const pathname = usePathname();
  return (
    <div className={styles.container}>
      <div className={styles.title}> 정기점검 관리 </div>
      <div className={styles.nav}>
        {/* <div className={styles.nav_item}> 조회 </div> */}
        {/* <div className={styles.nav_item}> 등록 </div> */}
        <Link
          href="/maintenance"
          className={`${styles.nav_item} ${
            pathname === "/maintenance" ? styles.active : ""
          }`}
        >
          조회
        </Link>
        <Link
          href="/maintenance/create"
          className={`${styles.nav_item} ${
            pathname === "/maintenance/create" ? styles.active : ""
          }`}
        >
          등록
        </Link>
      </div>
    </div>
  );
}
