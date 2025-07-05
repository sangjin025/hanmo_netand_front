"use client";

import styles from "./IssuePostDetail.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import KebabMenu from "@/components/KebabMenu/KebabMenu";
import { IssueDetailData } from "./types";

type Entry = {
  label: string;
  name: string;
  value?: string;
};

type Props = {
  data: IssueDetailData;
  onEdit: () => void;
  onDelete: () => void;
  readOnly?: boolean;
};

export default function IssuePostDetail({
  data,
  onEdit,
  onDelete,
  readOnly = false,
}: Props) {
  const { id } = useParams();
  const router = useRouter();
  const [detail, setDetail] = useState<IssueDetailData | null>(null);

  const entries: Entry[] = [
    { label: "제목", name: "title", value: detail?.title },
    { label: "중요도", name: "priority", value: detail?.priority },
    { label: "이슈상태", name: "status", value: detail?.status },
    { label: "이슈유형", name: "issueType", value: detail?.issueType },
    { label: "회사명", name: "companyName", value: detail?.companyName },
    { label: "제품명", name: "productName", value: detail?.productName },
    { label: "담당자배정", name: "assigneeName", value: detail?.assigneeName },
    { label: "해결기한", name: "dueDate", value: detail?.dueDate },
  ];

  useEffect(() => {
    if (!id || Array.isArray(id)) return;
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("토큰이 없습니다.");
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/issues/${id}`;
        const response = await axios.get<{ data: IssueDetailData }>(url, {
          headers: { authorization: token },
        });
        setDetail(response.data.data);
        console.log("list : ", detail);
      } catch (e) {
        console.error("이슈 상세 조회 실패:", e);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <div className={styles.title}>이슈 상세 조회</div>
        <KebabMenu onEdit={onEdit} onDelete={onDelete} />
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

        <div className={styles.postDetail}>{detail?.description}</div>

        <Link href="/issuesList">
          <button type="button" className={styles.submitBtn}>
            목록
          </button>
        </Link>
      </form>
    </div>
  );
}
