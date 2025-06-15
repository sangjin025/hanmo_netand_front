import styles from "./PostList.module.css"

export default function PostList() {
  return(
    <div className={styles.container}>
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th>등록일자</th>
          <th>회사명</th>
          <th>제품명</th>
          <th>중요도</th>
          <th>제목</th>
          <th>처리상태</th>
          <th>책임자</th>
          <th>이슈유형</th>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
  </div>
  )
}