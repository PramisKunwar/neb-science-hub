import React from "react";

interface TikTokIconProps {
  className?: string;
}

const TikTokIcon: React.FC<TikTokIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 10.5v5.5a4.5 4.5 0 1 0 4.5-4.5" />
      <path d="M14 6v8" />
      <path d="M18 8a2.9 2.9 0 0 1-2-1a3 3 0 0 0-3-3v8a3 3 0 1 1-3-3" />
    </svg>
  );
};

export default TikTokIcon; 