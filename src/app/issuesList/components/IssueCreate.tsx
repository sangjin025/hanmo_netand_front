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
          등록
          {submitLabel}
        </button>
      </form>
    </div>
  );
}
