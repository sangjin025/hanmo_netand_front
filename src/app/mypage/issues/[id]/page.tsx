// src/app/mypage/issues/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styles from './issueDetail.module.css';
import type { Issue } from '../components/issues';

export default function IssueDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);

  // 상세 데이터 로드
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await fetch(`/api/issues/${id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data: Issue = await res.json();
        setIssue(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p>불러오는 중…</p>;
  if (!issue) return <p>이슈를 찾을 수 없습니다.</p>;

  // 수락/거절/삭제 처리
  const handleAction = async (action: 'accept' | 'reject' | 'delete') => {
    const method = action === 'delete' ? 'DELETE' : 'PATCH';
    const body = action === 'delete' ? undefined : JSON.stringify({ status: action === 'accept' ? '수락' : '거절' });
    await fetch(`/api/issues/${id}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    router.push('/mypage/issues');
  };

  return (
    <div className={styles.detailContainer}>
      <h2 className={styles.heading}>이슈 상세</h2>
      <div className={styles.fieldGroup}>
        <label className={styles.label}>제목</label>
        <input className={styles.input} type="text" value={issue.title} readOnly />
      </div>
      <div className={styles.row}>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>등록일자</label>
          <input className={styles.input} type="text" value={issue.date} readOnly />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>회사명</label>
          <input className={styles.input} type="text" value={issue.company} readOnly />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>제품명</label>
          <input className={styles.input} type="text" value={issue.product} readOnly />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.label}>이슈유형</label>
          <input className={styles.input} type="text" value={issue.type} readOnly />
        </div>
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.label}>상태</label>
        <input className={styles.input} type="text" value={issue.status} readOnly />
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.accept} onClick={() => handleAction('accept')}>
          수락하기
        </button>
        <button className={styles.reject} onClick={() => handleAction('reject')}>
          거절하기
        </button>
        <button className={styles.delete} onClick={() => handleAction('delete')}>
          삭제
        </button>
      </div>
    </div>
  );
}
