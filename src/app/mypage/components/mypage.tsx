'use client';
import Image from 'next/image';
import React, { useState, ChangeEvent, ReactNode } from 'react';
import styles from './mypage.module.css';


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
  { label: <Image src="/images/mypage/person_mp.png" alt="이름" width={26} height={26} />, key: 'name', type: 'text' },
  { label: <Image src="/images/mypage/person_mp.png" alt="이메일" width={26} height={26} />, key: 'email', type: 'email' },
  { label: <Image src="/images/mypage/phone_mp.png" alt="전화번호" width={20} height={26} />, key: 'phone', type: 'tel' },
];

export default function MyPage() {
  const [user, setUser] = useState<UserInfo>({ name: '홍길동', email: 'juju009@naver.com', phone: '010-1234-5678' });
  const [form, setForm] = useState<UserInfo>({ ...user });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as FieldKey;
    setForm(prev => ({ ...prev, [key]: e.target.value }));
  };

  const handleEdit = () => { setForm({ ...user }); setEditMode(true); };
  const handleCancel = () => { setForm({ ...user }); setEditMode(false); };
  const handleSave = () => { setUser({ ...form }); setEditMode(false); };

  return (
    <>
      <div className={styles.profileCard}>
        <div>
        <Image
              src = "/images/mypage/person_mp.png"
              width ={80} height = {80}
              alt ="사람이미지"
              />
        </div>
        <div className={styles.profileText}>
          <span className={styles.profileName}>{user.name}</span>
          <span className={styles.profileSub}>넷앤드 / {user.email}</span>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
      {!editMode ? (
        <button className={styles.editBtn} onClick={handleEdit}>수정하기</button>
      ) : (
        <div className={styles.actionGroup}>
          <button className={styles.saveBtn} onClick={handleSave}>저장</button>
          <button className={styles.cancelBtn} onClick={handleCancel}>취소</button>
        </div>
      )}
      </div>

      <div className={editMode ? `${styles.fieldGroup} ${styles.fieldGroupEdit}` : styles.fieldGroup}>
        {fields.map(({ label, key, type }, idx) => (
          <div key={key} className={`${styles.fieldRow} ${idx === fields.length - 1 ? styles.last : ''}`}>
            <span className={styles.fieldLabel}>{label}</span>
            {editMode ? (
              <input
                name={key}
                type={type}
                value={form[key]}
                onChange={handleChange}
                readOnly={key === 'email'}
                className={`${styles.fieldInput} ${key === 'email' ? styles.fieldInputDisabled : ''}`}
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