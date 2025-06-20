"use client";

import styles from "./PostCreate.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

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
  type: "text" | "date";
  isDetail?: boolean;
};

const fields: Field[] = [
  { label: "회사명", name: "companyName", type: "text" },
  { label: "점검자", name: "inspector", type: "text" },
  { label: "점검일자", name: "inspectionDate", type: "date" },
  { label: "다음 점검일자", name: "nextInspectionDate", type: "date" },
  { label: "제품명", name: "productName", type: "text" },
  { label: "정기점검 이력", name: "inspectionHistory", type: "text" },
  { label: "점검유형", name: "inspectionType", type: "text" },
  { label: "점검 항목", name: "itemName", type: "text", isDetail: true },
  { label: "시스템 확인", name: "systemCheck", type: "text", isDetail: true },
  { label: "점검 결과", name: "checkResult", type: "text", isDetail: true },
];

export default function PostCreate() {
  const [formData, setFormData] = useState<InspectionForm>({
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
  });

  // async function testPayload() {
  //   const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/inspections`;
  //   try {
  //     // 1) 저장해둔 토큰 꺼내기
  //     const token = localStorage.getItem("accessToken");
  //     if (!token) {
  //       console.error("토큰이 없습니다. 로그인 후 다시 시도해주세요.");
  //       return;
  //     }

  //     const payload = {
  //       companyName: "에스케이쉴더스(주)",
  //       inspectionDate: "2025-06-20",
  //       nextInspectionDate: "2025-07-20",
  //       productName: "에스케이쉴더스DB",
  //       inspectionHistory: "이력A",
  //       inspectionType: "TYPE1",
  //       status: "SCHEDULED",
  //       details: [
  //         {
  //           itemName: "항목1",
  //           systemCheck: "OK",
  //           checkMethod: "방법1",
  //           checkResult: "PASS",
  //         },
  //       ],
  //     };

  //     const res = await axios.post(url, payload, {
  //       headers: {
  //         Authorization: `${token}`,
  //       },
  //     });

  //     console.log("성공:", res.data);
  //   } catch (err: any) {
  //     console.error("❌ 요청 실패");
  //     console.error("Status:", err.response?.status);
  //     console.error("Response:", err.response?.data);
  //     console.error("Headers:", err.response?.headers);
  //   }
  // }
  // testPayload();

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
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인 후 시도해주세요.");
        return;
      }

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
      <div className={styles.title}>정기점검 등록</div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fieldWrapper}>
          {fields.map(({ label, name, type, isDetail }) => (
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
          등록
        </button>
      </form>
    </div>
  );
}
