import styles from "./ProfileCard.module.css";
import Image from "next/image";

export default function ProfileCard() {
  return (
    <div className={styles.container}>
      <div className={styles.avatarWrapper}>
        <Image
          src="/images/avatar.png"
          alt=""
          width={90}
          height={90}
          className={styles.avatar}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.name}> 홍길동 </div>
        <div className={styles.details}> 넷앤드 / juju009@naver.com </div>
      </div>
    </div>
  );
}
