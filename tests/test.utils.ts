import { clearAllChild } from 'utils';

function renderToDocument(node: HTMLElement, clear?: boolean) {
  const container = document.body;

  if (clear) clearAllChild(container);

  container.appendChild(node);

  return container;
}

async function waitForComponentToRender(tag: string) {
  function requestComponent() {
    const element = document.querySelector<HTMLElement>(tag);
    if (element) {
      return element;
    }
    requestAnimationFrame(requestComponent);
    return element;
  }
  requestComponent();
}

async function render(node: HTMLElement, clear?: boolean) {
  const container = renderToDocument(node, clear);

  await waitForComponentToRender(node.tagName);
  return container;
}

// eslint-disable-next-line import/prefer-default-export
export { render };
