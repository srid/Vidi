import { useState } from 'react';

export default function PhraseList({ categories, onSelect }) {
  const [custom, setCustom] = useState('');

  return (
    <div className="min-h-full px-5 py-8 pb-[env(safe-area-inset-bottom)]">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-lg font-medium tracking-widest uppercase opacity-40">
          Vidi
        </h1>
      </header>

      {/* Custom phrase input */}
      <div className="mb-8 flex gap-2">
        <input
          type="text"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && custom.trim()) onSelect(custom.trim());
          }}
          placeholder="Écrire..."
          className="flex-1 bg-white/10 text-white px-4 py-3 text-base
                     rounded-lg placeholder-white/30 focus:outline-none
                     focus:bg-white/15"
        />
        <button
          onClick={() => custom.trim() && onSelect(custom.trim())}
          className="text-white/50 hover:text-white px-3 text-xl
                     focus:outline-none cursor-pointer"
          aria-label="Show phrase"
        >
          →
        </button>
      </div>

      {/* Categories */}
      {categories.map((cat) => (
        <section key={cat.category} className="mb-8">
          <h2 className="text-xs font-medium tracking-widest uppercase opacity-30 mb-3">
            {cat.category}
          </h2>
          <ul className="space-y-1">
            {cat.phrases.map((phrase, i) => (
              <li key={i}>
                <button
                  onClick={() => onSelect(phrase)}
                  className="w-full text-left py-3 px-0 text-base leading-relaxed
                             text-white/90 hover:text-white active:text-white
                             focus:outline-none cursor-pointer
                             lg:text-lg"
                >
                  {phrase}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

