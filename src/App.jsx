import { useState, useEffect } from 'react';
import { parsePhrases } from './parsePhrases';
import PhraseList from './PhraseList';
import Flashcard from './Flashcard';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [activePhrase, setActivePhrase] = useState(null);

  useEffect(() => {
    fetch('/phrases.md')
      .then((r) => r.text())
      .then((md) => setCategories(parsePhrases(md)));
  }, []);

  if (activePhrase !== null) {
    return <Flashcard phrase={activePhrase} onClose={() => setActivePhrase(null)} />;
  }

  return <PhraseList categories={categories} onSelect={setActivePhrase} />;
}
