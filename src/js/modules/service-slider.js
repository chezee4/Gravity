import Swiper from "swiper";
import { Navigation } from "swiper/modules";

export const swiper = new Swiper(".service__slider", {
  modules: [Navigation],
  slidesPerView: "auto",
  spaceBetween: 30,
  navigation: {
    nextEl: ".slider__button-next",
    prevEl: ".slider__button-prev",
  },
});
