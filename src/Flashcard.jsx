import { useEffect, useRef, useCallback } from 'react';

export default function Flashcard({ phrase, onClose }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const fitText = useCallback(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const maxW = container.clientWidth * 0.85;
    const maxH = container.clientHeight * 0.75;

    // Binary search for the largest font size that fits
    let lo = 16;
    let hi = 300;
    text.style.fontSize = `${hi}px`;

    while (hi - lo > 1) {
      const mid = Math.floor((lo + hi) / 2);
      text.style.fontSize = `${mid}px`;
      if (text.scrollWidth <= maxW && text.scrollHeight <= maxH) {
        lo = mid;
      } else {
        hi = mid;
      }
    }
    text.style.fontSize = `${lo}px`;
  }, [phrase]);

  useEffect(() => {
    fitText();
    window.addEventListener('resize', fitText);
    return () => window.removeEventListener('resize', fitText);
  }, [fitText]);

  // Try Fullscreen API
  useEffect(() => {
    const el = containerRef.current;
    if (el && el.requestFullscreen && !document.fullscreenElement) {
      el.requestFullscreen().catch(() => {});
    }
    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  // Escape key to close
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      ref={containerRef}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center cursor-pointer select-none"
    >
      {/* Close button */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-6 right-6 text-white/30 hover:text-white/60
                   text-2xl font-light focus:outline-none cursor-pointer z-10"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Phrase text — sized by fitText */}
      <p
        ref={textRef}
        className="text-white font-semibold leading-tight text-center px-8
                   max-w-[85vw] max-h-[75vh] break-words"
      >
        {phrase}
      </p>
    </div>
  );
}
