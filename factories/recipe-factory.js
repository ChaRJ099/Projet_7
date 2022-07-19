const recipeFactory = {

    displayRecipe(data) {

      // const ingredients = data.ingredients;
      // let ingredientsArray = [];
      // for(let i=0; i < ingredients.length; i++) {
      //   ingredientsArray = [...ingredients];
      //   console.log(ingredientsArray);
      // }

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
                <ul class="d-flex flex-column p-0">
                  <li class="d-flex flex-row align-items-end">
                    <div class="fw-bold ingredient">
                      Thon Rouge (ou blanc):
                    </div>
                    200g
                  </li>
                  <li class="d-flex flex-row align-items-end">
                    <div class="fw-bold ingredient">Concombre:</div>
                    1
                  </li>
                  <li class="d-flex flex-row align-items-end">
                    <div class="fw-bold ingredient">Tomate:</div>
                    2
                  </li>
                  <li class="d-flex flex-row align-items-end">
                    <div class="fw-bold ingredient">Carotte:</div>
                    1
                  </li>
                  <li class="d-flex flex-row align-items-end">
                    <div class="fw-bold ingredient">Citron Vert:</div>
                    5
                  </li>
                  <li class="d-flex flex-row align-items-end">
                    <div class="fw-bold ingredient">Lait de coco:</div>
                    100ml
                  </li>
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
    }
}