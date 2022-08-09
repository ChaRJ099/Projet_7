function filterRecipe(searchValue) {
  // init calcul temps
  let t0 = performance.now();

  // Tableau des résultats filtrés initialisé à vide
  let searchFiltered = [];

  // Boucle sur l'objet de données searchResults
  for (i = 0, n = searchResults.length; i < n; i++) {
    // Si indexOf sur le nom de l'élément de l'objet de données searchResults ne retourne pas -1 (donc correspondance valide avec searchValue)
    if (searchResults[i].name.indexOf(searchValue) != -1) {
      // Pousse cet élément dans le tableau searchFiltered
      searchFiltered.push(searchResults[i]);

      // Ou si indexOf sur la description de l'élément de l'objet de données searchResults ne retourne pas -1 (donc correspondance valide avec searchValue)
    } else if (searchResults[i].description.indexOf(searchValue) != -1) {
      // Pousse cet élément dans le tableau searchFiltered
      searchFiltered.push(searchResults[i]);

      // Sinon :
    } else {
      // Boucle sur le tableau des ingrédients pour chaque élément de l'objet de données searchResults
      for (
        index = 0, m = searchResults[i].ingredients.length;
        index < m;
        index++
      ) {
        // Si indexOf sur un des ingrédients du tableau ingrédients des éléments de l'objet de données searchResults ne retourne pas -1 (donc correspondance valide avec searchValue)
        if (
          searchResults[i].ingredients[index].ingredient.indexOf(searchValue) !=
          -1
        ) {
          // Pousse cet élément dans le tableau searchFiltered
          searchFiltered.push(searchResults[i]);
        }
      }
    }
  }
  // Assigne la valeur du tableau searchFiltered à l'objet de données searchResults
  searchResults = searchFiltered;
  // calcul du temps
  let t1 = performance.now();
  let totalTime = t1 - t0;
  console.log("temps: " + totalTime + " millisecondes.");
}
