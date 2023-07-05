import Swiper from "swiper";
import { Navigation, EffectFade } from "swiper/modules";

export const teamSwiper = new Swiper(".team__slider", {
  modules: [Navigation, EffectFade],
  slidesPerView: "auto",
  spaceBetween: 30,
  // effect: "fade",
  navigation: {
    nextEl: ".team-slider__button-next",
    prevEl: ".team-slider__button-prev",
  },
});
