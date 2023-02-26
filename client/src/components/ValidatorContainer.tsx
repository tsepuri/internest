import React, { useState } from "react";

type ValidatorContainerProps = {
    initialWords?: string[];
  };
  
  const ValidatorContainer: React.FC<ValidatorContainerProps> = ({
    initialWords = [],
  }) => {
    const [words, setWords] = useState(initialWords);
  
    const handleDeleteWord = (index: number) => {
      setWords((prevWords) => prevWords.filter((_, i) => i !== index));
    };
  
    const handleAddWord = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const input = event.currentTarget.elements.namedItem(
        "new-word"
      ) as HTMLInputElement;
      const newWord = input.value.trim();
      if (newWord && !words.includes(newWord)) {
        setWords((prevWords) => [...prevWords, newWord]);
        input.value = "";
      }
    };
  
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(words);
      // Send `words` to the server using fetch or axios
    };
  
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <form onSubmit={handleAddWord} style={{ display: "flex", gap: "10px" }}>
          <input type="text" name="new-word" placeholder="Add a word" />
          <button type="submit">Add</button>
        </form>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
            gap: "10px",
          }}
        >
          {words.map((word, index) => (
            <Word
              key={index}
              value={word}
              onDelete={() => handleDeleteWord(index)}
            />
          ))}
        </div>
        {words.length > 0 && (
          <form onSubmit={handleFormSubmit}>
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    );
  };
  
  type WordProps = {
    value: string;
    onDelete: () => void;
  };
  
  const Word: React.FC<WordProps> = ({ value, onDelete }) => {
    const circleSize = (value.length + 1) * 10;
    const style: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: `${circleSize}px`,
      width: `${circleSize}px`,
      borderRadius: "50%",
      backgroundColor: "lightblue",
      margin: "5px",
      cursor: "pointer",
    };
  
    return (
      <div style={style} onClick={onDelete}>
        <span>{value}</span>
      </div>
    );
  };
  
  export default ValidatorContainer;