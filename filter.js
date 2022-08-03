function filterRecipe(searchValue) {
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
}
