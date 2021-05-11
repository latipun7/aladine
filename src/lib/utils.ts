/* eslint-disable import/prefer-default-export */

/**
 * Truncate long string
 * @param paragraph The long string that want to truncate
 * @param maxCharacter Maximum characters that want to display
 * @returns Truncated words
 */
function truncateWords(paragraph: string, maxCharacter: number): string {
  if (paragraph.length < maxCharacter) return paragraph;

  const plainTrim = paragraph.slice(0, maxCharacter - 1);
  const wordsBoundary = plainTrim.slice(0, plainTrim.lastIndexOf(' '));
  return `${wordsBoundary} ...`;
}

export { truncateWords };
