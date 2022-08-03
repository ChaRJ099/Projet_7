function filterRecipe(searchValue) {
  // init calcul temps
  let t0 = performance.now();

  searchResults = searchResults.filter((result) => {
    let isValue = false;

    if (result.name.indexOf(searchValue) != -1) {
      return (isValue = true);
    }

    if (result.description.indexOf(searchValue) != -1) {
      return (isValue = true);
    }

    result.ingredients.forEach((ingredient) => {
      if (ingredient.ingredient.indexOf(searchValue) != -1) {
        return (isValue = true);
      }
    });

    return isValue;
  });

  // calcul du temps
  let t1 = performance.now();
  let totalTime = t1 - t0;
  console.log("temps: " + totalTime + " millisecondes.");
}
