"use client";

import styles from "./PostDetail.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
<<<<<<< HEAD
<<<<<<< HEAD
import { DetailData } from "./types";
<<<<<<< HEAD
import { useParams } from "next/navigation";
import KebabMenu from "@/components/KebabMenu/KebabMenu";
=======
>>>>>>> ebf2f9d (feat(detail): 정기점검 상세 조회 페이지(PostDetail) 컴포넌트 추가)
=======
import { DetailData } from "./types";
import { useParams } from "next/navigation";
>>>>>>> 6ee4712 (정기점검 모듈: 검색 기능, 동적 라우팅, 상세/목록/등록 페이지 구현)
=======
import { useParams, useRouter } from "next/navigation";
import KebabMenu from "@/components/KebabMenu/KebabMenu";
>>>>>>> 9f4e1ef (정기점검 상세: PostDetail에 KebabMenu 추가 및 수정·삭제 API 연동)

type Entry = {
  label: string;
  name: string;
  value?: string;
};

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9f4e1ef (정기점검 상세: PostDetail에 KebabMenu 추가 및 수정·삭제 API 연동)
type Props = {
  data: DetailData;
  onEdit: () => void;
  onDelete: () => void;
  readOnly?: boolean;
};

export default function PostDetailPage({
<<<<<<< HEAD
  onEdit,
  onDelete,
}: // readOnly = false,
Props) {
=======
  data,
  onEdit,
  onDelete,
  readOnly = false,
}: Props) {
>>>>>>> 9f4e1ef (정기점검 상세: PostDetail에 KebabMenu 추가 및 수정·삭제 API 연동)
  const { id } = useParams();
  const router = useRouter();
  const [detail, setDetail] = useState<DetailData | null>();
  const d = detail?.details[0];

=======
interface DetailData {
  inspectionId: number;
  companyName: string;
  productName: string;
  inspector: string;
  inspectionDate: string; // or Date
  nextInspectionDate: string;
  inspectionHistory: string;
  inspectionType: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  details: {
    itemName: string;
    systemCheck: string;
    checkMethod: string;
    checkResult: string;
  }[];
}

=======
>>>>>>> 6ee4712 (정기점검 모듈: 검색 기능, 동적 라우팅, 상세/목록/등록 페이지 구현)
export default function PostDetailPage() {
  const { id } = useParams();
  const [detail, setDetail] = useState<DetailData | null>();
  const d = detail?.details[0];
<<<<<<< HEAD
>>>>>>> ebf2f9d (feat(detail): 정기점검 상세 조회 페이지(PostDetail) 컴포넌트 추가)
=======

>>>>>>> 6ee4712 (정기점검 모듈: 검색 기능, 동적 라우팅, 상세/목록/등록 페이지 구현)
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
<<<<<<< HEAD
<<<<<<< HEAD
    if (!id || Array.isArray(id)) return;
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/inspections/${id}`;
        if (!token) {
          console.error("토큰이 없습니다.");
          return;
        }
=======
=======
    if (!id || Array.isArray(id)) return;
>>>>>>> 6ee4712 (정기점검 모듈: 검색 기능, 동적 라우팅, 상세/목록/등록 페이지 구현)
    const fetchData = async () => {
      try {
<<<<<<< HEAD
>>>>>>> ebf2f9d (feat(detail): 정기점검 상세 조회 페이지(PostDetail) 컴포넌트 추가)
=======
        const token = localStorage.getItem("accessToken");
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/inspections/${id}`;
        if (!token) {
          console.error("토큰이 없습니다.");
          return;
        }
>>>>>>> 6ee4712 (정기점검 모듈: 검색 기능, 동적 라우팅, 상세/목록/등록 페이지 구현)
        const response = await axios.get<{ data: DetailData }>(url, {
          headers: {
            authorization: token,
          },
        });
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
        console.log(response.data.data);
=======
>>>>>>> 6ee4712 (정기점검 모듈: 검색 기능, 동적 라우팅, 상세/목록/등록 페이지 구현)
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
<<<<<<< HEAD
      <div className={styles.title}>상세 조회</div>
>>>>>>> ebf2f9d (feat(detail): 정기점검 상세 조회 페이지(PostDetail) 컴포넌트 추가)
=======
      <div className={styles.titleSection}>
        <div className={styles.title}>상세 조회</div>
      </div>
>>>>>>> 6ee4712 (정기점검 모듈: 검색 기능, 동적 라우팅, 상세/목록/등록 페이지 구현)
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
}
