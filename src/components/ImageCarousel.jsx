import React, { useState } from 'react';
import LazyLoad from 'react-lazy-load';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa'

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel-container flex justify-center relative">
      <button onClick={handlePrev} className='text-xl md:text-2xl rounded-full border bg-white absolute -left-5 top-1/3 sm:top-1/2 p-1 md:p-2 hover:bg-slate-50'><FaAngleLeft /></button>
      <div className="image-container text-center">
        {images.map((image, index) => (
            <LazyLoad offset={600}>
          <img
            key={index}
            src={image.url}
            alt={`Image ${index + 1}`}
            className='object-contain'
            style={{
                width: `${image.width}px`,
              display: index === currentIndex ? 'block' : 'none',
            }}
          />
          </LazyLoad>
        ))}
      </div>
      <button onClick={handleNext} className='text-xl md:text-2xl rounded-full border bg-white absolute -right-5 top-1/3 sm:top-1/2 p-1 md:p-2 hover:bg-slate-50'><FaAngleRight /></button>
    </div>
  );
};

export default ImageCarousel;
