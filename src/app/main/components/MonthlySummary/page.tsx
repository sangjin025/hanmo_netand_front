import Image from "next/image";
import styles from "./page.module.css";

export default function MonthlySummary() {
  return (
    <div className={styles.container}>
      <Image src="/images/graph.png" alt="" width={468} height={348} />
    </div>
  );
}
