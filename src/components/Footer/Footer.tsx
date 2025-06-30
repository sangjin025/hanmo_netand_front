import styles from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/images/netand_logo_dark.png"
          alt="넷앤드"
          width={228.75}
          height={34}
        />
      </Link>
      <div className={styles.footerDetails}>
        <address className={styles.companyInfo}>
          <p>(주)넷앤드 | 사업자 등록 번호 : 109-86-11375</p>
          <p>(07333) 서울시 영등포구 의사당대로 1길 25 하남빌딩 10층</p>
          <p>
            대표전화 02-2661-1410 | Fax 02-2661-1420 |E-MAIL : info@netand.co.kr
          </p>
        </address>
        <nav className={styles.legalLinks}>
          <p>정보보안 및 개인정보처리방침</p>
          <p>COPYRIGHTⓒ NETAND, ALL RIGHTS RESERVED</p>
        </nav>
      </div>
    </footer>
  );
}
