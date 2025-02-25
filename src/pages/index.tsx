// src/pages/index.tsx
import Head from 'next/head';
import RhineCruiseGame from '../components/RhineCruiseGame';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Rhine River Cruise Adventure Game</title>
        <meta name="description" content="Navigate your cruise ship along the Rhine River, collecting souvenirs at each port." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Rhine River Cruise Adventure
        </h1>
        
        <p className={styles.description}>
          Navigate your cruise ship through the beautiful Rhine River, collecting souvenirs and avoiding obstacles!
        </p>

        <div className={styles.gameWrapper}>
          <RhineCruiseGame />
        </div>

        <div className={styles.instructions}>
          <h2>How to Play</h2>
          <ul>
            <li><strong>Arrow Keys or WASD:</strong> Move your cruise ship</li>
            <li><strong>Spacebar:</strong> Shoot to destroy obstacles</li>
            <li><strong>Objective:</strong> Visit all 9 ports along the Rhine River, collect souvenirs</li>
            <li><strong>Watch out for:</strong> Rocks, whirlpools, logs, and other boats</li>
            <li><strong>Power-ups:</strong> Look for engine boosts, shields, repair kits, and point multipliers</li>
          </ul>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Based on the Uniworld &quot;Castles along the Rhine&quot; cruise from Basel to Amsterdam</p>
      </footer>
    </div>
  );
}