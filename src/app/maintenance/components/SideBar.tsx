import styles from "./SideBar.module.css";

export default function SideBar() {
  return (
    <div className={styles.container}>
      <div className={styles.title}> 정기점검 관리 </div>
      <div className={styles.nav}>
        <div className={styles.nav_item}> 조회 </div>
        <div className={styles.nav_item}> 등록 </div>
      </div>
    </div>
  );
}
