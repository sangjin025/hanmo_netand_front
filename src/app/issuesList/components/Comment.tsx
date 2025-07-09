"use client";

import React from "react";
import styles from "./Comment.module.css";

export interface CommentProps {
  id: number | string;
  author: string;
  role?: string;
  timestamp: string;  
  content: string;
  isListItem?: boolean;
}

export function Comment({
  author,
  role,
  timestamp,
  content,
  isListItem = false,
}: CommentProps) {
  return (
    <>
    <div className={styles.listBox}>목록</div>
    
  <p style={{ color: "black" }}>댓글 3개</p>
    <hr className={styles.divider}/>
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.author}>
          {author}{role && ` ${role}`}
        </span>
        <span className={styles.timestamp}>{timestamp}</span>
      </div>
      <div className={styles.content}>
        {isListItem ? (
          <ul className={styles.bulletList}>
            <li>{content}</li>
          </ul>
        ) : (
          <p>{content}</p>
        )}
      </div>
    </div>
    </>
  );
}

export default Comment;
