import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import { useEffect, useState } from "react";

const slides = ["/imagen_1.jpg", "/imagen_2.jpg", "/imagen_3.jpg"];

export default function Carousel() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Renderiza la primera imagen mientras carga el componente
    return (
      <div className="w-full h-screen relative overflow-hidden">
        <img
          src={slides[0]}
          alt="Cancha de Padel"
          className="w-full h-full object-cover"
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
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
                waitForTransition: true,
              }
            : false
        }
        speed={1500} // Transición más lenta y suave
        effect="fade" // Efecto fade más suave que slide
        fadeEffect={{
          crossFade: true,
        }}
        modules={[Autoplay, EffectFade]}
        className="w-full h-full"
        allowTouchMove={false}
        preventInteractionOnTransition={true}
        watchSlidesProgress={true}
        updateOnWindowResize={true}
        observer={true} // Observa cambios en el DOM
        observeParents={true}
        centeredSlides={true}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={`slide-${i}`}>
            <div className="w-full h-screen relative">
              <img
                src={slide}
                alt={`Cancha de Padel ${i + 1}`}
                className="w-full h-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
                style={{
                  minHeight: "100vh",
                  minWidth: "100vw",
                }}
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
