const recipeFactory = {

    displayRecipe(data, i) {



      const col = document.createElement("div");
      
      col.classList.add("border-white", "col");

      const recipesContainer = document.querySelector(".recipes");      

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
            <div class="row">
              <div class="col col-text">
                <ul class="d-flex flex-column p-0 ingredient-list-${i}">
                  
                </ul>
              </div>
              <div class="col col-text card-description">
              ${data.description}
              </div>
            </div>
          </div>
        </div>
      `;
      
      recipesContainer.appendChild(col);
      

      const ingredients = data.ingredients;
      
      const ingredientContainer = document.querySelector(".ingredient-list-"+i);

      for(let i=0; i < ingredients.length; i++) {

        const ingredientElem = document.createElement("li");
        ingredientElem.classList.add("d-flex", "flex-row", "align-items-end", "ingredient-"+i);
        console.log(i);

        ingredientContainer.appendChild(ingredientElem);

        let liChild = document.createElement("div");
        liChild.classList.add("d-flex", "m-0", "ingredient", "elem-"+i);
        liChild.innerHTML = `
        <div class="fw-bold ingredient">${ingredients[i].ingredient}:</div>
        ${ingredients[i].quantity} ${ingredients[i].unit}
        `
        ingredientElem.appendChild(liChild);
        // document.querySelector(".elem-"+i).appendChild(liChild);

      }
    }
}