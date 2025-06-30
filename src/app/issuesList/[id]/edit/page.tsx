// app/issuesList/[id]/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import IssueCreate from "../../components/IssueCreate";
import type { IssueDetailData, IssueFormData } from "../../components/types";

export default function EditIssuePage() {
  const { id } = useParams();
  const router = useRouter();
  const [detail, setDetail] = useState<IssueDetailData | null>(null);

  useEffect(() => {
    if (!id) return;
    const token = localStorage.getItem("accessToken");
    axios
      .get<{ data: IssueDetailData }>(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/issues/${id}`,
        { headers: { authorization: token! } }
      )
      .then((res) => setDetail(res.data.data))
      .catch(console.error);
  }, [id]);

  if (!detail) return <div>로딩 중…</div>;

  const initialForm: IssueFormData = {
    title: detail.title,
    priority: detail.priority,
    status: detail.status,
    issueType: detail.issueType,
    companyName: detail.companyName || "",
    productName: detail.productName || "",
    assigneeName: detail.assigneeName || "",
    dueDate: detail.dueDate,
    description: detail.description,
  };

  const callUpdateApi = async (updated: IssueDetailData) => {
    const token = localStorage.getItem("accessToken");
    await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/issues/${id}`,
      updated,
      { headers: { authorization: token! } }
    );
    router.push(`/issuesList/${id}`);
  };

  const handleUpdateWrapper = async (form: IssueFormData) => {
    await callUpdateApi({ ...detail, ...form });
  };

  return (
    <>
      <h1>이슈 수정</h1>
      <IssueCreate
        initialData={initialForm}
        onSubmit={handleUpdateWrapper}
        submitLabel="수정"
      />
    </>
  );
}
