"use client";

import styles from "./PostCreate.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { DetailData } from "./types";
import { useRouter } from "next/navigation";

interface Detail {
  itemName: string;
  systemCheck: string;
  checkMethod: string;
  checkResult: string;
}

type Props = {
  initialData?: DetailData;
  onSubmit?: (data: DetailData) => Promise<void>;
  submitLabel?: string;
};

type Field = {
  label: string;
  name: keyof DetailData | keyof Detail;
  type: "text" | "date";
  isDetail?: boolean;
  readOnly?: boolean;
};

const fields: Field[] = [
  { label: "회사명", name: "companyName", type: "text" },
  { label: "점검자", name: "inspector", type: "text", readOnly: true },
  { label: "점검일자", name: "inspectionDate", type: "date" },
  { label: "다음 점검일자", name: "nextInspectionDate", type: "date" },
  { label: "제품명", name: "productName", type: "text" },
  { label: "정기점검 이력", name: "inspectionHistory", type: "text" },
  { label: "점검유형", name: "inspectionType", type: "text" },
  { label: "점검 항목", name: "itemName", type: "text", isDetail: true },
  { label: "시스템 확인", name: "systemCheck", type: "text", isDetail: true },
  { label: "점검 결과", name: "checkResult", type: "text", isDetail: true },
];

export default function PostCreate({
  initialData,
  onSubmit,
  submitLabel = "등록",
}: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState<DetailData>(
    initialData ?? {
      companyName: "",
      inspector: "",
      inspectionDate: "",
      nextInspectionDate: "",
      productName: "",
      inspectionHistory: "",
      inspectionType: "",
      status: "SCHEDULED",
      // SCHEDULED : 예정된 것, COMPLETED: 완료 CANCELLED: 캔슬
      details: [
        {
          itemName: "",
          systemCheck: "",
          checkMethod: "",
          checkResult: "", // 점검 방법
        },
      ],
    }
  );

  // 작성자에 로그인한 회원 이름 자동으로 넣는 로직
  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await axios.get<{ data: { name: string } }>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/me`,
          { headers: { authorization: token } }
        );
        const { name } = res.data.data;
        setFormData((prev) => ({ ...prev, inspector: name }));
      } catch (err) {
        console.error("내 정보 조회 실패:", err);
      }
    };
    fetchMe();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isDetail: boolean
  ) => {
    const { name, value } = e.target;
    if (isDetail) {
      setFormData((prev) => ({
        ...prev,
        details: [{ ...prev.details[0], [name]: value }],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인 후 시도해주세요.");
      return;
    }

    try {
      if (onSubmit) {
        await onSubmit(formData);
        router.push("/maintenance");
        return; // 수정이 끝나면 함수 종료
      }
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/inspections`;
      const res = await axios.post(url, formData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      router.push("/maintenance");
    } catch (err: any) {
      console.error("등록 실패:", err.response?.status, err.response?.data);
      console.error("❌ 등록 실패");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {submitLabel === "등록" ? "정기점검 등록" : "정기점검 수정"}
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fieldWrapper}>
          {fields.map(({ label, name, type, isDetail, readOnly }) => (
            <div key={name} className={styles.field}>
              <label className={styles.label} htmlFor={name}>
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                value={
                  isDetail
                    ? formData.details[0][name as keyof Detail]
                    : (formData as any)[name]
                }
                onChange={(e) => handleChange(e, !!isDetail)}
                className={styles.input}
                placeholder={label}
                readOnly={name === "inspector" || readOnly}
              />
            </div>
          ))}
        </div>
        <textarea
          name="checkMethod"
          className={styles.postDetail}
          placeholder="점검 방법"
          value={formData.details[0].checkMethod}
          onChange={(e) => handleChange(e, true)}
        />
        <button type="submit" className={styles.submitBtn}>
          {submitLabel}
        </button>
      </form>
    </div>
  );
}
