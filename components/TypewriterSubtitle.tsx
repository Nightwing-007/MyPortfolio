"use client";

import { useState, useEffect, useRef } from "react";

const SUBTITLES = [
  "Computer Science Student & Full-Stack Developer",
  "Building the Future with Code",
  "CS @ Sri Eshwar | Class of 2028",
];

export default function TypewriterSubtitle() {
  const [displayText, setDisplayText] = useState("");
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentText = SUBTITLES[subtitleIndex];

    if (!isDeleting) {
      if (displayText.length < currentText.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 50 + Math.random() * 40);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, 2500);
      }
    } else {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 25);
      } else {
        setIsDeleting(false);
        setSubtitleIndex((prev) => (prev + 1) % SUBTITLES.length);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, subtitleIndex]);

  return (
    <span className="text-text-muted">
      {displayText}
      <span
        className="inline-block w-[2px] h-[1em] ml-1 align-middle"
        style={{
          backgroundColor: showCursor ? "var(--accent-purple)" : "transparent",
          boxShadow: showCursor ? "0 0 6px rgba(124,58,237,0.4)" : "none",
          transition: "background-color 0.1s, box-shadow 0.1s",
        }}
      />
    </span>
  );
}
