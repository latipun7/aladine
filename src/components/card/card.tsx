import { createRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaStar, FaRegStar, FaMapMarkerAlt } from 'react-icons/fa';
import { truncateWords } from 'lib/utils';
import type { VFC } from 'react';

import styles from './card.module.scss';

interface Props {
  data: {
    id: string;
    name: string;
    description: string;
    pictureId: string;
    city: string;
    rating: number;
  };
}

const Card: VFC<Props> = ({ data }) => {
  const starFillElement = createRef<HTMLDivElement>();
  const starWidthPercentage = (data.rating / 5) * 100;
  const percentageRounded = Math.round(starWidthPercentage / 10) * 10;

  useEffect(() => {
    if (starFillElement.current)
      starFillElement.current.style.width = `${percentageRounded}%`;
  });

  return (
    <div className={styles.cardContainer}>
      <figure>
        <img src={data.pictureId} alt={data.name} />
      </figure>
      <div className={styles.city}>
        <div className={styles.flail} />
        <span style={{ color: '#891818' }} className="icon">
          <FaMapMarkerAlt aria-label="location" />
        </span>
        {data.city}
      </div>
      <div className={styles.title}>
        <NavLink to={`/restaurant/${data.id}`}>{data.name}</NavLink>
      </div>
      <div
        className={styles.rating}
        aria-label={`star rating ${data.rating} of 5`}
      >
        <div className={styles.stars}>
          <div className={styles.starOutline}>
            <div className={styles.starFill} ref={starFillElement}>
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
          </div>
        </div>
        {data.rating}
      </div>
      <p className={styles.description}>
        {truncateWords(data.description, 150)}
      </p>
    </div>
  );
};

export default Card;
