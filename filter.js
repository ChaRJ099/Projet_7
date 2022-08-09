function filterRecipe(searchValue) {
  // init calcul temps
  let t0 = performance.now();

  // Méthode filter sur l'objet de données searchResults. Retourne un tableau filtré (chaque recette avec isValue = true est ajouté à searchResults)
  searchResults = searchResults.filter((result) => {
    let isValue = false;
    // Regarde s'il y a correspondance entre searchValue et result.name. Si oui, retourne "isValue = true". Sinon, retourne isValue = false.
    if (result.name.indexOf(searchValue) != -1) {
      return (isValue = true);
    }
    // Regarde s'il y a correspondance entre searchValue et result.description. Si oui, retourne "isValue = true". Sinon, retourne isValue = false.
    if (result.description.indexOf(searchValue) != -1) {
      return (isValue = true);
    }
    // Regarde s'il y a correspondance entre searchValue et result.ingredient. Si oui, retourne "isValue = true". Sinon, retourne isValue = false.
    result.ingredients.forEach((ingredient) => {
      if (ingredient.ingredient.indexOf(searchValue) != -1) {
        return (isValue = true);
      }
    });
    // Retourne isValue
    return isValue;
  });

  // calcul du temps
  let t1 = performance.now();
  let totalTime = t1 - t0;
  console.log("temps: " + totalTime + " millisecondes.");
}
