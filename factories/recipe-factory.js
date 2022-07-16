const recipeFactory = {

    


    displayRecipe(data) {


        const card = document.createElement("div");
        card.classList.add("card", "h-100", "col");

        const recipesContainer = document.querySelector(".recipes");

        // const imgContainer = document.createElement("div").classList.add("img-container");
        // const img = document.createElement("img").classList
        //             .add("card-img-top")
        //             .setAttribute(src,"https://picsum.photos/300")
        //             .setAttribute(alt,"");

        // const cardBody = document.createElement("div").classList.add("card-body");
        

        card.innerHTML = `
            <div class="img-container">
            <img
              src="https://picsum.photos/300"
              class="card-img-top"
              alt="..."
            />
          </div>

          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5 class="card-title">${data.name}</h5>
              <div>
                <i class="fa-regular fa-clock"></i>
                <span>60 min</span>
              </div>
            </div>
            <div class="row">
              <div class="col col-text">
                <ul class="d-flex flex-column">
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
              <div class="col col-text">
              ${data.description}
              </div>
            </div>
          </div>
            `;

            recipesContainer.appendChild(card);
    }
}