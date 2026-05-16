"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Analysing your profile...",
  "Understanding the job requirements...",
  "Tailoring your experience...",
  "Crafting your summary...",
  "Polishing bullet points...",
  "Almost there...",
];

export function LoadingSpinner() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % MESSAGES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
      </div>
      <p className="text-sm text-gray-600 animate-pulse">{MESSAGES[msgIndex]}</p>
    </div>
  );
}
