// app/issuesList/[id]/edit/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import IssueCreate from "../../components/IssueCreate";
import type { IssueDetailData, IssueFormData } from "../../components/types";
<<<<<<< HEAD
import Comment from "../../components/Comment"

=======
>>>>>>> 4b9dc98 (fix: 이슈 상세 조회 페이지 레이아웃 및 API 연동 오류 수정)

export default function EditIssuePage() {
  const { id } = useParams();
  const router = useRouter();
<<<<<<< HEAD
  // const [detail, setDetail] = useState<IssueDetailData | null>(null);

   // 더미 데이터를 초기값으로 넣으면 detail이 null이 아니어서 바로 JSX가 렌더됩니다.
   const dummy: IssueDetailData = {
     title: "테스트 제목",
     priority: "LOW",
     status: "OPEN",
     issueType: "TASK",
     companyName: "ACME Corp",
     productName: "Widget",
     assigneeName: "홍길동",
     dueDate: "2025-07-31",
     description: "이건 더미 설명입니다.",
   };
   const [detail, setDetail] = useState<IssueDetailData>(dummy);

  useEffect(() => {
    // if (!id) return;
    // const token = localStorage.getItem("accessToken");
    // axios
    //   .get<{ data: IssueDetailData }>(
    //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/issues/${id}`,
    //     { headers: { authorization: token! } }
    //   )
    //   .then((res) => setDetail(res.data.data))
    //   .catch(console.error);
  }, [id]);

  // if (!detail) return <div>로딩 중…</div>;
=======
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
>>>>>>> 4b9dc98 (fix: 이슈 상세 조회 페이지 레이아웃 및 API 연동 오류 수정)

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
<<<<<<< HEAD
      <Comment
      id={1}
       author="홍길동"
       role="엔지니어"
       timestamp="2025-07-05 12:00:00"
       content="이것은 댓글 미리보기입니다."
        />
=======
>>>>>>> 4b9dc98 (fix: 이슈 상세 조회 페이지 레이아웃 및 API 연동 오류 수정)
    </>
  );
}
