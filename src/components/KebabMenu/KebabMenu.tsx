"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "./KebabMenu.module.css";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function KebabMenu({ onEdit, onDelete }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button
        className={styles.kebab}
        onClick={() => setOpen((o) => !o)}
        aria-label="더보기 메뉴"
      >
        <Image
          src="/images/kebab.png"
          width={8}
          height={32}
          alt="더보기
        "
        />
      </button>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9f4e1ef (정기점검 상세: PostDetail에 KebabMenu 추가 및 수정·삭제 API 연동)
      {open && (
        <div className={styles.dropdown}>
          <button className={styles.item} onClick={onEdit}>
            ✏️ 수정하기
          </button>
          <button className={styles.item} onClick={onDelete}>
            🗑️ 삭제하기
          </button>
          <button
            className={styles.closeBtn}
            onClick={() => setOpen(false)}
            aria-label="메뉴 닫기"
          >
            ✕
          </button>
        </div>
      )}
<<<<<<< HEAD
=======
>>>>>>> 6ee4712 (정기점검 모듈: 검색 기능, 동적 라우팅, 상세/목록/등록 페이지 구현)
=======
>>>>>>> 9f4e1ef (정기점검 상세: PostDetail에 KebabMenu 추가 및 수정·삭제 API 연동)
    </div>
  );
}
