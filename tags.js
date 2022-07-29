const tagSearchButton = document.querySelectorAll(".tag-search-button");
const tagSearchButtonIngredients = document.querySelector(
  ".tag-search-ingredients"
);
const tagSearchButtonAppareils = document.querySelector(
  ".tag-search-appareils"
);
const tagsSearchName = document.querySelectorAll(".tag-search-name");
const tagsContainerIngredients = document.querySelector(
  ".tags-container-ingredient"
);
const tagsContainerAppareils = document.querySelector(
  ".tags-container-appareils"
);
const tagsSearch = document.querySelectorAll(".tag-search");
const tagsSearchIngredients = document.querySelector(".tag-search-ingredients");
const tagsSearchAppareils = document.querySelector(".tag-search-appareils");
const inputIngredients = document.querySelector(
  ".tag-search-ingredients .tag-search"
);
const inputAppareils = document.querySelector(
  ".tag-search-appareils .tag-search"
);
const inputNameIngredients = document.querySelector(
  ".tag-search-ingredients .tag-search-name"
);
const inputNameAppareils = document.querySelector(
  ".tag-search-appareils .tag-search-name"
);
const tagListAppareils = document.querySelector(".list-appareils");
const tagListIngredients = document.querySelector(".list-ingredients");
const buttonsGroup = document.querySelectorAll(".btn-group-tag");
const dropdownToggleIngredients = document.querySelector(
  ".group-ingredients .dropdown-toggle"
);
const dropdownToggleAppareils = document.querySelector(
  ".group-appareils .dropdown-toggle"
);

// Créé un objet dropdown qui hérite des méthodes de bootstrap dropdown
const dropdownIngredients = new bootstrap.Dropdown(dropdownToggleIngredients);
const dropdownAppareils = new bootstrap.Dropdown(dropdownToggleAppareils);

// le tableau de tag
const tagsIngredients = [];
const tagsAppareils = [];

// Récupère tous les ingrédients (même les doublons)
getTagsIngredients();

// Filtre les ingrédients pour enlever les doublons
const filteredIngredients = tagsIngredients.filter(function (element, index) {
  return tagsIngredients.indexOf(element) == index;
});

// tableau de tag sélectionnés initialisé a vide
const tagsChoiceIngredients = [];
const tagsChoiceAppareils = [];

// observe si un changement a lieu dans les tags et lance addTagEvent
const appareilObserver = new MutationObserver(function () {
  let dropdownItemsAppareils = document.querySelectorAll(
    ".group-appareils .dropdown-item"
  );
  addTagEvent(
    dropdownItemsAppareils,
    tagsChoiceAppareils,
    tagsContainerAppareils
  );
});
const ingredientObserver = new MutationObserver(function () {
  let dropdownItemsIngredients = document.querySelectorAll(
    ".group-ingredients .dropdown-item"
  );
  addTagEvent(
    dropdownItemsIngredients,
    tagsChoiceIngredients,
    tagsContainerIngredients
  );
});

appareilObserver.observe(tagListAppareils, { subtree: true, childList: true });
ingredientObserver.observe(tagListIngredients, {
  subtree: true,
  childList: true,
});

// permet de créer la liste de tag
const listFactory = {
  createTag(tag, elem) {
    const listElem = document.createElement("li");
    listElem.classList.add("dropdown-item");

    listElem.textContent = tag;
    document.querySelector(elem).appendChild(listElem);
  },
};

// initialise les tags
createTag(filteredIngredients, ".list-ingredients");
createTag(tagsAppareils, ".list-appareils");

tagSearchButton.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    event.stopPropagation();
    elem.querySelector(".tag-search").style.display = "block";
    elem.querySelector(".tag-search-name").style.display = "none";
    if (elem == tagSearchButtonAppareils) {
      inputIngredients.style.display = "none";
      inputNameIngredients.style.display = "block";
      dropdownIngredients.hide();
      dropdownAppareils.show();
    }
    if (elem == tagSearchButtonIngredients) {
      inputAppareils.style.display = "none";
      inputNameAppareils.style.display = "block";
      dropdownAppareils.hide();
      dropdownIngredients.show();
    }
  });
});

buttonsGroup.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

document.addEventListener("click", (event) => {
  tagsSearch.forEach((elem) => {
    elem.style.display = "none";
  });
  tagsSearchName.forEach((elem) => {
    elem.style.display = "block";
  });
  dropdownAppareils.hide();
  dropdownIngredients.hide();
});

tagsSearch.forEach((elem) => {
  elem.addEventListener("input", (event) => {
    if (elem == inputIngredients) {
      let tagsFilteredIngredient = filteredIngredients.filter((tag) => {
        let resultIndex = tag.indexOf(event.target.value);
        if (resultIndex == 0) {
          return true;
        }
      });
      tagListIngredients.innerHTML = "";
      for (let i = 0; i < tagsFilteredIngredient.length; i++) {
        listFactory.createTag(tagsFilteredIngredient[i], ".list-ingredients");
      }
    }
    if (elem == inputAppareils) {
      let tagsFilteredAppareils = tagsAppareils.filter((tag) => {
        let resultIndex = tag.indexOf(event.target.value);
        if (resultIndex == 0) {
          return true;
        }
      });
      tagListAppareils.innerHTML = "";
      console.log(
        document.querySelector(
          ".group-appareils .dropdown-menu .list-appareils"
        )
      );
      for (let i = 0; i < tagsFilteredAppareils.length; i++) {
        listFactory.createTag(tagsFilteredAppareils[i], ".list-appareils");
      }
    }
  });
});

// pour chaque element du tableau tag on lance tag factory
function createTag(tags, elem) {
  for (let i = 0; i < tags.length; i++) {
    listFactory.createTag(tags[i], elem);
  }
}

// pour chaque tag on ajoute un event au click pour permettre d'ajouter le tag au tag selectionné
function addTagEvent(dropdownItems, tagChoice, tagsContainer) {
  dropdownItems.forEach((elem) => {
    elem.addEventListener("click", (event) => {
      const tagElement = document.createElement("div");
      tagElement.textContent = event.target.textContent;
      tagElement.classList.add("d-flex", "tag-elem", "tag-elem_primary");
      tagChoice.push(event.target.textContent);
      tagsContainer.appendChild(tagElement);
    });
  });
}

function getTagsIngredients() {
  for (let i = 0; i < recipes.length; i++) {
    for (let n = 0; n < recipes[i].ingredients.length; n++) {
      tagsIngredients.push(recipes[i].ingredients[n].ingredient);
    }
  }
}
