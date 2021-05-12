import { createRef, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import type { VFC } from 'react';

import style from './scroll-to-top.module.scss';

const ScrollToTop: VFC = () => {
  const buttonElement = createRef<HTMLButtonElement>();

  const scrollEvent = () => {
    const scrollPosition = window.scrollY;

    if (buttonElement.current) {
      if (scrollPosition > 354) {
        buttonElement.current.classList.add(`${style.scrolled}`);
      } else {
        buttonElement.current.classList.remove(`${style.scrolled}`);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollEvent);

    return () => document.removeEventListener('scroll', scrollEvent);
  });

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={style.scrollButton}
      onClick={handleScrollToTop}
      ref={buttonElement}
    >
      <FiArrowUp size="1.75em" aria-label="Scroll to top" />
    </button>
  );
};

export default ScrollToTop;
