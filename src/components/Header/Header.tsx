"use client";

import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/images/netand_logo.png"
          alt="넷앤드"
          width={242}
          height={53}
        />
      </Link>
      <nav className={styles.nav}>
        <Link
          href="/main"
          className={`${styles.navItem} ${
            pathname === "/main" ? styles.active : ""
          }`}
        >
          메인페이지
        </Link>
        <Link
          href="/maintenance"
          className={`${styles.navItem} ${
            pathname === "/maintenance" ? styles.active : ""
          }`}
        >
          정기점검관리
        </Link>
        <Link
          href="/issuesList"
          className={`${styles.navItem} ${
            pathname === "/issuesList" ? styles.active : ""
          }`}
        >
          이슈관리
        </Link>
      </nav>
      <div className={styles.controls}>
        <Link href="/login" className={styles.logout}>
          로그인/회원가입
        </Link>
        <button className={styles.hamburger}>
          <Image src="/images/hamburger.png" alt="" width={36} height={25} />
        </button>
      </div>
    </header>
  );
}
