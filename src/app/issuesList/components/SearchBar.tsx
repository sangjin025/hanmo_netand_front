<<<<<<< HEAD
<<<<<<< HEAD
"use client";

import styles from "./SearchBar.module.css";
import Image from "next/image";
import { useState } from "react";

export type FilterOption = "전체" | "회사명" | "제품명";
<<<<<<< HEAD
interface SearchBarProps {
  onSearch: (filter: FilterOption, query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [filter, setFilter] = useState<FilterOption>("전체");
  const [query, setQuery] = useState("");
  const handleSearch = () => {
    onSearch(filter, query);
  };

  return (
    <div className={styles.container}>
      <select
        className={styles.filter}
        value={filter}
        onChange={(e) => setFilter(e.target.value as FilterOption)}
      >
        <option>전체</option>
        <option>회사명</option>
        <option>제품명</option>
      </select>
      <input
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="검색어를 입력하세요"
      />
      <button className={styles.btn} onClick={handleSearch} aria-label="검색">
=======
=======
"use client";

>>>>>>> f623307 (feat: 검색바 컴포넌트 기능 보강)
import styles from "./SearchBar.module.css";
import Image from "next/image";
import { useState } from "react";

type FilterOption = "전체" | "제목" | "회사명";

=======
>>>>>>> 1b92146 (fix: 검색 api 추가 및 로직 일부 수정)
interface SearchBarProps {
  onSearch: (filter: FilterOption, query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [filter, setFilter] = useState<FilterOption>("전체");
  const [query, setQuery] = useState("");
  const handleSearch = () => {
    onSearch(filter, query);
  };

  return (
    <div className={styles.container}>
      <select
        className={styles.filter}
        value={filter}
        onChange={(e) => setFilter(e.target.value as FilterOption)}
      >
        <option>전체</option>
        <option>회사명</option>
        <option>제품명</option>
      </select>
<<<<<<< HEAD
      <input className={styles.input}></input>
      <button className={styles.btn}>
>>>>>>> 6ee4712 (정기점검 모듈: 검색 기능, 동적 라우팅, 상세/목록/등록 페이지 구현)
=======
      <input
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="검색어를 입력하세요"
      />
      <button className={styles.btn} onClick={handleSearch} aria-label="검색">
>>>>>>> f623307 (feat: 검색바 컴포넌트 기능 보강)
        <Image src="/images/돋보기.png" alt="돋보기" width={23} height={23} />
      </button>
    </div>
  );
}
