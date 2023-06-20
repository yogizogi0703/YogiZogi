import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './CarouselModal.css';

interface ModalProps {
  imgList: string[];
  alt: string;
  selectedImg: number
}

export const CarouselModal: React.FC<ModalProps> = ({ imgList, alt, selectedImg }) => {
  return (
    <>
      <input type="checkbox" id="reservationModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-4xl">
          <Carousel selectedItem={selectedImg} showThumbs={imgList.length === 1 ? false : true}>
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
