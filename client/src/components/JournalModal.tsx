import { useState } from 'react';
import styles from '@/styles/JournalModal.module.css';

type Props = {
  header: string;
  body: string;
  onClose: () => void;
};

const JournalModal = ({ header, body, onClose }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{header}</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            X
          </button>
        </div>
        <div className={styles.body}>{body}</div>
      </div>
    </div>
  );
};

export default JournalModal;
