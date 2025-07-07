"use client";
import styles from "./MonthlyCalendar.module.css";
import { Calendar } from "@fullcalendar/core";
const _keepCore = Calendar.name;
import FullCalendar from "@fullcalendar/react";
import type { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface MonthlyCalendarProps {
  events: CalendarOptions["events"];
}

export default function MonthlyCalendar({ events }: MonthlyCalendarProps) {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  const calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    locale: koLocale,
    headerToolbar: { left: "prev", center: "dateTitle", right: "next" },
    customButtons: { dateTitle: { text: `${month + 1}월 일정` } },
    datesSet: (arg) => setCurrentDate(arg.start),
    height: "100%",
    dayMaxEvents: 3,
    events,
    eventClick: (info) => {
      const id = info.event.id;
      router.push(`/maintenance/${id}`);
    },
    eventDidMount: (info) => {
      info.el.style.cursor = "pointer";
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.calendarWrapper}>
        <div className={styles.calendarArea}>
          <FullCalendar {...calendarOptions} />
        </div>
      </div>
    </div>
  );
}
