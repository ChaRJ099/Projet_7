//Correspond à la div dans laquelle on affiche l'ensemble des recettes
const recipeContainer = document.querySelector(".recipes");

//On initialise le contenu de la page avec l'ensemble des recettes présentes dans l'objet de données recipes
let searchResults = recipes;

// On appelle la fonction getRecipe en lui poussant les données de l'objet de données searchResults
getRecipes(searchResults);

/**
 *
 * Vide le contenu de la div recipeContainer
 * Boucle sur l'objet de données passé en paramètres
 * Et appelle recipeFactory pour chaque élément
 *
 * @param {*} datas
 */
function getRecipes(datas) {
  recipeContainer.innerHTML = "";
  for (let i = 0; i < datas.length; i++) {
    const recipe = datas[i];

    recipeFactory.displayRecipe(recipe, i);
  }
}
