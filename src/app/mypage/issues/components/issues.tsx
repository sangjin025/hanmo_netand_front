// src/app/mypage/issues/components/issues.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '../components/issues.module.css';



// 이슈 데이터 타입
export type Issue = {
  id: number;
  date: string;
  company: string;
  product: string;
  importance: '높음' | '보통' | '낮음';
  title: string;
  status: string;
  assignee: string;
  type: string;
};

export default function IssuesPage() {
  const path = usePathname();
  const router = useRouter();

  // 데이터, 페이지 상태
  const [issues, setIssues] = useState<Issue[]>([]);
  const [page, setPage] = useState(1);

  // 검색 상태: 입력(Input)용과 조회(Query)용 분리
  const [searchColumn, setSearchColumn] = useState<keyof Issue>('title');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const PER_PAGE = 8;

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/issues');
      const data: Issue[] = await res.json();
      setIssues(data);
    })();
  }, []);

  // 버튼 클릭 시 searchInput을 searchQuery에 복사
  const handleSearch = () => {
    setSearchQuery(searchInput);
    setPage(1);
  };

  // 컬럼별 필터링 (searchQuery 기준)
  const filteredIssues = issues.filter((it) =>
    String(it[searchColumn]).toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredIssues.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const current = filteredIssues.slice(start, start + PER_PAGE);
  const emptyRows = Math.max(PER_PAGE - current.length, 0);

  return (
    <div className={styles.container}>
      {/* 사이드바 */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>마이페이지</div>
        <div className={styles.sidebarProfile}>
          <Image
            src="/images/mypage/profile.png"
            width={80}
            height={80}
            alt="프로필"
          />
        </div>
        <ul className={styles.navList}>
          <li className={path === '/mypage' ? styles.navItemActive : styles.navItem}>
            <Link href="/mypage">내 정보</Link>
          </li>
          <li className={path === '/mypage/issues' ? styles.navItemActive : styles.navItem}>
            <Link href="/mypage/issues">이슈 목록</Link>
          </li>
        </ul>
      </aside>

      {/* 메인 컨텐츠 */}
      <main className={styles.mainContent}>
            <h1 className={styles.title}>이슈 목록</h1>

    {/* ◀ 테스트용: ID 1 상세 페이지로 바로 이동해 봅니다 */}
    <button
      onClick={() => router.push('/mypage/issues/1')}
      style={{ margin: '16px 0', padding: '8px 12px' }}
    >
      ID 1 상세 페이지로 이동
    </button>

        {/* 검색창 (타이틀과 테이블 사이) */}
        <div className={styles.searchContainer}>
          <select
            className={styles.searchSelect}
            value={searchColumn}
            onChange={(e) => {
              setSearchColumn(e.target.value as keyof Issue);
              setPage(1);
            }}
          >
            <option value="date">등록일자</option>
            <option value="company">회사명</option>
            <option value="product">제품명</option>
            <option value="importance">중요도</option>
            <option value="title">제목</option>
            <option value="status">처리상태</option>
            <option value="assignee">책임자</option>
            <option value="type">이슈유형</option>
          </select>

          <input
            className={styles.searchInput}
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          {/* 커스텀 조회 버튼 */}
          <button className={styles.searchButton} onClick={handleSearch}>
            <Image
                     src="/images/mypage/closer.png"
                     width={30}
                       height={30}
                     alt="조회"
                     />
            
          </button>
        </div>

       {/* 이슈 테이블 */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>등록일자</th>
              <th>회사명</th>
              <th>제품명</th>
              <th>중요도</th>
              <th>제목</th>
              <th>처리상태</th>
              <th>책임자</th>
              <th>이슈유형</th>
            </tr>
          </thead>
          <tbody>
            {current.map((it) => (
              <tr
                key={it.id}
                className={styles.clickableRow}
                onClick={() => router.push(`/mypage/issues/${it.id}`)}
              >
                <td>{it.date}</td>
                <td>{it.company}</td>
                <td>{it.product}</td>
                <td>{it.importance}</td>
               <td>{it.title}</td>
                <td>{it.status}</td>
                <td>{it.assignee}</td>
                <td>{it.type}</td>
              </tr>
            ))}

            {/* 빈 행 채우기 */}
            {Array.from({ length: emptyRows }).map((_, idx) => (
              <tr key={`empty-${idx}`} className={styles.emptyRow}>
                {Array.from({ length: 8 }).map((_, c) => (
                  <td key={c} className={styles.emptyCell}>&nbsp;</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* 페이지네이션 */}
        <div className={styles.pagination}>
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
            이전
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={page === i + 1 ? styles.activePage : ''}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
            다음
          </button>
        </div>
      </main>
    </div>
  );
}
