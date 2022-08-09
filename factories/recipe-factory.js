// Objet modèle d'une card recette
const recipeFactory = {
  /**
   * Fonction qui génère les data dans la card recette
   *
   * @param {*} data
   * @param {*} i
   */
  displayRecipe(data, i) {
    const col = document.createElement("div");
    col.classList.add("border-white", "col");
    const recipesContainer = document.querySelector(".recipes");

    // Ajout du contenu html
    col.innerHTML = `
        <div class="card">
          <div class="img-container">
            <img
              src="https://picsum.photos/300?random=${data.id}"
              class="card-img-top"
              alt="..."
            />
          </div>
          <div class="card-body height-200">
            <div class="d-flex justify-content-between">
              <h5 class="card-title">${data.name}</h5>
              <div>
                <i class="fa-regular fa-clock"></i>
                <span>${data.time} min</span>
              </div>
            </div>
            <div class="d-flex w-100">
              <div class="col col-text pe-2">
                <ul class="d-flex flex-column p-0 ingredient-list-${i}">                  
                </ul>
              </div>
              <div class="col col-text card-description p-0 w-100">
              ${data.description}
              </div>
            </div>
          </div>
        </div>
      `;

    recipesContainer.appendChild(col);

    const ingredients = data.ingredients;

    // Permet de sélectionner la bonne liste d'ingrédients en fonction de l'index passé en paramètre de la fonction displayRecipe
    const ingredientContainer = document.querySelector(".ingredient-list-" + i);

    // Boucle sur le tableau ingrédients
    for (let i = 0; i < ingredients.length; i++) {
      const ingredientElem = document.createElement("li");
      const liChild = document.createElement("div");
      ingredientElem.classList.add(
        "d-flex",
        "flex-row",
        "align-items-end",
        "ingredient-" + i
      );
      liChild.classList.add("d-flex", "m-0", "ingredient", "elem-" + i);
      // Initialise les valeurs de "quantity" et "unit" à vide par défaut
      let quantity = "";
      let unit = "";

      // Si présence d'une valeur pour l'attribut quantity de l'élément du tableau ingrédients
      if (ingredients[i].quantity) {
        // On assigne la valeur de l'attribut quantity à la variable "quantity"
        quantity = ":&thinsp;" + ingredients[i].quantity;
      }
      // Si présence d'une valeur pour l'attribut unit de l'élément du tableau ingrédients
      if (ingredients[i].unit) {
        // On assigne la valeur de l'attribut unit à la variable "unit"
        unit = ingredients[i].unit;
      }

      liChild.innerHTML = `
          <span class="fw-bold">${ingredients[i].ingredient}&thinsp;</span>
          ${quantity} ${unit}
        `;
      ingredientContainer.appendChild(ingredientElem);
      ingredientElem.appendChild(liChild);
    }
  },
};
