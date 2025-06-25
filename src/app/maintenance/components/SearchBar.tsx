<<<<<<< HEAD
"use client";

import styles from "./SearchBar.module.css";
import Image from "next/image";
import { useState } from "react";

export type FilterOption = "전체" | "회사명" | "제품명";
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
import styles from "./SearchBar.module.css";
import Image from "next/image";

export default function SearchBar() {
  return (
    <div className={styles.container}>
      <select className={styles.filter}>
        <option>전체</option>
        <option>회사명</option>
        <option>담당자명</option>
      </select>
      <input className={styles.input}></input>
      <button className={styles.btn}>
>>>>>>> 3aa2ada (feat(search): 정기점검 목록용 SearchBar 컴포넌트 및 타입 정의 추가)
        <Image src="/images/돋보기.png" alt="돋보기" width={23} height={23} />
      </button>
    </div>
  );
}
