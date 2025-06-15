import { ST } from "next/dist/shared/lib/utils";
import styles from "./PostCreate.module.css";

export default function PostCreate() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>정기점검 등록</div>
      <form className={styles.form}>
        <div className={styles.fieldWrapper}>
          {[
            "회사명",
            "점검자",
            "점검일자",
            "다음 점검일자",
            "제품명",
            "정기점검 이력",
            "점검유형",
            "점검 항목",
            "시스템 확인",
            "점검 결과",
          ].map((label) => (
            <div key={label} className={styles.field}>
              <label className={styles.label}>{label}</label>
              <input type="text" className={styles.input} placeholder={label} />
            </div>
          ))}
        </div>
        <textarea className={styles.postDetail} placeholder="점검 방법" />
        <button type="submit" className={styles.submitBtn}>
          {" "}
          등록{" "}
        </button>
      </form>
    </div>
  );
}
