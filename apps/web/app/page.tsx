import styles from "./page.module.css";
import { TronicLogo } from "./components/TronicLogo";
import { TrackButton } from "./components/TrackButton";

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          examples/basic&nbsp;
          <code className={styles.code}>web</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo"
            rel="noopener noreferrer"
            target="_blank"
          >
            By{" "}
            <TronicLogo />
          </a>
        </div>
      </div>

      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.logos}>
          </div>
          <div className={styles.turborepoWordmarkContainer}>
            <TrackButton />
          </div>
        </div>
      </div>

      <div className={styles.grid}>
      </div>
    </main>
  );
}
