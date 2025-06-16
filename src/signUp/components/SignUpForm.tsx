import React, { useState } from 'react';
import styles from './SignUpForm.module.css';
import email from '../../assets/icons/email.png';
import Box from '../../assets/icons/체크박스.png';
import lock from '../../assets/icons/자물쇠.png';
import phone from '../../assets/icons/휴대폰.png';
import building from '../../assets/icons/회사.png';
import arrow from '../../assets/icons/Vector 1.png';
import unvisible from '../../assets/icons/안보이게.png'; // 가능하면 영어 이름 추천

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('제출된 값:', form);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    setForm(prev => ({ ...prev, phone: onlyNums }));
  };

  const [companyType, setCompanyType] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      {/* 그룹 1: 이메일, 인증번호, 비밀번호 */}
      <div className={styles.inputGroup}>
        <div className={styles.inputBox}>
          <img src={email} alt="이메일" className={styles.icon} />
          <input type="email" placeholder="이메일" />
          <button className={styles.sideBtn}>인증</button>
        </div>

        <div className={styles.inputBox}>
          <img src={Box} alt="인증번호" className={styles.icon} />
          <input type="text" placeholder="인증 번호" />
          <button className={styles.sideBtn}>확인</button>
        </div>

        <div className={styles.inputBox}>
          <img src={lock} alt="비밀번호" className={styles.icon_lock} />
          <input type="password" placeholder="비밀번호" />
          <button className={styles.visible}>
            <img src={unvisible} alt="안보이게" />
          </button>
        </div>

        <div className={styles.inputBox}>
          <img src={lock} alt="비밀번호 확인" className={styles.icon_lock} />
          <input type="password" placeholder="비밀번호 확인" />
          <button className={styles.visible}>
            <img src={unvisible} alt="안보이게" />
          </button>
        </div>
      </div>

      {/* 그룹 2: 이름, 전화번호, 회사명, 회사구분 */}
      <div className={styles.inputGroup2}>
        <div className={styles.inputBox2}>
          <img src={email} alt="이름" className={styles.icon} />
          <input type="text" placeholder="이름" />
        </div>

        <div className={styles.inputBox2}>
          <img src={phone} alt="휴대폰" className={styles.icon_phone} />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handlePhoneChange}
            placeholder="휴대전화 번호"
          />
        </div>

        <div className={styles.inputBox2}>
          <img src={building} alt="회사명" className={styles.icon_building} />
          <input type="text" placeholder="회사명" />
        </div>

        <div className={styles.dropdownContainer}>
          <div
            className={styles.dropdownHeader}
            onClick={() => setDropdownOpen(prev => !prev)}
          >
            <img
              src={building}
              alt="회사구분"
              className={styles.icon_building}
            />
           <span className={`${styles.label} ${companyType ? styles.labelSelected : ''}`}>{companyType || '회사 구분'}
           </span>
            <button className={styles.arrowBtn}>
              <img src={arrow} alt="열기" />
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
