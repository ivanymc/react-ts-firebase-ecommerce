import React, { useState } from 'react';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "../assets/Icon";
import { heroBanner0, heroBanner1, heroBanner2} from "../assets/Assets";

const Hero: React.FC = () => {
  const [currentHeroBanner, setCurrentHeroBanner] = useState(0);
  const heroBanners = [heroBanner0, heroBanner1, heroBanner2];

  const prevHeroBanner = () => {
    setCurrentHeroBanner(currentHeroBanner === 0 ? heroBanners.length - 1 : (prev) => prev - 1);
  };
  const nextHeroBanner = () => {
    setCurrentHeroBanner(currentHeroBanner === heroBanners.length - 1 ? 0 : (prev) => prev + 1);
  };

  return (
    <>
      <div className="relative h-auto max-h-96 w-screen overflow-hidden">
        <div style={{ transform: `translateX(-${currentHeroBanner * 100}vw)` }} className="h-full flex transition-transform duration-700">
          {heroBanners.map((banner, index) => (
            <img key={index} src={banner} alt={`Hero Banner ${index}`} className="w-screen h-full object-cover" />
          ))}
        </div>

        <div onClick={prevHeroBanner} className="absolute top-1/2 left-10 flex items-center justify-center bg-white/80 rounded-full cursor-pointer hover:bg-white h-7 w-7 md:h-10 md:w-10" >
          <AiOutlineArrowLeft />
        </div>
        <div onClick={nextHeroBanner} className="absolute top-1/2 right-10 flex items-center justify-center bg-white/80 rounded-full cursor-pointer hover:bg-white h-7 w-7 md:h-10 md:w-10" >
          <AiOutlineArrowRight />
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center">
          { heroBanners.map((_, index) => (
              <button key={index} type="button" className={`w-2 h-2 md:w-3 md:h-3 rounded-full mx-2 ${index === currentHeroBanner ? 'bg-gray-500' : 'bg-gray-300'} hover:bg-gray-400`} aria-label={`Hero Banner ${index + 1}`} onClick={ () => setCurrentHeroBanner(index) } />
          )) }
        </div>

      </div>
    </>
  )
}

export default Hero;