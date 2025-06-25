import styles from "./SearchBar.module.css";
import Image from "next/image";

export default function SearchBar() {
  return (
    <div className={styles.container}>
      <select className={styles.filter}>
        <option>전체</option>
        <option>회사명</option>
        <option>담당자명</option>
      </select>
      <input className={styles.input}></input>
      <button className={styles.btn}>
        <Image src="/images/돋보기.png" alt="돋보기" width={23} height={23} />
      </button>
    </div>
  );
}
