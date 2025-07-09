'use client';
import Image from 'next/image';
import React, { useState, ChangeEvent, ReactNode } from 'react';
import styles from './mypage.module.css';
import Link from 'next/link';
import axios from 'axios';

interface UserInfo {
  name: string;
  email: string;
  phone: string;
}
type FieldKey = keyof UserInfo;

interface Field {
  label: ReactNode;
  key: FieldKey;
  type: string;
}

const fields: Field[] = [
  {
    label: <Image src="/images/mypage/person_mp.png" alt="이름" width={26} height={26} />,
    key: 'name',
    type: 'text',
  },
  {
    label: <Image src="/images/mypage/person_mp.png" alt="이메일" width={26} height={26} />,
    key: 'email',
    type: 'email',
  },
  {
    label: <Image src="/images/mypage/phone_mp.png" alt="전화번호" width={20} height={26} />,
    key: 'phone',
    type: 'tel',
  },
];

export default function MyPage() {
  const [user, setUser] = useState<UserInfo>({
    name: '홍길동',
    email: 'juju009@naver.com',
    phone: '010-1234-5678',
  });
  const [form, setForm] = useState<UserInfo>({ ...user });
  const [editMode, setEditMode] = useState(false);

  // SMS 인증 UI 컨트롤
  const [smsRequested, setSmsRequested] = useState(false);
  const [smsCode, setSmsCode] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as FieldKey;
    setForm(prev => ({ ...prev, [key]: e.target.value }));
  };

  const handleEdit = () => {
    setForm({ ...user });
    setEditMode(true);
    setSmsRequested(true);
    setSmsCode('');
  };

  const handleCancel = () => {
    setForm({ ...user });
    setEditMode(false);
    setSmsRequested(false);
    setSmsCode('');
  };

  const handleSave = () => {
    setUser({ ...form });
    setEditMode(false);
    setSmsRequested(false);
    setSmsCode('');
  };

  // 인증번호 발송 (TODO: 실제 API 연동)
  const handleSendSms = () => {
    if (!form.phone.match(/^\d{10,11}$/)) {
      alert('휴대전화 번호 형식이 올바르지 않습니다.');
      return;
    }
    alert('인증번호를 발송했습니다.');
  };

  // 인증번호 확인 (TODO: 실제 API 연동)
  const handleVerifySms = () => {
    if (smsCode === '1234') alert('인증 완료!');
    else alert('인증번호가 올바르지 않습니다.');
  };

  return (
    <div className={styles.container}>
      {/* ─── 사이드바 ───────────────────────── */}
      <aside className={styles.sidebar}>

          {/* 1) 골드 박스에 “마이페이지” */}
        <div className={styles.sidebarHeader}>
          마이페이지
      </div>

      {/* 2) 프로필 사진 */}
        <div className={styles.sidebarProfile}>
          <Image
          src="/images/mypage/profile.png"
          width={80}
            height={80}
          alt="프로필"
          />
        </div>
       
        <ul className={styles.navList}>
                <li className={styles.navItemActive}>내 정보</li>
       <li className={styles.navItem}>
          <Link href="/mypage/issues">이슈 목록</Link>
        </li>
        </ul>
      </aside>

      {/* ─── 메인 콘텐츠 ──────────────────────── */}
      <main className={styles.mainContent}>
        <h1 className={styles.title}>내 정보</h1>

        {/* 프로필 카드 */}
        <div className={styles.profileCard}>
          <Image
            src="/images/mypage/person_mp.png"
            width={80}
            height={80}
            alt="프로필"
          />
          <div className={styles.profileText}>
            <span className={styles.profileName}>{user.name}</span>
            <span className={styles.profileSub}>넷앤드 / {user.email}</span>
          </div>
        </div>

        {/* 수정/저장/취소 버튼 */}
        <div className={styles.buttonWrapper}>
          {!editMode ? (
            <button className={styles.editBtn} onClick={handleEdit}>
              수정하기
            </button>
          ) : (
            <div className={styles.actionGroup}>
              <button className={styles.saveBtn} onClick={handleSave}>
                저장
              </button>
              <button className={styles.cancelBtn} onClick={handleCancel}>
                취소
              </button>
            </div>
          )}
        </div>

        {/* 정보 입력폼 */}
        <div
          className={
            editMode
              ? `${styles.fieldGroup} ${styles.fieldGroupEdit}`
              : styles.fieldGroup
          }
        >
          {fields.map(({ label, key, type }, idx) => (
            <div
              key={key}
              className={`${styles.fieldRow} ${
                idx === fields.length - 1 ? styles.last : ''
              }`}
            >
              <span className={styles.fieldLabel}>{label}</span>

              {editMode ? (
                <>
                  <input
                    name={key}
                    type={type}
                    value={form[key]}
                    onChange={handleChange}
                    readOnly={key === 'email'}
                    className={`${styles.fieldInput} ${
                      key === 'email' ? styles.fieldInputDisabled : ''
                    }`}
                  />
                  {key === 'phone' && (
                    <button
                      className={styles.smsBtn}
                      onClick={handleSendSms}
                    >
                      인증
                    </button>
                  )}
                </>
              ) : (
                <span className={styles.fieldValue}>{user[key]}</span>
              )}
            </div>
          ))}

          {editMode && smsRequested && (
            <div
              className={`${styles.fieldRow} ${styles.last} ${styles.divider}`}
            >
              <span className={styles.fieldLabel}>
                <Image
                  src="/images/signUp/checkbox.png"
                  width={26}
                  height={26}
                  alt="확인박스"
                />
              </span>
              <input
                type="text"
                value={smsCode}
                onChange={e => setSmsCode(e.target.value)}
                placeholder="인증번호 입력"
                className={styles.fieldInput}
              />
              <button
                className={styles.verifyBtn}
                onClick={handleVerifySms}
              >
                확인
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
