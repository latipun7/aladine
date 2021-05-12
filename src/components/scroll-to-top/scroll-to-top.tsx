import { createRef, useEffect } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import useQuerySelector from 'lib/use-query-selector';
import type { VFC } from 'react';

import styles from './scroll-to-top.module.scss';

const ScrollToTop: VFC = () => {
  const buttonElement = createRef<HTMLButtonElement>();
  const footerElement = useQuerySelector('footer');

  const scrollEvent = () => {
    const scrollPosition = window.scrollY;

    if (buttonElement.current) {
      if (scrollPosition > 354) {
        buttonElement.current.classList.add(`${styles.scrolled}`);
      } else {
        buttonElement.current.classList.remove(`${styles.scrolled}`);
      }

      if (footerElement.current) {
        const footerHeight =
          footerElement.current.getBoundingClientRect().height;
        const footerTopBounding = document.body.offsetHeight - footerHeight;

        if (window.innerHeight + scrollPosition >= footerTopBounding) {
          buttonElement.current.classList.add(`${styles.bottom}`);
        } else {
          buttonElement.current.classList.remove(`${styles.bottom}`);
        }
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
      className={styles.scrollButton}
      onClick={handleScrollToTop}
      ref={buttonElement}
    >
      <FiArrowUp size="1.75em" aria-label="Scroll to top" />
    </button>
  );
};

export default ScrollToTop;
