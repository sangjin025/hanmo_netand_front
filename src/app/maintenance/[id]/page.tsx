"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import PostDetail from "../components/PostDetail";
import type { DetailData } from "../components/types";

export default function MaintenanceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [detail, setDetail] = useState<DetailData | null>(null);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("토큰이 없습니다.");
        return;
      }

      try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/inspections/${id}`;
        console.log("Fetching:", url, "with token:", token);
        const response = await axios.get<{ data: DetailData }>(url, {
          headers: {
            authorization: token,
          },
        });
        setDetail(response.data.data);
      } catch (err: any) {
        console.error(
          "상세조회 실패:",
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
    router.push(`/maintenance/${id}/edit`);
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      const token = localStorage.getItem("accessToken")!;
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/inspections/${id}`,
        { headers: { authorization: token } }
      );
      router.replace("/maintenance");
    } catch (e) {
      console.error("삭제 실패", e);
    }
  };

  return (
    <PostDetail
      data={detail}
      onEdit={handleEdit}
      onDelete={handleDelete}
      readOnly={true}
    />
  );
}
