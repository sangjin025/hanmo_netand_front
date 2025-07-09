"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./SignUpForm.module.css";
import { api } from "@/lib/api";
import axios from "axios";

export default function SignUpForm() {
  // form state
  const [form, setForm] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    userType: "",
  });

  // 네트워크 상태 관리용 state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [userType, setUserType] = useState<UserType | "">("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 1) 인증번호 발송
  const handleSendCode = async () => {
    try {
      const res = await api.post("/api/v1/auth/email/send", {
        email: form.email,
      });
      console.log("[프론트] send-code 응답 →", res.data);
      alert(res.data.message);
    } catch (err: any) {
      console.error("[프론트] send-code 에러 →", err);
      alert(err.response?.data?.message || "발송 실패");
    }
  };

  // 2) 인증번호 확인
  const handleVerifyCode = async () => {
    try {
      const res = await api.post("/api/v1/auth/email/verify", {
        code: form.code,
      });
      alert(res.data.message); // ← 서버가 준 message 필드만 띄우세요.
      // 예: 인증완료 표시, 다음 단계 활성화
    } catch (err: any) {
      // 서버가 { message: "Invalid code" } 처럼 보낸다고 가정
      const serverMsg = err.response?.data?.message;
      alert(serverMsg ?? "인증에 실패했습니다.");
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    setForm((prev) => ({ ...prev, phone: onlyNums }));
  };

  // Swagger 스펙에 맞춘 유니언 타입
  type UserType = "NETAND_REPORTER" | "NETAND_ENGINEER" | "PARTNER_ENGINEER";

  const userTypeOptions: { label: string; value: UserType }[] = [
    { label: "넷앤드 소속 이슈 발의 담당자", value: "NETAND_REPORTER" },
    { label: "넷앤드 엔지니어", value: "NETAND_ENGINEER" },
    { label: "파트너사 엔지니어", value: "PARTNER_ENGINEER" },
  ];

  // password toggle
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // agreement toggle & check
  const [agreementOpen, setAgreementOpen] = useState(false);
  const [agreementChecked, setAgreementChecked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreementChecked) {
      setError("개인정보 활용 동의를 해주세요.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      // 이미 userType 상태에 코드값이 들어 있으므로, 그대로 payload 에 포함
      const payload = {
        ...form,
        userType, // ← 이미 코드값이 들어 있는 상태 그대로
      };
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signup`;
      await axios.post(url, payload);
      setSuccess(true);
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  const entries: Entry[] = [
    { label: "이메일", name: "email", value: form.email },
    { label: "비밀번호", name: "password", value: form.password },
    { label: "이름", name: "name", value: form.name },
    { label: "휴대전화 번호", name: "phone", value: form.phone },
    { label: "회사구분", name: "userType", value: form.userType },
  ];

  useEffect(() => {});

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      {error && <p className={styles.error}>{error}</p>}
      {/* 이메일·인증·비밀번호 */}
      <div className={styles.inputGroup}>
        {/* 이메일 */}
        <div className={styles.inputBox}>
          <Image
            src="/images/signup/person.png"
            width={24}
            height={24}
            alt="이메일"
            className={styles.icon}
          />
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleChange}
          />
          <button
            type="button"
            className={styles.sideBtn}
            onClick={handleSendCode}
          >
            인증
          </button>
        </div>

        {/* 인증번호 */}
        <div className={styles.inputBox}>
          <Image
            src="/images/signup/checkbox.png"
            width={24}
            height={24}
            alt="인증번호"
            className={styles.icon}
          />
          <input
            type="text"
            name="code"
            placeholder="인증 번호"
            value={form.code}
            onChange={handleChange}
          />
          <button
            type="button"
            className={styles.sideBtn}
            onClick={handleVerifyCode}
          >
            확인
          </button>
        </div>

        {/* 비밀번호 */}
        <div className={styles.inputBox}>
          <Image
            src="/images/signup/lock.png"
            width={24}
            height={24}
            alt="비밀번호"
            className={styles.icon}
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className={styles.visible}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <Image
              src={
                showPassword
                  ? "/images/login/eye-off.png"
                  : "/images/login/eye.png"
              }
              width={24}
              height={24}
              alt={showPassword ? "숨김" : "표시"}
            />
          </button>
        </div>

        {/* 비밀번호 확인 */}
        <div className={styles.inputBox}>
          <Image
            src="/images/signup/lock.png"
            width={24}
            height={24}
            alt="비밀번호 확인"
            className={styles.icon}
          />
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="button"
            className={styles.visible}
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            <Image
              src={
                showConfirmPassword
                  ? "/images/login/eye-off.png"
                  : "/images/login/eye.png"
              }
              width={24}
              height={24}
              alt={showConfirmPassword ? "숨김" : "표시"}
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
            width={24}
            height={24}
            alt="이름"
            className={styles.icon}
          />
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
            width={24}
            height={24}
            alt="휴대폰"
            className={styles.icon_phone}
          />
          <input
            type="text"
            name="phone"
            placeholder="휴대전화 번호"
            value={form.phone}
            onChange={handlePhoneChange}
          />
        </div>

        {/* 회사 구분 */}
        <div className={styles.dropdownContainer}>
          <div
            className={styles.dropdownHeader}
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <Image
              src="/images/signup/building.png"
              width={24}
              height={24}
              alt="회사 구분"
              className={styles.icon_building}
            />
            <span
              className={`${styles.label} ${
                userType ? styles.labelSelected : ""
              }`}
            >
              {userTypeOptions.find((o) => o.value === userType)?.label ??
                "회사 구분"}
            </span>
            <button type="button" className={styles.arrowBtn}>
              <Image
                src="/images/signup/arrow.png"
                width={20}
                height={20}
                alt=""
                style={{ transform: dropdownOpen ? "rotate(180deg)" : "none" }}
              />
            </button>
          </div>
          {dropdownOpen && (
            <ul className={styles.dropdownList}>
              {userTypeOptions.map((opt) => (
                <li
                  key={opt.value}
                  className={styles.dropdownItem}
                  onClick={() => {
                    setUserType(opt.value); // ← 바로 코드값(value) 저장
                    setDropdownOpen(false);
                  }}
                >
                  {opt.label}
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
            onClick={() => setAgreementChecked((prev) => !prev)}
          >
            <Image
              src={
                agreementChecked
                  ? "/images/signup/checked.png"
                  : "/images/signup/checkbox.png"
              }
              width={24}
              height={24}
              alt={agreementChecked ? "동의됨" : "미동의"}
            />
          </button>
          <span className={styles.agreementLabel}>
            [필수] 개인정보 활용 동의
          </span>
          <button
            type="button"
            className={styles.arrowBtn}
            onClick={() => setAgreementOpen((prev) => !prev)}
          >
            <Image
              src="/images/signup/arrow.png"
              width={20}
              height={20}
              alt=""
              style={{ transform: agreementOpen ? "rotate(180deg)" : "none" }}
            />
          </button>
        </div>
        {agreementOpen && (
          <div className={styles.agreementContent}>
            <p>
              본인은 회사의 개인정보 처리방침에 따라 본인의 개인정보가
              수집·이용되는 것에 동의합니다.
            </p>
            <p>
              • 수집 항목: 이름, 이메일, 휴대전화 번호, 회사명 등<br />
              • 보유 기간: 회원 탈퇴 시까지
              <br />• 이용 목적: 회원 관리, 서비스 제공
            </p>
          </div>
        )}
      </div>

      {/* 가입하기 */}
      <button
        type="submit"
        disabled={loading} // 💡 로딩 중에 비활성화
        className={`${styles.submitBtn} ${
          loading ? styles.disabled : styles.enabled
        }`}
      >
        {loading ? "가입 중…" : "가입하기"} {/* 💡 로딩 중 문구 변경 */}
      </button>
    </form>
  );
}
