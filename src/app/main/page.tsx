"use client";
import styles from "./page.module.css";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import NoticeList from "./components/NoticeList/NoticeList";
import MonthlySummary from "./components/MonthlySummary/MonthlySummary";
import MonthlyCalendar from "./components/MonthlyCalendar/MonthlyCalendar";
import { useState, useEffect } from "react";
import axios from "axios";

interface Notification {
  notificationId: number;
  targetId: number;
  content: string;
  createdAt: string;
  isRead: boolean;
  notificationType: string;
}

interface InspectionDetailResponse {
  data: {
    inspectionId: number;
    nextInspectionDate: string;
  };
}
export default function Main() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [inspectionDates, setInspectionDates] = useState<
    { id: number; nextInspectionDate: string }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notifications`,
          {
            headers: { authorization: token },
          }
        );
        console.log("알림데이터: ", res.data.data);
        setNotifications(res.data.data);
      } catch (err) {
        console.error("❌ 알림 조회 실패:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchInspectionDates = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/inspections/inspections`,
          { headers: { Authorization: token } }
        );

        console.log("잉 :", res.data.data.content);
        const list = res.data.data.content;
        const results = list.map(
          (i: { inspectionId: number; nextInspectionDate: string }) => ({
            id: i.inspectionId,
            nextInspectionDate: i.nextInspectionDate,
          })
        );
        setInspectionDates(results);
      } catch (err) {
        console.error("❌ 전체 검사 일정 조회 실패:", err);
        setInspectionDates([]);
      }
    };

    fetchInspectionDates();
  }, []);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const markAsRead = async (id: number) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notifications/${id}/read`,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
          withCredentials: true,
        }
      );
      setNotifications((prev) =>
        prev.map((n) => (n.notificationId === id ? { ...n, isRead: true } : n))
      );
      alert("알람을 읽음 처리 했습니다.");
    } catch (err) {
      console.error("❌ 읽음 처리 실패:", err);
      alert("알람을 읽음 처리하지 못했습니다.");
    }
  };

  const deleteNotification = async (id: number) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/notifications/${id}`,
        { headers: { Authorization: token } }
      );
      setNotifications(
        (prev) => prev.filter((n) => n.notificationId !== id) // 로컬에서도 제거
      );
    } catch (err) {
      console.error("알림 삭제 실패:", err);
      alert("알림을 삭제하지 못했습니다.");
    }
  };

  function getRandomColor() {
    return (
      "#" +
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0")
    );
  }

  const calendarEvents = inspectionDates.map(({ id, nextInspectionDate }) => ({
    id: String(id),
    title: `${id}번 점검`,
    date: nextInspectionDate,
    color: getRandomColor(),
  }));

  return (
    <main className={styles.container}>
      <div>
        <ProfileCard />
        <NoticeList
          notifications={notifications}
          inspectionDates={inspectionDates}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          markAsRead={markAsRead}
          deleteNotification={deleteNotification}
        />
        <MonthlySummary />
      </div>
      <div>
        <MonthlyCalendar events={calendarEvents} />
      </div>
    </main>
  );
}
