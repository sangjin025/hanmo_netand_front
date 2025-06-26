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
    </div>
  );
}
