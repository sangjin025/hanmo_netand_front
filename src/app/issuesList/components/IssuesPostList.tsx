<<<<<<< HEAD
<<<<<<< HEAD
"use client";

import styles from "./IssuesPostList.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import { IssueSummary, ListResponse } from "./types";
import Link from "next/link";

export default function IssueList() {
  const [list, setList] = useState<IssueSummary[]>([]);
  const [page, setPage] = useState(0);
  const [size] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [filter, setFilter] = useState<"전체" | "회사명" | "제품명">("전체");
  const [query, setQuery] = useState("");

  const fetchList = async () => {
    const token = localStorage.getItem("accessToken");
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/issues`;
    const headers = { Authorization: token };
    try {
      const base = { page, size };
      if (filter === "회사명") {
        const res = await axios.get<ListResponse>(url, {
          headers,
          params: { ...base, companyName: query.trim() },
        });
        setList(res.data.data.content);
        setTotalPages(res.data.data.totalPages);
        return;
      }
      if (filter === "제품명") {
        const res = await axios.get<ListResponse>(url, {
          headers,
          params: { ...base, productName: query.trim() },
        });
        setList(res.data.data.content);
        setTotalPages(res.data.data.totalPages);
        return;
      }

      if (filter === "전체" && query.trim()) {
        const [byCompany, byProduct] = await Promise.all([
          axios.get<ListResponse>(url, {
            headers,
            params: { ...base, companyName: query.trim() },
          }),
          axios.get<ListResponse>(url, {
            headers,
            params: { ...base, productName: query.trim() },
          }),
        ]);

        const merged = [
          ...byCompany.data.data.content,
          ...byProduct.data.data.content,
        ].filter(
          (item, idx, arr) => arr.findIndex((p) => p.id === item.id) === idx // id 중복 제거
        );

        setList(merged);
        setTotalPages(Math.ceil(merged.length / size));
        return;
      }

      /* 검색어 없이 */
      const resAll = await axios.get<ListResponse>(url, {
        headers,
        params: base,
      });
      setList(resAll.data.data.content);
      setTotalPages(resAll.data.data.totalPages);
    } catch (e) {
      console.error("이슈 목록 조회 실패:", e);
    }
  };

  useEffect(() => {
    fetchList();
  }, [page, size, filter, query]);

  const handleSearch = (newFilter: typeof filter, newQuery: string) => {
    setPage(0);
    setFilter(newFilter);
    setQuery(newQuery);
  };
=======
=======
// app/issuesList/components/IssuesPostList.tsx
"use client";

>>>>>>> db7d18f (feat: 이슈 목록 컴포넌트 UI/UX 개선)
import styles from "./IssuesPostList.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";

import { IssueSummary, ListResponse } from "./types";
import Link from "next/link";

export default function IssueList() {
  const [list, setList] = useState<IssueSummary[]>([]);
  const [page, setPage] = useState(0);
  const [size] = useState(8);
  const [totalPages, setTotalPages] = useState(0);

<<<<<<< HEAD
>>>>>>> 6ee4712 (정기점검 모듈: 검색 기능, 동적 라우팅, 상세/목록/등록 페이지 구현)
=======
  const [filter, setFilter] = useState<"전체" | "제목" | "회사명">("전체");
  const [query, setQuery] = useState("");

  const fetchList = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/issues`;
      const params: Record<string, any> = { page, size };
      if (filter === "제목") params.title = query;
      else if (filter === "회사명") params.companyName = query;

      const res = await axios.get<ListResponse>(url, {
        headers: { authorization: token },
        params,
      });
      setList(res.data.data.content);
      console.log("response content:", res.data.data.content);

      setTotalPages(res.data.data.totalPages);
    } catch (e) {
      console.error("이슈 목록 조회 실패:", e);
    }
  };

  useEffect(() => {
    fetchList();
  }, [page, size, filter, query]);

  const handleSearch = (newFilter: typeof filter, newQuery: string) => {
    setFilter(newFilter);
    setQuery(newQuery);
  };
>>>>>>> db7d18f (feat: 이슈 목록 컴포넌트 UI/UX 개선)

  return (
    <div className={styles.container}>
      <span className={styles.title}> 이슈 조회 </span>
<<<<<<< HEAD
<<<<<<< HEAD
      <SearchBar onSearch={handleSearch} />

=======
      <SearchBar />
>>>>>>> 6ee4712 (정기점검 모듈: 검색 기능, 동적 라우팅, 상세/목록/등록 페이지 구현)
=======
      <SearchBar
      onSearch={handleSearch}
      />

>>>>>>> db7d18f (feat: 이슈 목록 컴포넌트 UI/UX 개선)
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>등록일자</th>
<<<<<<< HEAD
<<<<<<< HEAD
            <th>제목</th>
            <th>회사명</th>
            <th>제품명</th>
            <th>중요도</th>
            <th>처리상태</th>
            <th>담당자</th>
            <th>이슈유형</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {list.map((post) => (
            <tr key={post.id}>
              <td>{post.createdAt.split("T")[0]}</td>
              <td>
                <Link href={`/issuesList/${post.id}`}>{post.title}</Link>
              </td>
              <td>{post.companyName}</td>
              <td>{post.productName}</td>
              <td>{post.priority}</td>
              <td>{post.status}</td>
              <td>{post.assigneeName}</td>
              <td>{post.issueType}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 0))}>
          ◀ 이전
        </button>
        <span style={{ margin: "0 8px" }}>
          {page + 1} / {totalPages}
        </span>
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}>
          다음 ▶
        </button>
      </div>
=======
=======
            <th>제목</th>
>>>>>>> db7d18f (feat: 이슈 목록 컴포넌트 UI/UX 개선)
            <th>회사명</th>
            <th>제품명</th>
            <th>중요도</th>
            <th>처리상태</th>
            <th>담당자</th>
            <th>이슈유형</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {list.map((post) => (
            <tr key={post.id}>
              <td>{post.createdAt.split("T")[0]}</td>
              <td>
                <Link href={`/issuesList/${post.id}`}>{post.title}</Link>
              </td>
              <td>{post.companyName}</td>
              <td>{post.productName}</td>
              <td>{post.priority}</td>
              <td>{post.status}</td>
              <td>{post.assigneeName}</td>
              <td>{post.issueType}</td>
            </tr>
          ))}
        </tbody>
      </table>
<<<<<<< HEAD
>>>>>>> 6ee4712 (정기점검 모듈: 검색 기능, 동적 라우팅, 상세/목록/등록 페이지 구현)
=======

      <div className={styles.pagination}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 0))}>
          ◀ 이전
        </button>
        <span style={{ margin: "0 8px" }}>
          {page + 1} / {totalPages}
        </span>
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}>
          다음 ▶
        </button>
      </div>
>>>>>>> db7d18f (feat: 이슈 목록 컴포넌트 UI/UX 개선)
    </div>
  );
}
