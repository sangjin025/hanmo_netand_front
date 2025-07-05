// src/app/signUp/components/SignUpForm.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './SignUpForm.module.css';
import { api } from '@/lib/api'; 

export default function SignUpForm() {

  // form state
  const [form, setForm] = useState({
    email: '',
    code: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    companyName: '',
  });

  

  // 네트워크 상태 관리용 state
const [loading, setLoading] = useState(false);
const [error, setError]     = useState<string|null>(null);
const [success, setSuccess] = useState(false);

// 1) 인증번호 발송
const handleSendCode = async () => {
  // try {
  //   await api.post('/auth/send-code', { email: form.email });
  //   alert('인증번호를 발송했습니다. 메일함을 확인하세요.');
  // } catch (e: any) {
  //   alert(e.response?.data || '발송 실패');
  // }
  
    console.log('[프론트] 인증 버튼 클릭, email =', form.email);
  try {
    // Next.js API 라우트를 쓴다면 '/api/auth/send-code'
    const res = await api.post('/auth/send-code', { email: form.email });
    console.log('[프론트] send-code 응답 →', res.data);
    alert(res.data.message);
  } catch (err: any) {
    console.error('[프론트] send-code 에러 →', err);
    alert(err.response?.data?.message || '발송 실패');
  }
};

// 2) 인증번호 확인
const handleVerifyCode = async () => {
  try {
    await api.post('/auth/verify-code', {
      email: form.email,
      code:  form.code
    });
    alert('이메일 인증이 완료되었습니다.');
    // 예: 인증완료 표시, 다음 단계 활성화
  } catch (e: any) {
    alert(e.response?.data || '인증 실패');
  }
};



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    setForm(prev => ({ ...prev, phone: onlyNums }));
  };

  // dropdown state
  const [companyType, setCompanyType] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // password toggle
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // agreement toggle & check
  const [agreementOpen, setAgreementOpen] = useState(false);
  const [agreementChecked, setAgreementChecked] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!agreementChecked) {
    setError('개인정보 활용 동의를 해주세요.');
    return;
  }
  if (form.password !== form.confirmPassword) {
    setError('비밀번호가 일치하지 않습니다.');
    return;
  }
  setLoading(true);
  setError(null);
  try {
    const payload = { ...form, companyType };
    await api.post('/auth/signup', payload);
    setSuccess(true);
  } catch (err: any) {
    setError(err.response?.data?.message || err.message || '오류가 발생했습니다.');
  } finally {
    setLoading(false);
  }
};



  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
     {error && <p className={styles.error}>{error}</p>}
      {/* 이메일·인증·비밀번호 */}
      <div className={styles.inputGroup}>
        {/* 이메일 */}
        <div className={styles.inputBox}>
          <Image 
                src="/images/signup/person.png" 
                width={24} height={24} 
                alt="이메일" 
                className={styles.icon}/>
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
          />
          <button type="button" className={styles.sideBtn} onClick={handleSendCode}>인증</button>
        </div>

        {/* 인증번호 */}
        <div className={styles.inputBox}>
          <Image 
                src="/images/signup/checkbox.png" 
                width={24} height={24} 
                alt="인증번호" 
                className={styles.icon}/>
          <input
            type="text"
            name="code"
            placeholder="인증 번호"
            value={form.code}
            onChange={handleChange}
          />
          <button type="button" className={styles.sideBtn} onClick={handleVerifyCode}>확인</button>
        </div>

        {/* 비밀번호 */}
        <div className={styles.inputBox}>
          <Image 
                src="/images/signup/lock.png" 
                width={24} height={24} 
                alt="비밀번호" 
                className={styles.icon}/>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
          />
          <button type="button" className={styles.visible} onClick={() => setShowPassword(prev => !prev)}>
            <Image
              src={showPassword ? '/images/login/eye-off.png' : '/images/login/eye.png'}
              width={24}
              height={24}
              alt={showPassword ? '숨김' : '표시'}
            />
          </button>
        </div>

        {/* 비밀번호 확인 */}
        <div className={styles.inputBox}>
          <Image 
                src="/images/signup/lock.png" 
                width={24} height={24} 
                alt="비밀번호 확인" 
                className={styles.icon}/>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <button type="button" className={styles.visible} onClick={() => setShowConfirmPassword(prev => !prev)}>
            <Image
              src={showConfirmPassword ? '/images/login/eye-off.png' : '/images/login/eye.png'}
              width={24}
              height={24}
              alt={showConfirmPassword ? '숨김' : '표시'}
            />
          </button>
        </div>
      </div>

      {/* 이름·전화번호·회사명·회사 구분 */}
      <div className={styles.inputGroup2}>
        {/* 이름 */}
        <div className={styles.inputBox2}>
          <Image
              src="/images/signup/person.png" 
              width={24} height={24} 
              alt="이름" 
              className={styles.icon}/>
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        {/* 휴대전화 */}
        <div className={styles.inputBox2}>
          <Image 
                src="/images/signup/phone.png" 
                width={24} height={24} 
                alt="휴대폰" 
                className={styles.icon_phone}/>
          <input
            type="text"
            name="phone"
            placeholder="휴대전화 번호"
            value={form.phone}
            onChange={handlePhoneChange}
          />
        </div>

        {/* 회사명 */}
        <div className={styles.inputBox2}>
          <Image 
                src="/images/signup/building.png" 
                width={24} height={24} 
                alt="회사명" 
                className={styles.icon_building}/>
          <input
            type="text"
            name="companyName"
            placeholder="회사명"
            value={form.companyName}
            onChange={handleChange}
          />
        </div>

        {/* 회사 구분 */}
        <div className={styles.dropdownContainer}>
          <div className={styles.dropdownHeader} onClick={() => setDropdownOpen(prev => !prev)}>
            <Image 
                  src="/images/signup/building.png" 
                  width={24} height={24} 
                  alt="회사 구분" 
                  className={styles.icon_building}/>
            <span className={`${styles.label} ${companyType ? styles.labelSelected : ''}`}>
              {companyType || '회사 구분'}
            </span>
            <button type="button" className={styles.arrowBtn}>
              <Image
                  src="/images/signup/arrow.png"
                  width={20}
                  height={20}
                  alt=""
                  style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none' }}
              />
              
            </button>
            
          </div>
          {dropdownOpen && (
            <ul className={styles.dropdownList}>
              {['고객사','파트너사','엔지니어'].map(item => (
                <li
                  key={item}
                  className={styles.dropdownItem}
                  onClick={() => { setCompanyType(item); setDropdownOpen(false); }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 개인정보 활용 동의 */}
      <div className={styles.agreementContainer}>
        <div className={styles.agreementHeader}>
          <button
            type="button"
            className={styles.checkBtn}
            onClick={() => setAgreementChecked(prev => !prev)}
          >
            <Image
              src={agreementChecked ? '/images/signup/checked.png' : '/images/signup/checkbox.png'}
              width={24}
              height={24}
              alt={agreementChecked ? '동의됨' : '미동의'}
            />
          </button>
          <span className={styles.agreementLabel}>[필수] 개인정보 활용 동의</span>
          <button
            type="button"
            className={styles.arrowBtn}
            onClick={() => setAgreementOpen(prev => !prev)}
          >
            <Image
              src="/images/signup/arrow.png"
              width={20}
              height={20}
              alt=""
              style={{ transform: agreementOpen ? 'rotate(180deg)' : 'none' }}
            />
          </button>
        </div>
        {agreementOpen && (
          <div className={styles.agreementContent}>
            <p>본인은 회사의 개인정보 처리방침에 따라 본인의 개인정보가 수집·이용되는 것에 동의합니다.</p>
            <p>
              • 수집 항목: 이름, 이메일, 휴대전화 번호, 회사명 등<br/>
              • 보유 기간: 회원 탈퇴 시까지<br/>
              • 이용 목적: 회원 관리, 서비스 제공
            </p>
          </div>
        )}
      </div>

      {/* 가입하기 */}
      <button
        type="submit"
        disabled={loading}  // 💡 로딩 중에 비활성화
        className={`${styles.submitBtn} ${loading ? styles.disabled : styles.enabled}`}
      >
        {loading ? '가입 중…' : '가입하기'}  {/* 💡 로딩 중 문구 변경 */}
      </button>
    </form>
  );
}
