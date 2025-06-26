"use client";

import styles from "./PostList.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
<<<<<<< HEAD
<<<<<<< HEAD
import SearchBar, { FilterOption } from "./SearchBar";
import { InspectionSummary, ListResponse } from "./types";
import Link from "next/link";
=======
import SearchBar from "./SearchBar";
import { InspectionSummary, ListResponse } from "./types";
>>>>>>> be13743 (feat(postlist): 정기점검 목록 페이지에 검색바 통합 및 스타일·페이징 로직 보강)
=======
import SearchBar, { FilterOption } from "./SearchBar";
import { InspectionSummary, ListResponse } from "./types";
import Link from "next/link";
>>>>>>> 6ee4712 (정기점검 모듈: 검색 기능, 동적 라우팅, 상세/목록/등록 페이지 구현)

export default function PostList() {
  const [list, setList] = useState<InspectionSummary[]>([]);
  const [page, setPage] = useState(0);
  const [size] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
<<<<<<< HEAD
  const [filter, setFilter] = useState<"전체" | "회사명" | "제품명">("전체");
  const [query, setQuery] = useState("");

  const fetchList = async () => {
    const token = localStorage.getItem("accessToken");
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/inspections/inspections`;
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
=======

  const [filter, setFilter] = useState<"전체" | "회사명" | "담당자명">("전체");
  const [query, setQuery] = useState("");

  const fetchList = async () => {
    const token = localStorage.getItem("accessToken");

    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/inspections/inspections`;
      console.log("API URL:", url);
      const params: Record<string, any> = { page, size, sort: [] };
      if (filter === "회사명") {
        params.companyName = query;
      } else if (filter === "담당자명") {
        params.inspector = query;
      }
<<<<<<< HEAD
    };
    fetchList();
  }, [page, size]);
>>>>>>> be13743 (feat(postlist): 정기점검 목록 페이지에 검색바 통합 및 스타일·페이징 로직 보강)

=======

      const res = await axios.get<ListResponse>(url, {
        headers: {
          authorization: token,
        },
        params,
      });
      setList(res.data.data.content);
      setTotalPages(res.data.data.totalPages);
      console.log(list);
    } catch (e) {
      console.log("에러: ", e);
    }
  };

  useEffect(() => {
    fetchList();
  }, [page, size, filter, query]);

>>>>>>> 6ee4712 (정기점검 모듈: 검색 기능, 동적 라우팅, 상세/목록/등록 페이지 구현)
  const handleSearch = (newFilter: typeof filter, newQuery: string) => {
    setFilter(newFilter);
    setQuery(newQuery);
  };
  return (
    <div className={styles.container}>
      <span className={styles.title}> 정기점검 조회 </span>
<<<<<<< HEAD
<<<<<<< HEAD
      <SearchBar onSearch={handleSearch} />
=======
      <SearchBar />
>>>>>>> be13743 (feat(postlist): 정기점검 목록 페이지에 검색바 통합 및 스타일·페이징 로직 보강)
=======
      <SearchBar onSearch={handleSearch} />
>>>>>>> 6ee4712 (정기점검 모듈: 검색 기능, 동적 라우팅, 상세/목록/등록 페이지 구현)
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
        <tbody className={styles.tbody}>
          {list?.map((post) => (
            <tr key={post.inspectionId}>
              <td>{post.createdAt?.split("T")[0]}</td>
              <td>{post.companyName}</td>
              <td>{post.productName}</td>
              <td>{post.inspectionDate}</td>
              <td>{post.status}</td>
              <td>{post.inspector}</td>
              <td>
                <Link href={`/maintenance/${post.inspectionId}`}>
                  <button className={styles.statusbtn}> 확인하기 </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
<<<<<<< HEAD
<<<<<<< HEAD
      <div className={styles.pagination}>
=======
      <div>
>>>>>>> be13743 (feat(postlist): 정기점검 목록 페이지에 검색바 통합 및 스타일·페이징 로직 보강)
=======
      <div className={styles.pagination}>
>>>>>>> 6ee4712 (정기점검 모듈: 검색 기능, 동적 라우팅, 상세/목록/등록 페이지 구현)
        <button onClick={() => setPage((p) => Math.max(p - 1, 0))}>
          ◀︎ 이전
        </button>
        <span style={{ margin: "0 8px" }}>
          {page + 1} / {totalPages}
        </span>
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}>
          다음 ▶︎
        </button>
      </div>
    </div>
  );
}
