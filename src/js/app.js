import * as flsFunctions from "./modules/functions.js";
import Swiper from "swiper";
const menuSortItems = document.querySelectorAll('.menu-sort__item');
const worksItems = document.querySelectorAll('.works__item');
const worksItemsContainer = document.querySelector('.works__items');
flsFunctions.isWebp();
const checkbox = document.querySelector(".checkbox");
const body = document.querySelector("body");

checkbox.addEventListener("change", () => body.classList.toggle("dark-page"));


menuSortItems.forEach(item => {
    item.addEventListener('click', () => {
        const filter = item.textContent;
        worksItemsContainer.innerHTML = '';
        worksItems.forEach(workItem => {
            if (filter === 'All') {
                worksItemsContainer.append(workItem);
            } else if (filter === 'Branding' && workItem.dataset.order % 2 === 0) {
                worksItemsContainer.append(workItem);
            } else if (filter === 'Web' && workItem.dataset.order % 2 !== 0) {
                worksItemsContainer.append(workItem);
            }
        });
    });
});



