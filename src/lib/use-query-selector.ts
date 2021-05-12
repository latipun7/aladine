import { useEffect, useRef } from 'react';

function useQuerySelector(query: string) {
  const queryElement = useRef<Element>(null);

  useEffect(() => {
    const element = document.querySelector(query);
    if (element) {
      (queryElement as React.MutableRefObject<Element>).current = element;
    }
  });

  return queryElement;
}

export default useQuerySelector;
