import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './Modal.css';

interface ModalProps {
  imgList: string[];
  alt: string;
}

export const CarouselModal: React.FC<ModalProps> = ({ imgList, alt }) => {
  return (
    <>
      <input type="checkbox" id="reservationModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-4xl">
          <Carousel>
            {imgList.map((el, idx) => {
              return (
                <figure key={idx}>
                  <img src={el} alt={`${alt}-${idx}`} />
                </figure>
              );
            })}
          </Carousel>
        </div>
        <label className="modal-backdrop" htmlFor="reservationModal">
          Close
        </label>
      </div>
    </>
  );
};
