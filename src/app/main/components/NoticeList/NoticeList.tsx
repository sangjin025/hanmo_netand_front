import styles from "./page.module.css";
import ReactPaginate from "react-paginate";

export default function NoticeList() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>주요알림</div>
        <div className={styles.noticeBoxes}>
          <div className={styles.noticeBox}>
            {">>"} 미확인 알림이 4건 있습니다.
          </div>
          <div className={styles.noticeBox}>
            {">>"} "ㅇㅇ"건 마감기한이 7일 남았습니다.
          </div>
          <div className={styles.noticeBox}> {">>"} </div>
          <div className={styles.noticeBox}> {">>"} </div>
          <div className={styles.noticeBox}> {">>"} </div>
          <div className={`${styles.paginationWrapper}`}>
            {"<"} 1 2 3 4 5 6 7 8 9 {">"}
          </div>
        </div>
      </div>
    </>
  );
}
