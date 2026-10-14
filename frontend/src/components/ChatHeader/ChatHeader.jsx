import { ChevronDown, Menu } from 'lucide-react';
import styles from './ChatHeader.module.css';

export default function ChatHeader({ onMenuClick }) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button
          type="button"
          className={styles.menuButton}
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <Menu size={21} />
        </button>
        <span>ChatGPT</span>
        <ChevronDown size={16} />
      </div>
      <div className={styles.right}>
        <div className={styles.avatar}>IT</div>
      </div>
    </header>
  );
}
