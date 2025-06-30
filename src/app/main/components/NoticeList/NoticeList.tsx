"use client";

import ReactPaginate from "react-paginate";
import styles from "./page.module.css";
import { Notification, InspectionDate } from "../type";

interface NoticeListProps {
  notifications: Notification[];
  inspectionDates: InspectionDate[];
  markAsRead: (notificationId: number) => void;
  onPageChange: (selectedPage: number) => void;
  currentPage: number;
}

export default function NoticeList({
  notifications,
  inspectionDates,
  currentPage,
  onPageChange,
  markAsRead,
}: NoticeListProps) {
  const ITEMS_PER_PAGE = 4;

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const pageCount = Math.ceil(notifications.length / ITEMS_PER_PAGE);
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = notifications.slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <div className={styles.container}>
      <div className={styles.title}>주요알림</div>
      <div className={styles.noticeBoxes}>
        <div className={styles.noticeBox}>
          {`>> 미확인 알림이 ${unreadCount}건 있습니다.`}
        </div>
        {currentItems.map((n) => (
          <div
            key={n.notificationId}
            className={styles.noticeBox}
            onClick={() => markAsRead(n.notificationId)}
          >
            {`>> ${n.content} ${n.targetId}`}
          </div>
        ))}
        {currentItems.length < ITEMS_PER_PAGE &&
          Array(ITEMS_PER_PAGE - currentItems.length)
            .fill(0)
            .map((_, i) => <div key={i} className={styles.noticeBox} />)}
        <div className={styles.paginationWrapper}>
          <ReactPaginate
            pageCount={pageCount}
            onPageChange={({ selected }) => onPageChange(selected)}
            forcePage={currentPage}
            previousLabel="<"
            nextLabel=">"
            containerClassName={styles.pagination}
            pageClassName={styles.page}
            activeClassName={styles.activePage}
            disabledClassName={styles.disabled}
          />
        </div>
      </div>
    </div>
  );
}
