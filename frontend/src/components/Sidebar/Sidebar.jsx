import {
  MessageSquare,
  Search,
  Image as ImageIcon,
  LayoutGrid,
  Microscope,
  Code2,
  FolderKanban,
  PanelLeftClose,
  X,
} from 'lucide-react';
import styles from './Sidebar.module.css';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          className={styles.backdrop}
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.iconBtn} aria-hidden="true">
              <PanelLeftClose size={20} />
            </div>
          </div>
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.closeButton}`}
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
          <button type="button" className={styles.iconBtn} aria-label="New chat">
            <MessageSquare size={20} />
          </button>
        </div>

        <nav className={styles.nav}>
          <a href="#" className={styles.item} onClick={onClose}>
            <MessageSquare size={18} />
            <span>New chat</span>
          </a>
          <a href="#" className={styles.item} onClick={onClose}>
            <Search size={18} />
            <span>Search chats</span>
          </a>
          <a href="#" className={styles.item} onClick={onClose}>
            <ImageIcon size={18} />
            <span>Images</span>
          </a>
          <a href="#" className={styles.item} onClick={onClose}>
            <LayoutGrid size={18} />
            <span>Apps</span>
          </a>
          <a href="#" className={styles.item} onClick={onClose}>
            <Microscope size={18} />
            <span>Deep research</span>
          </a>
          <a href="#" className={styles.item} onClick={onClose}>
            <Code2 size={18} />
            <span>Codex</span>
          </a>
          <a href="#" className={styles.item} onClick={onClose}>
            <FolderKanban size={18} />
            <span>Projects</span>
          </a>
        </nav>
      </aside>
    </>
  );
}
