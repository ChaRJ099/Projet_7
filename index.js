getRecipes(recipes);

function getRecipes(datas) {
    for (let i = 0; i < datas.length; i++) {
        const recipe = datas[i];

        recipeFactory.displayRecipe(recipe, i);
        
    }
}
