const inputSearch = document.querySelector(".input-search");

// Initialise l'input search à vide
document.querySelector(".input-search").value = "";

// Au moment de la saisie dans le champs de recherche
inputSearch.addEventListener("input", (event) => {
  // Si la longueur de la saisie de input search est supérieur ou égal à 3 :
  if (event.target.value.length >= 3) {
    // On réinitialise les résultats avant de faire la recherche
    searchResults = recipes;

    // S'il y a déjà des tags sélectionnés :
    if (hasTags()) {
      // Enlève tous les tags sélectionnés
      removeAllTagsChoice();
    }
    // Filtre les recettes en sa basant sur la valeur saisie dans l'input search
    filterRecipe(event.target.value);

    // A partir de 1 résultat trouvé :
    if (searchResults.length >= 1) {
      // Affiche les recettes correspondant aux recettes trouvées
      getRecipes(searchResults);
      // Affiche tous les tags correspondant aux recettes trouvées
      getAllTags(searchResults);
      // Cache le message d'erreur
      setError(false);

      // Pas de résultats trouvés :
    } else {
      // Vide tous les tags des listes de tags
      getAllTags("");
      // Supprime le contenu html de recipeContainer (toutes les recettes)
      recipeContainer.innerHTML = "";
      // Affiche le message d'erreur
      setError(true);
    }
    // Si la longueur de la saisie de input search est inférieur à 3 :
  } else {
    // Affiche toutes les recettes et tous les tags
    resetResults();
    // Cache le message d'erreur
    setError(false);
  }
});
