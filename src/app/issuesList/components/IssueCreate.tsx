import styles from "./IssueCreate.module.css";
import axios from "axios";

interface InspectionForm {
  title: string; // 제목
  priority: "URGENT"; // 중요도
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED"; // 이슈상태
  issueType: "BUG" | "INQUIRY" | "FEATURE" | "ETC"; // 값 아직 모름 // 이슈 유형
  companyId: string; // 회사명
  productCode: string; // 제품명
  inspector: string; // 담당자배정
  dueDate: Date; // 해결기한
  description: string; // 점검방법?
}

type Field = {
  label: string;
  name: keyof InspectionForm;
  type: "text" | "date" | "select";
  options?: string[];
};

export default function IssueCreate() {
  const fields: Field[] = [
    { label: "제목", name: "title", type: "text" },
    {
      label: "중요도",
      name: "priority",
      type: "select",
      options: ["긴급", "즉시", "높음", "보통", "낮음"],
    },
    { label: "이슈상태", name: "status", type: "text" },
    { label: "이슈유형", name: "issueType", type: "text" },
    { label: "회사명", name: "companyId", type: "text" },
    { label: "제품명", name: "productCode", type: "text" },
    { label: "담당자배정", name: "inspector", type: "text" },
    { label: "해결기한", name: "dueDate", type: "date" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인 후 시도해주세요.");
      return;
    }

    try {
      // if (onSubmit) {
      //   await onSubmit(formData);
      //   return; // 수정이 끝나면 함수 종료
      // }
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/inspections`;
      const res = await axios.post(url, formData, {
        headers: {
          Authorization: `${token}`,
        },
      });

      console.log("등록 성공: ", res.data);
    } catch (err: any) {
      console.error("❌ 등록 실패");
      console.error("Status:", err.response?.status);
      console.error("Response:", err.response?.data);
      console.error("Headers:", err.response?.headers);
    }
  };

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
