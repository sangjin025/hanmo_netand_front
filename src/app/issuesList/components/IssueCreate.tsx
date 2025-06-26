import styles from "./IssueCreate.module.css";

interface Detail {
  itemName: string;
  systemCheck: string;
  checkMethod: string;
  checkResult: string;
}

interface InspectionForm {
  inspector: string;
  companyName: string;
  inspectionDate: string;
  nextInspectionDate: string;
  productName: string;
  inspectionHistory: string;
  inspectionType: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  details: Detail[];
}

type Field = {
  label: string;
  name: keyof InspectionForm | keyof Detail;
  type: "text" | "date" | "select";
  options?: string[];
  isDetail?: boolean;
};

export default function IssueCreate() {
  const fields: Field[] = [
    { label: "제목", name: "companyName", type: "text" },
    {
      label: "중요도",
      name: "inspector",
      type: "select",
      options: ["긴급", "즉시", "높음", "보통", "낮음"],
    },
    { label: "이슈상태", name: "inspectionDate", type: "text" },
    { label: "이슈유형", name: "nextInspectionDate", type: "text" },
    { label: "회사명", name: "productName", type: "text" },
    { label: "제품명", name: "inspectionHistory", type: "text" },
    { label: "담당자배정", name: "inspectionType", type: "text" },
    { label: "해결기한", name: "itemName", type: "date", isDetail: true },
    // { label: "점검방법", name: "systemCheck", type: "text", isDetail: true },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>이슈 등록</div>
      <form className={styles.form}>
        <div className={styles.fieldWrapper}>
          {fields.map(({ label, name, type, options, isDetail }) => (
            <div key={name} className={styles.field}>
              <label className={styles.label} htmlFor={name}>
                {label}
              </label>
              {type === "select" ? (
                <select
                  id={String(name)}
                  name={String(name)}
                  className={styles.input}
                  // value={(formData as any)[name]} // ← 변경됨: value, onChange 그대로 사용
                  // onChange={(e) => handleChange(e, !!isDetail)} // ← 변경됨
                >
                  {options!.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={String(name)}
                  name={String(name)}
                  type={type}
                  // value={
                  //   isDetail
                  //     ? formData.details[0][name as keyof Detail]
                  //     : (formData as any)[name]
                  // }
                  // onChange={(e) => handleChange(e, !!isDetail)}
                  className={styles.input}
                  placeholder={label}
                />
              )}
            </div>
          ))}
        </div>
        <textarea
          name="checkMethod"
          className={styles.postDetail}
          placeholder="점검 방법"
          // value={formData.details[0].checkMethod}
          // onChange={(e) => handleChange(e, true)}
        />
        <button type="submit" className={styles.submitBtn}>
          등록
        </button>
      </form>
    </div>
  );
}
