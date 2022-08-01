const inputSearch = document.querySelector(".input-search");
const recipeContainer = document.querySelector(".recipes");

inputSearch.addEventListener("input", (event) => {
  if (event.target.value.length >= 3) {
    recipeContainer.innerHTML = "";
    const results = recipes.filter((result) => {
      let isValue = false;
      if (result.name.indexOf(event.target.value) != -1) {
        return (isValue = true);
      }
      if (result.description.indexOf(event.target.value) != -1) {
        return (isValue = true);
      }
      result.ingredients.forEach((ingredient) => {
        if (ingredient.ingredient.indexOf(event.target.value) != -1) {
          return (isValue = true);
        }
      });
      return isValue;
    });

    getTagsIngredients(results);
    getTagsAppareils(results);
    getTagsUstensiles(results);

    if (results.length >= 1) {
      for (let index in results) {
        recipeFactory.displayRecipe(results[index], index);
      }
    } else {
      recipeContainer.textContent = "Aucun résultat";
    }
  }
  if (event.target.value.length == 0) {
    recipeContainer.innerHTML = "";
    getRecipes(recipes);
  }
});
