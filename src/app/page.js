import Form from "./components/Form";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Form />
      </div>
    </main>
  );
}
