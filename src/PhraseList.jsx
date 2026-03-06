export default function PhraseList({ categories, onSelect }) {
  return (
    <div className="min-h-full px-5 py-8 pb-[env(safe-area-inset-bottom)]">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-lg font-medium tracking-widest uppercase opacity-40">
          Vidi
        </h1>
      </header>

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
