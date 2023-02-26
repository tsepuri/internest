import React, { useState } from "react";
import styles from "../styles/Validator.module.css";

interface ValidatorContainerProps {
  initialWords: string[];
  onSubmit?: (words: string[]) => void;
}

const ValidatorContainer: React.FC<ValidatorContainerProps> = ({
  initialWords,
  onSubmit,
}) => {
  const [words, setWords] = useState<string[]>(initialWords);

  const handleRemoveWord = (index: number) => {
    const newWords = [...words];
    newWords.splice(index, 1);
    setWords(newWords);
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(words);
    }
  };

  return (
    <div>
      <div className={styles.wordContainer}>
        {words.map((word, index) => (
          <div
            className={styles.wordCircle}
            key={index}
            onClick={() => handleRemoveWord(index)}
          >
            <div className={styles.wordText}>{word}</div>
            <div className={styles.wordOverlay}></div>
          </div>
        ))}
      </div>
      <button className={styles.submitButton} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default ValidatorContainer;
