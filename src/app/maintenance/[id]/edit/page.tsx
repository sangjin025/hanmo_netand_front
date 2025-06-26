"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import PostCreate from "../../components/PostCreate";
import type { DetailData } from "../../components/types";

export default function EditInspectionPage() {
  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState<DetailData | null>(null);

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("토큰이 없습니다.");
      return;
    }
    axios
      .get<{ data: DetailData }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/inspections/${id}`,
        {
          headers: { authorization: token },
        }
      )
      .then((res) => setInitialData(res.data.data))
      .catch((e) => console.error("상세 조회 실패:", e));
  }, [id]);

  const handleUpdate = async (form: DetailData) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인 후 시도해주세요.");
        return;
      }
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/inspections/${id}`,
        form,
        {
          headers: { authorization: token },
        }
      );
      router.push(`/maintenance/${id}`);
    } catch (e) {
      console.error("수정 실패", e);
    }
  };

  if (!initialData) return <div>로딩 중…</div>;

  return (
    <>
      <h1>정기점검 수정</h1>
      <PostCreate
        initialData={initialData}
        onSubmit={handleUpdate}
        submitLabel="수정"
      />
    </>
  );
}
