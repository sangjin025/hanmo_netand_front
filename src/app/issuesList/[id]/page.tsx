"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import IssuePostDetail from "../components/IssuePostDetail";
import type { IssueDetailData } from "../components/types";

export default function IssueDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [detail, setDetail] = useState<IssueDetailData | null>(null);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("토큰이 없습니다.");
        return;
      }

      try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/issues/${id}`;
        const response = await axios.get<{ data: IssueDetailData }>(url, {
          headers: { authorization: token },
        });
        setDetail(response.data.data);
      } catch (err: any) {
        console.error(
          "이슈 상세조회 실패:",
          err.response?.status,
          err.response?.data
        );
      }
    };
    fetchData();
  }, [id]);

  if (!detail) return <div>로딩 중…</div>;

  const handleEdit = () => {
    if (!id) return;
    router.push(`/issuesList/${id}/edit`);
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      const token = localStorage.getItem("accessToken")!;
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/issues/${id}`,
        { headers: { authorization: token } }
      );
      router.replace("/issuesList");
    } catch (e) {
      console.error("이슈 삭제 실패", e);
    }
  };

  return (
    <IssuePostDetail
      data={detail}
      onEdit={handleEdit}
      onDelete={handleDelete}
      readOnly={true}
    />
  );
}
