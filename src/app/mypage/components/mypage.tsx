// app/mypage/mypage.tsx
'use client';

import React, { useState, ChangeEvent } from 'react';
import styles from './mypage.module.css';


// 사용자 정보 타입 정의
interface UserInfo {
  name: string;
  email: string;
  phone: string;
}
type FieldKey = keyof UserInfo;

// 필드별 라벨 · 키 · input 타입 매핑
const fields: { label: string; key: FieldKey; type: string }[] = [
  { label: '이름', key: 'name', type: 'text' },
  { label: '이메일', key: 'email', type: 'email' },
  { label: '휴대전화 번호', key: 'phone', type: 'tel' },
];

export default function MyPage() {
  // 초기 유저 정보 (실제론 API 호출)
  const [user, setUser] = useState<UserInfo>({
    name: '홍길동',
    email: 'juju009@naver.com',
    phone: '010-1234-5678',
  });
  const [form, setForm] = useState<UserInfo>({ ...user });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as FieldKey;
    setForm(prev => ({ ...prev, [key]: e.target.value }));
  };

  const handleEdit = () => {
    setForm({ ...user });
    setEditMode(true);
  };
  const handleCancel = () => {
    setForm({ ...user });
    setEditMode(false);
  };
  const handleSave = () => {
    // TODO: API로 저장
    setUser({ ...form });
    setEditMode(false);
  };

  return (
    <>
      {/* 프로필 카드 */}
      <div className={styles.profileCard}>
        <div className={styles.avatarCircle} />
        <div className={styles.profileText}>
          <span className={styles.profileName}>{user.name}</span>
          <span className={styles.profileSub}>넷앤드 / {user.email}</span>
        </div>
      </div>

      {/* 수정 / 저장·취소 버튼 */}
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

      {/* 정보 필드 */}
      <div className={styles.fieldGroup}>
        {fields.map(({ label, key, type }, idx) => (
          <div
            key={key}
            className={`${styles.fieldRow} ${idx === fields.length - 1 ? styles.last : ''}`}
          >
            {/* 아이콘
            {key === 'name' && <UserIcon className={styles.fieldIcon} />}
            {key === 'email' && <Mail className={styles.fieldIcon} />}
            {key === 'phone' && <Smartphone className={styles.fieldIcon} />} */}

            {/* 라벨 */}
            <span className={styles.fieldLabel}>{label}</span>

            {/* 값 or 입력창 */}
            {editMode ? (
              <input
                name={key}
                type={type}
                value={form[key]}
                onChange={handleChange}
                className={styles.fieldInput}
              />
            ) : (
              <span className={styles.fieldValue}>{user[key]}</span>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
