"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CommentSection.module.css";
type Comment = {
  id: number;
  writerName: string;
  content: string;
  createdAt: string;
};

type Props = {
  issueId: string;
};

export default function CommentSection({ issueId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  function formatDate(dateString: string) {
    const d = new Date(dateString);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hour = String(d.getHours()).padStart(2, "0");
    const minute = String(d.getMinutes()).padStart(2, "0");
    const second = String(d.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/issues/${issueId}/comments`,
          { headers: { authorization: token } }
        );
        console.log("댓글 API 응답:", res.data);
        setComments(res.data.data);
      } catch (err) {
        console.error("댓글 불러오기 실패", err);
      }
    };

    fetchComments();
  }, [issueId]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/issues/${issueId}/comments`,
        { content: newComment },
        { headers: { authorization: token } }
      );
      setNewComment("");
      setComments((prev) => [...prev, res.data.data]); // 새로운 댓글 추가
    } catch (err) {
      console.error("댓글 작성 실패", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}> 댓글 </div>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <div className={styles.nameAndTime}>
              <strong>{comment.writerName} </strong>
              <div className={styles.createdAt}>
                {" "}
                {formatDate(comment.createdAt)}{" "}
              </div>
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
      <textarea
        value={newComment}
        className={styles.textArea}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="댓글을 입력하세요"
        rows={3}
        style={{ width: "100%" }}
      />
      <button className={styles.commentBtn} onClick={handleSubmit}>
        댓글 등록
      </button>
    </div>
  );
}
