document.addEventListener("DOMContentLoaded", function () {
  const filterBtn = document.getElementById("filterBtn");
  const filterPanel = document.getElementById("filterPanel");
  const filterIcon = document.getElementById("filterIcon");

  filterBtn.addEventListener("click", function () {
    filterPanel.classList.toggle("hidden");
    filterBtn.classList.toggle("active");

    if (filterBtn.classList.contains("active")) {
      filterIcon.src = "/src/image/logos/filter-black.png";
    } else {
      filterIcon.src = "/src/image/logos/filter.png";
    }
  });
});

// Catogory based filter

const checkboxes = document.querySelectorAll(
  'input[type="checkbox"][data-filter]'
);
const productCards = document.querySelectorAll(".product-card");

checkboxes.forEach((cb) => {
  cb.addEventListener("change", () => {
    // Build selected filters
    const activeFilters = {
      category: [],
      type: [],
      flavour: [],
    };

    checkboxes.forEach((box) => {
      if (box.checked) {
        const group = box.dataset.filter;
        activeFilters[group].push(box.value);
      }
    });

    productCards.forEach((card) => {
      const matchesCategory =
        activeFilters.category.length === 0 ||
        activeFilters.category.includes(card.dataset.category);
      const matchesType =
        activeFilters.type.length === 0 ||
        activeFilters.type.includes(card.dataset.type);
      const matchesFlavour =
        activeFilters.flavour.length === 0 ||
        activeFilters.flavour.includes(card.dataset.flavour);

      if (matchesCategory && matchesType && matchesFlavour) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// order based filter

document.getElementById("sort").addEventListener("change", function () {
  const selectedValue = this.value;
  const productGrid = document.querySelector(".product-grid");
  const productCards = Array.from(
    productGrid.querySelectorAll(".product-card")
  );

  const extractTitle = (card) =>
    card.querySelector(".product-title").textContent.trim().toLowerCase();
  const extractPrice = (card) => parseFloat(card.getAttribute("data-price"));
  const extractRating = (card) => parseInt(card.getAttribute("data-rating"));

  let sortedCards;

  switch (selectedValue) {
    case "az":
      sortedCards = productCards.sort((a, b) =>
        extractTitle(a).localeCompare(extractTitle(b))
      );
      break;
    case "za":
      sortedCards = productCards.sort((a, b) =>
        extractTitle(b).localeCompare(extractTitle(a))
      );
      break;
    case "price-low":
      sortedCards = productCards.sort(
        (a, b) => extractPrice(a) - extractPrice(b)
      );
      break;
    case "price-high":
      sortedCards = productCards.sort(
        (a, b) => extractPrice(b) - extractPrice(a)
      );
      break;
    case "rating-high":
      sortedCards = productCards.sort(
        (a, b) => extractRating(b) - extractRating(a)
      );
      break;
    case "rating-low":
      sortedCards = productCards.sort(
        (a, b) => extractRating(a) - extractRating(b)
      );
      break;
    default:
      sortedCards = productCards;
  }

  productGrid.innerHTML = "";
  sortedCards.forEach((card) => productGrid.appendChild(card));
});
