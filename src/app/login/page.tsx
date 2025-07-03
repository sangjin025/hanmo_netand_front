"use client";

import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/login`;
  const loginFunction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const res = await api.post(url, {
      email,
      password,
    });
    const token = res.headers.authorization;
    localStorage.setItem("accessToken", token);

    if (res.status === 200) {
      router.push("./main");
    }
    console.log("login res:", res);
    console.log(localStorage.getItem("accessToken"));
  };

  return (
    <main className={styles.container}>
      <div className={styles.title}> 로그인 </div>
      <form className={styles.loginForm} onSubmit={loginFunction}>
        <div className={styles.idpwSection}>
          <div>
            <Image
              src="/images/login/idIcon.png"
              alt=""
              width={33}
              height={34}
            />
          </div>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>
        <div className={`${styles.idpwSection} ${styles.pwSection}`}>
          <div className={styles.pwSectionLf}>
            <div>
              <Image
                src="/images/login/pwIcon.png"
                alt=""
                width={33}
                height={34}
              />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </div>
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <Image
              src={
                showPassword
                  ? "/images/login/eye-off.png"
                  : "/images/login/eye.png"
              }
              alt=""
              width={23.48}
              height={18.67}
            />
          </button>
        </div>
        <button type="submit" className={styles.loginButton}>
          로그인
        </button>
      </form>
      <div className={styles.btmSection}>
        <div> 회원가입 </div>
        <div> 아이디 찾기 / 비밀번호 찾기 </div>
      </div>
    </main>
  );
}
