import { AiFillStar } from 'react-icons/ai';
import './RatingSetStar.css';
import { HOVER, SELECTED, STARS, STAR_DOM } from './constants';
import { useEffect, useRef } from 'react';

interface IRatingSetStar {
  rating: number;
  onChange: (value: number) => void;
}

const RatingSetStar = ({ rating, onChange }: IRatingSetStar) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const starList = Array.from({ length: STARS }, () => null);

  const resetHover = (container: HTMLDivElement) => {
    [...container.children].forEach((star) => {
      star.classList.remove(HOVER);
    });
  };

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;

    if (!container) return;

    const target = e.target as HTMLElement;
    const currentStar = target.closest(`.${STAR_DOM}`) as HTMLDivElement;

    if (!currentStar) return;

    resetHover(container);

    const rate = parseInt(currentStar.dataset.rating || '0');
    for (let i = 0; i < rate; i++) {
      container.children[i].classList.add(HOVER);
    }
  };

  const handleHoverLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;

    resetHover(container);
  };

  const resetSelect = (container: HTMLDivElement) => {
    [...container.children].forEach((star) => {
      star.classList.remove(SELECTED);
    });
  };

  const selectStar = () => {
    const container = containerRef.current;

    if (!container) return;

    resetSelect(container);

    for (let i = 0; i < rating; i++) {
      container.children[i].classList.add(SELECTED);
    }
  };

  const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;

    if (!container) return;

    const target = e.target as HTMLElement;
    const currentStar = target.closest(`.${STAR_DOM}`) as HTMLDivElement;

    if (!currentStar) return;

    const rate = parseInt(currentStar.dataset.rating || '0');

    onChange(rate);
  };

  useEffect(() => {
    selectStar();
  }, [rating]);

  return (
    <div
      className="flex items-center text-base cursor-pointer"
      onMouseOver={handleHover}
      onMouseLeave={handleHoverLeave}
      onClick={handleSelect}
      ref={containerRef}
    >
      {starList.map((_, index) => (
        <div
          key={`star-${index}`}
          data-rating={index + 1}
          className={`text-gray-300 ${STAR_DOM}`}
        >
          <AiFillStar />
        </div>
      ))}
    </div>
  );
};

export default RatingSetStar;
