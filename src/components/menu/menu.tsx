import clsx from 'clsx';
import { useState, useEffect, createRef } from 'react';
import { FiMenu } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import useQuerySelector from 'lib/use-query-selector';
import type { VFC } from 'react';

import styles from './menu.module.scss';

interface Props {}

const Menu: VFC<Props> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuLinksElement = createRef<HTMLUListElement>();
  const menuButtonElement = createRef<HTMLButtonElement>();
  const footerElement = useQuerySelector('footer');

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (
      !menuLinksElement.current?.contains(target as Node) &&
      !menuButtonElement.current?.contains(target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  const scrollEvent = () => {
    const scrollPosition = window.scrollY;

    if (menuButtonElement.current) {
      if (footerElement.current) {
        const footerHeight =
          footerElement.current.getBoundingClientRect().height;
        const footerTopBounding = document.body.offsetHeight - footerHeight;

        if (window.innerHeight + scrollPosition >= footerTopBounding) {
          menuButtonElement.current.classList.add(`${styles.bottom}`);
        } else {
          menuButtonElement.current.classList.remove(`${styles.bottom}`);
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    document.addEventListener('scroll', scrollEvent);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('scroll', scrollEvent);
    };
  });

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickMenuLink = () => {
    setIsMenuOpen(false);
  };

  const menuLinksClassNames = clsx(styles.menuLinks, {
    [styles.open]: isMenuOpen,
  });

  const menuButtonClassNames = clsx(styles.menuButton, {
    [styles.open]: isMenuOpen,
  });

  return (
    <>
      <nav className={styles.mainNavigation}>
        <a href="/" className={styles.logo}>
          <span>à la Dine</span>
        </a>

        <button
          className={menuButtonClassNames}
          onClick={handleToggleMenu}
          ref={menuButtonElement}
        >
          <FiMenu size="1.75em" aria-label="Toggle navigation menu" />
        </button>

        <ul className={menuLinksClassNames} ref={menuLinksElement}>
          <li className={styles.menuLink}>
            <NavLink to="/" onClick={handleClickMenuLink}>
              Home
            </NavLink>
          </li>
          <li className={styles.menuLink}>
            <NavLink to="/favorite" onClick={handleClickMenuLink}>
              Favorite
            </NavLink>
          </li>
          <li className={styles.menuLink}>
            <a
              href="https://github.com/latipun7"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClickMenuLink}
            >
              About Us
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
