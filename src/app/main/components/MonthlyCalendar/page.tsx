import styles from "./page.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";



export default function MonthlyCalendar() {
  return (
    <div className={styles.container}>
      <div className={styles.calendarWrapper}>
        <div className={styles.calendarArea}>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth" // 높이는 FullCalendar의 prop으로
            height="100%"
            // width prop은 없으니 wrapper에서 제어
          />
        </div>
      </div>
    </div>
  );
}
