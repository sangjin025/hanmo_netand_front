"use client";
import styles from "./page.module.css";
import { Calendar } from "@fullcalendar/core";
const _keepCore = Calendar.name;
// import FullCalendar, { EventInput, DatesSetArg } from "@fullcalendar/react";
import FullCalendar from "@fullcalendar/react";
import type { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import { useState } from "react";

// interface MonthlyCalendarProps {
//   events: EventInput[];
// }

interface MonthlyCalendarProps {
  events: CalendarOptions["events"];
}

export default function MonthlyCalendar({ events }: MonthlyCalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  // const plugins: PluginInput[] = [dayGridPlugin, interactionPlugin];

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
