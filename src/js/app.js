import * as flsFunctions from "./modules/functions.js";
import teamSwiper from "./modules/team-slider.js";
import swiper from "./modules/service-slider.js";
import { sortItems } from "./modules/catalogue-sort.js";

sortItems();

flsFunctions.isWebp();

const checkbox = document.querySelector(".checkbox");
const body = document.querySelector("body");

checkbox.addEventListener("change", () => body.classList.toggle("dark-page"));
