import React from 'react';

/**
 * Splits a text string into parts and makes clickable:
 * - URLs (https://...)
 * - Email addresses (example@mail.com)
 *
 * Other text parts are returned as plain React.Fragment.
 *
 * @param {string} text - The input text that may contain URLs and emails
 * @returns {React.ReactNode} - Array of React elements with clickable links and plain text
 *
 * @example
 * <p>{parseTextWithLinks("Contact us at petshelp_support@gmail.com or visit https://petshelp.ua/privacy-policy")}</p>
 */

export default function parseTextWithLinks(text: string): React.ReactNode {
  // Regex to match URLs and emails
  const regex =
    /(https?:\/\/[^\s]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

  // Split the text into parts: normal text, URLs, and emails
  const parts = text.split(regex).filter(Boolean); // remove null/undefined

  return parts.map((part, idx) => {
    if (!part) return null;

    // If the part is a URL
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={idx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fire underline"
        >
          {part}
        </a>
      );
    }

    // If the part is an email
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part)) {
      return (
        <a key={idx} href={`mailto:${part}`} className="text-fire underline">
          {part}
        </a>
      );
    }

    // Otherwise, render plain text
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}
