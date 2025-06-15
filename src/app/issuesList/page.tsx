"use client";

import styles from "./page.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import PostList from "./components/PostList";

export default function IssuesList() {
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.error("토큰이 없습니다.");
        return;
      }

      // const url = `${process.env.NEXT_PUBLIC_API_BASE_URL/}`
    };
  }, []);

  return <PostList />;
}
