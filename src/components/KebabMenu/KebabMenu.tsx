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
    </div>
  );
}
