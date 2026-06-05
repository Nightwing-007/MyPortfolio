"use client";
import { useState, useEffect } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export default function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let iteration = -2;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " ";
            if (index < iteration || index >= text.length - iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length / 2) {
        setDisplayText(text);
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 50);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <span>
      {displayText.split("").map((char, i) => {
        const isResolved = char === text[i];
        return (
          <span
            key={i}
            className={isResolved ? "" : "font-mono"}
            style={{
              color: isResolved ? "inherit" : "var(--accent-cyan)",
              opacity: isResolved ? 1 : 0.7,
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
