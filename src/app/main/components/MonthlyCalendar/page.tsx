"use client";
import styles from "./page.module.css";
import FullCalendar, { EventInput, DatesSetArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import { useState } from "react";

interface MonthlyCalendarProps {
  events: EventInput[];
}

export default function MonthlyCalendar({ events }: MonthlyCalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  return (
    <div className={styles.container}>
      <div className={styles.calendarWrapper}>
        <div className={styles.calendarArea}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth" // 높이는 FullCalendar의 prop으로
            locale={koLocale}
            headerToolbar={{
              left: "prev",
              center: "dateTitle",
              right: "next",
            }}
            customButtons={{
              dateTitle: {
                text: `${month + 1}월 일정`,
              },
            }}
            datesSet={(arg: DatesSetArg) => {
              setCurrentDate(arg.start);
            }}
            height="100%"
            dayMaxEvents={3}
            events={events}
          />
        </div>
      </div>
    </div>
  );
}
