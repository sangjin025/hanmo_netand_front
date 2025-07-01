<<<<<<< HEAD
"use client";

import styles from "./ProfileCard.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileCard() {
  const [profile, setProfile] = useState<MyProfile | null>(null);

  interface ApiResponse<T> {
    data: T;
  }

  interface MyProfile {
    name: string;
    email: string;
    phone: string;
  }

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/me`;
        const res = await axios.get<ApiResponse<MyProfile>>(url, {
          headers: { Authorization: token },
        });
        setProfile(res.data.data);
      } catch (err) {
        console.error("❌ 프로필 조회 실패:", err);
      }
    };

    fetchProfile();
  }, []);

=======
import styles from "./ProfileCard.module.css";
import Image from "next/image";

export default function ProfileCard() {
>>>>>>> ccc92c4 (fix: 컴포넌트 구조 및 CSS import 정리로 배포 오류 해결)
  return (
    <div className={styles.container}>
      <div className={styles.avatarWrapper}>
        <Image
          src="/images/avatar.png"
          alt=""
          width={90}
          height={90}
          className={styles.avatar}
        />
      </div>
      <div className={styles.info}>
<<<<<<< HEAD
        <div className={styles.name}> {profile?.name} </div>
        <div className={styles.details}>
          {profile?.phone} / {profile?.email}
        </div>
=======
        <div className={styles.name}> 홍길동 </div>
        <div className={styles.details}> 넷앤드 / juju009@naver.com </div>
>>>>>>> ccc92c4 (fix: 컴포넌트 구조 및 CSS import 정리로 배포 오류 해결)
      </div>
    </div>
  );
}
