const inputSearch = document.querySelector(".input-search");

document.querySelector(".input-search").value = "";

inputSearch.addEventListener("input", (event) => {
  if (event.target.value.length >= 3) {
    searchResults = recipes;
    if (hasTags()) {
      removeAllTagsChoice();
    }
    filterRecipe(event.target.value);

    if (searchResults.length >= 1) {
      getRecipes(searchResults);
      getAllTags(searchResults);
      setError(false);
    } else {
      getAllTags("");
      recipeContainer.innerHTML = "";
      setError(true);
    }
  } else {
    resetResults();
    setError(false);
  }
});
