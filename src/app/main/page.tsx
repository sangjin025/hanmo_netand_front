"use client";
import styles from "./page.module.css";
import ProfileCard from "./components/ProfileCard/page";
import NoticeList from "./components/NoticeList/NoticeList";
import MonthlySummary from "./components/MonthlySummary/page";
import MonthlyCalendar from "./components/MonthlyCalendar/page";
import { useState } from "react";

export default function Main() {
  return (
    <main className={styles.container}>
      <div>
        <ProfileCard
        // avatarUrl="/images/user1.jpg"
        // name="홍길동"
        // affiliation="넷앤드"
        // email="hong@example.com"
        />
        <NoticeList />
        <MonthlySummary />
      </div>
      <div>
        <MonthlyCalendar />
      </div>
    </main>
  );4
}
