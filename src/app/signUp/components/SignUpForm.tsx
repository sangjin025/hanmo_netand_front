'use client';

import React, { useState } from 'react';
import styles from './SignUpForm.module.css';

import emailIcon from '../../assets/icons/email.png';
import checkboxIcon from '../../assets/icons/체크박스.png';
import lockIcon from '../../assets/icons/자물쇠.png';
import phoneIcon from '../../assets/icons/휴대폰.png';
import buildingIcon from '../../assets/icons/회사.png';
import arrowIcon from '../../assets/icons/Vector 1.png';
import eyeOffIcon from '../../assets/icons/안보이게.png';
import eyeOnIcon from '../../assets/icons/보이게.png'; // 눈 켠 상태 아이콘도 있어야 함

const SignUpForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    setForm(prev => ({ ...prev, phone: onlyNums }));
  };

  const [companyType, setCompanyType] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className={styles.wrapper}>
      {/* 이메일, 인증번호, 비밀번호 */}
      <div className={styles.inputGroup}>
        <div className={styles.inputBox}>
          <img src={emailIcon.src} alt="이메일" className={styles.icon} />
          <input type="email" placeholder="이메일" name="email" onChange={handleChange} />
          <button className={styles.sideBtn}>인증</button>
        </div>

        <div className={styles.inputBox}>
          <img src={checkboxIcon.src} alt="인증번호" className={styles.icon} />
          <input type="text" placeholder="인증 번호" />
          <button className={styles.sideBtn}>확인</button>
        </div>

        <div className={styles.inputBox}>
          <img src={lockIcon.src} alt="비밀번호" className={styles.icon_lock} />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호"
            name="password"
            onChange={handleChange}
          />
          <button
            className={styles.visible}
            onClick={() => setShowPassword(prev => !prev)}
            type="button"
          >
            <img src={showPassword ? eyeOnIcon.src : eyeOffIcon.src} alt="비밀번호 보기 전환" />
          </button>
        </div>

        <div className={styles.inputBox}>
          <img src={lockIcon.src} alt="비밀번호 확인" className={styles.icon_lock} />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="비밀번호 확인"
          />
          <button
            className={styles.visible}
            onClick={() => setShowConfirmPassword(prev => !prev)}
            type="button"
          >
            <img src={showConfirmPassword ? eyeOnIcon.src : eyeOffIcon.src} alt="비밀번호 보기 전환" />
          </button>
        </div>
      </div>

      {/* 이름, 전화번호, 회사명, 회사구분 */}
      <div className={styles.inputGroup2}>
        <div className={styles.inputBox2}>
          <img src={emailIcon.src} alt="이름" className={styles.icon} />
          <input type="text" placeholder="이름" name="name" onChange={handleChange} />
        </div>

        <div className={styles.inputBox2}>
          <img src={phoneIcon.src} alt="휴대폰" className={styles.icon_phone} />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handlePhoneChange}
            placeholder="휴대전화 번호"
          />
        </div>

        <div className={styles.inputBox2}>
          <img src={buildingIcon.src} alt="회사명" className={styles.icon_building} />
          <input type="text" placeholder="회사명" />
        </div>

        <div className={styles.dropdownContainer}>
          <div
            className={styles.dropdownHeader}
            onClick={() => setDropdownOpen(prev => !prev)}
          >
            <img
              src={buildingIcon.src}
              alt="회사 구분"
              className={styles.icon_building}
            />
            <span
              className={`${styles.label} ${
                companyType ? styles.labelSelected : ''
              }`}
            >
              {companyType || '회사 구분'}
            </span>
            <button className={styles.arrowBtn} type="button">
              <img src={arrowIcon.src} alt="열기" />
            </button>
          </div>

          {dropdownOpen && (
            <ul className={styles.dropdownList}>
              {['고객사', '파트너사', '엔지니어'].map(item => (
                <li
                  key={item}
                  className={styles.dropdownItem}
                  onClick={() => {
                    setCompanyType(item);
                    setDropdownOpen(false);
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
