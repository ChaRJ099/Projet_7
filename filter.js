function filterRecipe(searchValue) {
  // init calcul temps
  let t0 = performance.now();

  let searchFiltered = [];
  for (i = 0, n = searchResults.length; i < n; i++) {
    if (searchResults[i].name.indexOf(searchValue) != -1) {
      searchFiltered.push(searchResults[i]);
    } else if (searchResults[i].description.indexOf(searchValue) != -1) {
      searchFiltered.push(searchResults[i]);
    } else {
      for (
        index = 0, m = searchResults[i].ingredients.length;
        index < m;
        index++
      ) {
        if (
          searchResults[i].ingredients[index].ingredient.indexOf(searchValue) !=
          -1
        ) {
          searchFiltered.push(searchResults[i]);
        }
      }
    }
  }

  searchResults = searchFiltered;
  // calcul du temps
  let t1 = performance.now();
  let totalTime = t1 - t0;
  console.log("temps: " + totalTime + " millisecondes.");
}
