import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import { useEffect, useState } from "react";

const slides = ["/imagen_1.webp", "/imagen_2.webp", "/imagen_3.webp"];

const preloadImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = url;
  });
};

export default function Carousel() {
  const [isClient, setIsClient] = useState(false);
  const [areImagesPreloaded, setAreImagesPreloaded] = useState(false);

  useEffect(() => {
    const imagesToPreload = slides.slice(1);

    Promise.all(imagesToPreload.map(preloadImage)).then(() => {
      setAreImagesPreloaded(true);
    });

    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-screen relative overflow-hidden">
        <img
          src={slides[0]}
          alt="Cancha de Padel (Cargando)"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={slides.length > 1}
        autoplay={
          slides.length > 1
            ? {
                delay: 1000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
              }
            : false
        }
        speed={1000}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        modules={[Autoplay, EffectFade]}
        className="w-full h-full"
        allowTouchMove={false}
        centeredSlides={true}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={`slide-${i}`}>
            <div className="w-full h-full relative">
              <img
                src={slide}
                alt={`Cancha de Padel ${i + 1}`}
                className="w-full h-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
