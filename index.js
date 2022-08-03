const recipeContainer = document.querySelector(".recipes");
let searchResults = recipes;

getRecipes(searchResults);

function getRecipes(datas) {
  recipeContainer.innerHTML = "";
  for (let i = 0; i < datas.length; i++) {
    const recipe = datas[i];

    recipeFactory.displayRecipe(recipe, i);
  }
}
