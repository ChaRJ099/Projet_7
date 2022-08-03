const inputSearch = document.querySelector(".input-search");
const alert = document.querySelector(".alert");

document.querySelector(".input-search").value = "";

inputSearch.addEventListener("input", (event) => {
  if (event.target.value.length >= 3) {
    if (hasTags()) {
      searchResults = recipes;
      removeAllTags();
    }
    filterRecipe(event.target.value);

    if (searchResults.length >= 1) {
      getRecipes(searchResults);
      alert.classList.add("d-none");
    } else {
      searchResults = recipes;
      alert.classList.remove("d-none");
    }
  } else {
    resetResults();
    alert.classList.add("d-none");
  }
});
