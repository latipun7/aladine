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

/**
 * Parse HTML string into HTML Template Element
 * @param templateString String of valid HTML
 * @param mapping Map HTML mustache template `{{key}}` to valid string value
 * @returns HTML Template Element
 */
function parseTemplate<T extends Record<string, string>>(
  templateString: string,
  mapping?: T
): HTMLTemplateElement {
  const template = document.createElement('template');
  let processedTemplateString = templateString;

  if (mapping) {
    Object.keys(mapping).forEach((key) => {
      processedTemplateString = processedTemplateString.replace(
        new RegExp(`{{${key}}}`, 'gm'),
        mapping[key]
      );
    });
  }

  template.innerHTML = processedTemplateString;

  return template;
}

/**
 * Clear all child of a root / wrapper element
 * @param rootElement Root / wrapper element that the child want to clear
 */
function clearAllChild(rootElement: HTMLElement | null) {
  while (rootElement?.firstChild) {
    rootElement.removeChild(rootElement.firstChild);
  }
}

export { truncateWords, parseTemplate, clearAllChild };
