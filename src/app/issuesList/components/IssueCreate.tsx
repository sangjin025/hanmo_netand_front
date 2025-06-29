<<<<<<< HEAD
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./IssueCreate.module.css";
import type { IssueFormData } from "./types";

interface Field {
  label: string;
  name: keyof IssueFormData;
  type: "text" | "date" | "select";
  options?: string[];
  readOnly?: boolean;
  placeholder?: string;
}

interface Props {
  initialData?: IssueFormData;
  onSubmit?: (data: IssueFormData) => Promise<void>;
  submitLabel?: string;
}

const fields: Field[] = [
  { label: "제목", name: "title", type: "text" },
  {
    label: "중요도",
    name: "priority",
    type: "select",
    options: ["URGENT", "NORMAL", "LOW"],
  },
  { label: "이슈상태", name: "status", type: "text" },
  { label: "이슈유형", name: "issueType", type: "text" },
  { label: "회사ID", name: "companyId", type: "text" },
  { label: "제품코드", name: "productCode", type: "text" },
  {
    label: "담당자배정",
    name: "assigneeName",
    type: "text",
    readOnly: true,
    placeholder: "추후 배정",
  },
  { label: "해결기한", name: "dueDate", type: "date" },
];

export default function IssueCreate({
  initialData,
  onSubmit,
  submitLabel = "등록",
}: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState<IssueFormData>(
    initialData ??
      ({
        title: "",
        priority: "NORMAL",
        status: "OPEN",
        issueType: "BUG",
        companyId: 0,
        productCode: "",
        assigneeName: "", // TODO: 백엔드에서 채워주거나 추가 로직 필요
        dueDate: "",
        description: "",
      } as IssueFormData)
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "companyId" ? Number(value) : value,
    }));
  };

  // 제출 핸들러 (등록/수정 분기)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인 후 시도해주세요.");
      return;
    }

    try {
      if (onSubmit) {
        // 수정
        await onSubmit(formData);
        router.push(`/issuesList`);
        return;
      }
      // 등록
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/issues`,
        formData,
        { headers: { authorization: token } }
      );
      router.push("/issuesList");
    } catch (err: any) {
      console.error(
        "이슈 저장 실패:",
        err.response?.status,
        err.response?.data
      );
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {submitLabel === "등록" ? "이슈 등록" : "이슈 수정"}
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fieldWrapper}>
          {fields.map(
            ({ label, name, type, options, readOnly, placeholder }) => (
              <div key={String(name)} className={styles.field}>
                <label htmlFor={String(name)} className={styles.label}>
                  {label}
                </label>
                {type === "select" ? (
                  <select
                    id={String(name)}
                    name={String(name)}
                    value={(formData as any)[name]}
                    onChange={handleChange}
                    className={styles.input}
                    disabled={readOnly}
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
                    value={(formData as any)[name] as string}
                    onChange={handleChange}
                    className={styles.input}
                    readOnly={readOnly}
                    placeholder={placeholder}
                  />
                )}
              </div>
            )
          )}
        </div>

        <textarea
          name="description"
          className={styles.postDetail}
          placeholder="상세 내용"
          value={formData.description}
          onChange={handleChange}
        />
        <button type="submit" className={styles.submitBtn}>
          {submitLabel}
=======
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
>>>>>>> 6ee4712 (정기점검 모듈: 검색 기능, 동적 라우팅, 상세/목록/등록 페이지 구현)
        </button>
      </form>
    </div>
  );
}
