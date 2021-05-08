import clsx from 'clsx';
import { useState, useEffect, createRef } from 'react';
import { FiMenu } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import type { VFC } from 'react';

import styles from './menu.module.scss';

interface Props {}

const Menu: VFC<Props> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuLinksElement = createRef<HTMLUListElement>();
  const menuButtonElement = createRef<HTMLButtonElement>();

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (
      !menuLinksElement.current?.contains(target as Node) &&
      !menuButtonElement.current?.contains(target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
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
            <NavLink to="/about" onClick={handleClickMenuLink}>
              About Us
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Menu;
