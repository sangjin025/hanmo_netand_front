"use client";

import styles from "./PostList.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

interface PostData {
  inspectionId: number;
  createdAt: string;
  companyName: string;
  productName: string;
  inspectionDate: string;
  status: string;
  inspector: string;
}

export default function PostList() {
  const [postData, setPostData] = useState<PostData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const POSTS_PER_PAGE = 8;
  const totalPages = Math.ceil((postData?.length ?? 0) / POSTS_PER_PAGE);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/inspections`;
      console.log("API URL:", url);
      // console.log("토큰:", token);

      try {
        const response = await axios.get<{ data: PostData[] }>(url, {
          headers: {
            authorization: token,
          },
        });
        console.log(response.data.data);
        setPostData(response.data.data);
        console.log("Response:", response);
      } catch (e) {
        console.log("에러: ", e);
      }
    };
    fetchData();
  }, []);

  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = postData?.slice(startIdx, startIdx + POSTS_PER_PAGE);

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>등록일자</th>
            <th>회사명</th>
            <th>제품명</th>
            <th>점검일</th>
            <th>상태</th>
            <th>책임자</th>
            <th>상태조회</th>
          </tr>
        </thead>
        <tbody>
          {/* <td>{postData?.[0]?.createdAt}</td> */}
          {currentPosts?.map((post) => (
            <tr>
              <td>{post.createdAt}</td>
              <td>{post.companyName}</td>
              <td>{post.productName}</td>
              <td>{post.inspectionDate}</td>
              <td>{post.status}</td>
              <td>{post.inspector}</td>
              <td>
                <button> 상태조회 </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
