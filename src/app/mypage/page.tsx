// ⚠️ App Router를 쓰실 땐 'use client'는 서브 컴포넌트에만 달아도 무방합니다.
// 여기선 layout 역할만 하므로 생략했습니다.

import React from 'react';
import styles from './components/mypage.module.css';
import MyPage from './components/mypage';

export default function Page() {
  return (
    <div className={styles.container}>
      <MyPage />
    </div>
  );
}
