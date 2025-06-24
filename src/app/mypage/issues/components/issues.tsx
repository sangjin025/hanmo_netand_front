// src/app/mypage/issues/components/issues.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import styles from '../components/issues.module.css';

type Issue = {
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
  const [issues, setIssues] = useState<Issue[]>([]);
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/issues');
      const data: Issue[] = await res.json();
      setIssues(data);
    })();
  }, []);

  const totalPages = Math.ceil(issues.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const current = issues.slice(start, start + PER_PAGE);

  return (
    <div className={styles.container}>
      {/* ─── 사이드바 ──────────────────────────────── */}
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

      {/* ─── 메인 컨텐츠 ───────────────────────────── */}
      <main className={styles.mainContent}>
        <h1 className={styles.title}>이슈 목록</h1>

        {/* ─── 테이블 (8개씩 페이징) ───────────────────── */}
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
              <tr key={it.id}>
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
          </tbody>
        </table>

        {/* ─── 페이지네이션 ───────────────────────────── */}
        <div className={styles.pagination}>
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
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

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            다음
          </button>
        </div>
      </main>
    </div>
);
}
