export function fuzzySearch(word: string, searchList: string[]) {
  const searchTexts = word.split(/[\x20\u3000\t]+/);

  return searchList.filter((s) => searchTexts.map((w) => s.includes(w)).some((b) => b));
}
