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
function parseTemplate<Type extends Record<string, string>>(
  templateString: string,
  mapping?: Type
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
 * Clear all child of a parent element
 * @param parentElement Parent element that the child want to clear
 */
function clearAllChild(parentElement: HTMLElement | null) {
  while (parentElement?.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}

/**
 * Check if value is empty. Empty is `[]`, `{}`, `''`, `null`, and `undefined`.
 * @param value Value to check
 * @returns boolean
 */
function isEmpty(
  value: string | unknown[] | Record<string, unknown> | null | undefined
) {
  return !Object.entries(value || {}).length;
}

/**
 * @param rating Float number rating of 5
 * @returns Rating percentage rounded
 */
function calculateStarRatingPercentage(rating: number | undefined) {
  const processedRating = rating || 0;
  const starWidthPercentage = (processedRating / 5) * 100;
  const percentageRounded = Math.round(starWidthPercentage / 10) * 10;

  return percentageRounded;
}

/**
 * Show error message element to the parent element
 * @param parentElement Parent element of this message to append
 * @param message Error message to show
 * @param style Optional style for this message element
 */
function showErrorMessageElement(
  parentElement: HTMLElement | null,
  message: string,
  style?: string
) {
  const paragraphElement = document.createElement('p');

  clearAllChild(parentElement);
  paragraphElement.style.textAlign = 'center';
  if (style) paragraphElement.classList.add(style);
  paragraphElement.innerText = message;
  parentElement?.appendChild(paragraphElement);
}

export {
  calculateStarRatingPercentage,
  clearAllChild,
  isEmpty,
  parseTemplate,
  showErrorMessageElement,
  truncateWords,
};
