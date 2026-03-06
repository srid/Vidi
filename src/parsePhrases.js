/**
 * Parse phrases.md content into structured categories.
 * Format: ## Category Name followed by - Phrase lines
 * Returns: [{ category: string, phrases: string[] }]
 */
export function parsePhrases(markdown) {
  const categories = [];
  let current = null;

  for (const line of markdown.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      current = { category: trimmed.slice(3), phrases: [] };
      categories.push(current);
    } else if (trimmed.startsWith('- ') && current) {
      current.phrases.push(trimmed.slice(2));
    }
  }

  return categories;
}
