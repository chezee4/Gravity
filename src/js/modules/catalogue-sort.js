const menuSortItems = document.querySelectorAll(".menu-sort__item");
const worksItems = document.querySelectorAll(".works__item");
const worksItemsContainer = document.querySelector(".works__items");

const filterWorks = (filter) => {
  worksItemsContainer.innerHTML = "";
  worksItems.forEach((workItem) => {
    const isEven = workItem.dataset.order % 2 === 0;
    if (
      filter === "All" ||
      (filter === "Branding" && isEven) ||
      (filter === "Web" && !isEven)
    ) {
      worksItemsContainer.append(workItem);
    }
  });
};

export const sortItems = () => {
  menuSortItems.forEach((item) => {
    item.addEventListener("click", () => {
      const filter = item.textContent;
      filterWorks(filter);
    });
  });
};
