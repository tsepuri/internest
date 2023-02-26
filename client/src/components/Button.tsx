import { useState } from "react";
import styles from "@/styles/Button.module.css";

function Button() {
    const [activeButton, setActiveButton] = useState<string>("button1");

    const handleButtonClick = (button: string) => {
        setActiveButton(button);
        // Call a function here to change the state of the parent component
    };

    return (
        <div className={styles.container}>
            <button
                className={`${styles.button} ${activeButton === "button1" ? styles.active : ""
                    }`}
                onClick={() => handleButtonClick("button1")}
            >
                Day
            </button>
            <button
                className={`${styles.button} ${activeButton === "button2" ? styles.active : ""
                    }`}
                onClick={() => handleButtonClick("button2")}
            >
                Week
            </button>
            <button
                className={`${styles.button} ${activeButton === "button3" ? styles.active : ""
                    }`}
                onClick={() => handleButtonClick("button3")}
            >
                Month
            </button>
            <button
                className={`${styles.button} ${activeButton === "button4" ? styles.active : ""
                    }`}
                onClick={() => handleButtonClick("button4")}
            >
                All Time
            </button>
        </div>
    );
}

export default Button;
