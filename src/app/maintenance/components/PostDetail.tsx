"use client";

import styles from "./PostDetail.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { DetailData } from "./types";
import { useParams } from "next/navigation";
import KebabMenu from "@/components/KebabMenu/KebabMenu";

type Entry = {
  label: string;
  name: string;
  value?: string;
};

type Props = {
  data: DetailData;
  onEdit: () => void;
  onDelete: () => void;
  readOnly?: boolean;
};

export default function PostDetailPage({
  onEdit,
  onDelete,
}: // readOnly = false,
Props) {
  const { id } = useParams();
  const [detail, setDetail] = useState<DetailData | null>();
  const d = detail?.details[0];

  const entries: Entry[] = [
    { label: "회사명", name: "companyName", value: detail?.companyName },
    { label: "점검자", name: "inspector", value: detail?.inspector },
    {
      label: "점검일자",
      name: "inspectionDate",
      value: detail?.inspectionDate,
    },
    {
      label: "다음 점검일자",
      name: "nextInspectionDate",
      value: detail?.nextInspectionDate,
    },
    { label: "제품명", name: "productName", value: detail?.productName },
    {
      label: "정기점검 이력",
      name: "inspectionHistory",
      value: detail?.inspectionHistory,
    },
    {
      label: "점검유형",
      name: "inspectionType",
      value: detail?.inspectionType,
    },
    {
      label: "점검 항목",
      name: "itemName",
      value: d?.itemName,
    },
    {
      label: "시스템 확인",
      name: "systemCheck",
      value: d?.systemCheck,
    },
    {
      label: "점검 결과",
      name: "checkResult",
      value: d?.checkResult,
    },
  ];

  useEffect(() => {
    if (!id || Array.isArray(id)) return;
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/inspections/${id}`;
        if (!token) {
          console.error("토큰이 없습니다.");
          return;
        }
        const response = await axios.get<{ data: DetailData }>(url, {
          headers: {
            authorization: token,
          },
        });
        setDetail(response.data.data);
        // console.log(response.data.data);
        console.log("Response:", response);
      } catch (e) {
        console.log("상세조회 실패: ", e);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <div className={styles.title}>상세 조회</div>
        <div>
          <KebabMenu onEdit={onEdit} onDelete={onDelete} />
        </div>
      </div>
      <form className={styles.form}>
        <div className={styles.entriesWrapper}>
          {entries.map(({ label, name, value }) => (
            <div key={name} className={styles.entries}>
              <span className={styles.label}>{label}</span>
              <span className={styles.value}>{value}</span>
            </div>
          ))}
        </div>
        <div className={styles.postDetail}>
          {detail?.details[0].checkMethod}
        </div>
        <Link href="/maintenance">
          <button className={styles.submitBtn}>목록</button>
        </Link>
      </form>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 3ff7182b0e64e2acba8a51f308c97b0c75b57164
