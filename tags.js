const tagSearchButton = document.querySelectorAll(".tag-search-button");
const tagSearchButtonIngredients = document.querySelector(
  ".tag-search-ingredients"
);
const tagSearchButtonAppareils = document.querySelector(
  ".tag-search-appareils"
);
const tagSearchButtonUstensiles = document.querySelector(
  ".tag-search-ustensiles"
);
const tagsSearchName = document.querySelectorAll(".tag-search-name");
const tagsContainer = document.querySelector(".tags-container");
const tagsSearch = document.querySelectorAll(".tag-search");
const tagsSearchIngredients = document.querySelector(".tag-search-ingredients");
const tagsSearchAppareils = document.querySelector(".tag-search-appareils");
const tagsSearchUstensiles = document.querySelector(".tag-search-ustensiles");
const inputIngredients = document.querySelector(
  ".tag-search-ingredients .tag-search"
);
const inputAppareils = document.querySelector(
  ".tag-search-appareils .tag-search"
);
const inputUstensiles = document.querySelector(
  ".tag-search-ustensiles .tag-search"
);
const inputNameIngredients = document.querySelector(
  ".tag-search-ingredients .tag-search-name"
);
const inputNameAppareils = document.querySelector(
  ".tag-search-appareils .tag-search-name"
);
const inputNameUstensiles = document.querySelector(
  ".tag-search-ustensiles .tag-search-name"
);
const tagListAppareils = document.querySelector(".list-appareils");
const tagListIngredients = document.querySelector(".list-ingredients");
const tagListUstensiles = document.querySelector(".list-ustensiles");
const buttonsGroup = document.querySelectorAll(".btn-group-tag");
const dropdownToggleIngredients = document.querySelector(
  ".group-ingredients .dropdown-toggle"
);
const dropdownToggleAppareils = document.querySelector(
  ".group-appareils .dropdown-toggle"
);
const dropdownToggleUstensiles = document.querySelector(
  ".group-ustensiles .dropdown-toggle"
);

// Créé un objet dropdown qui hérite des méthodes de bootstrap dropdown
const dropdownIngredients = new bootstrap.Dropdown(dropdownToggleIngredients);
const dropdownAppareils = new bootstrap.Dropdown(dropdownToggleAppareils);
const dropdownUstensiles = new bootstrap.Dropdown(dropdownToggleUstensiles);

// le tableau de tag
const tagsIngredients = [];
const tagsAppareils = [];
const tagsUstensiles = [];

// Récupère tous les ingrédients (même les doublons)
getTagsIngredients();
getTagsAppareils();
getTagsUstensiles();

// Filtre les ingrédients pour enlever les doublons
const filteredIngredients = filterTags(tagsIngredients);
const filteredAppareils = filterTags(tagsAppareils);
const filteredUstensiles = filterTags(tagsUstensiles);

// tableau de tag sélectionnés initialisé a vide
const tagsChoiceIngredients = [];
const tagsChoiceAppareils = [];
const tagsChoiceUstensiles = [];

// observe si un changement a lieu dans les tags et lance addTagEvent
const appareilObserver = new MutationObserver(function () {
  let dropdownItemsAppareils = document.querySelectorAll(
    ".group-appareils .dropdown-item"
  );
  addTagEvent(dropdownItemsAppareils, tagsChoiceAppareils, "tag-elem_marine");
});
const ingredientObserver = new MutationObserver(function () {
  let dropdownItemsIngredients = document.querySelectorAll(
    ".group-ingredients .dropdown-item"
  );
  addTagEvent(
    dropdownItemsIngredients,
    tagsChoiceIngredients,
    "tag-elem_primary"
  );
});
const ustensilesObserver = new MutationObserver(function () {
  let dropdownItemsUstensiles = document.querySelectorAll(
    ".group-ustensiles .dropdown-item"
  );
  addTagEvent(dropdownItemsUstensiles, tagsChoiceUstensiles, "tag-elem_tomato");
});

appareilObserver.observe(tagListAppareils, { subtree: true, childList: true });
ingredientObserver.observe(tagListIngredients, {
  subtree: true,
  childList: true,
});
ustensilesObserver.observe(tagListUstensiles, {
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
createTag(filteredAppareils, ".list-appareils");
createTag(filteredUstensiles, ".list-ustensiles");

tagSearchButton.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    event.stopPropagation();
    elem.querySelector(".tag-search").style.display = "block";
    elem.querySelector(".tag-search-name").style.display = "none";
    if (elem == tagSearchButtonAppareils) {
      inputIngredients.style.display = "none";
      inputUstensiles.style.display = "none";
      inputNameIngredients.style.display = "block";
      inputNameUstensiles.style.display = "block";
      dropdownIngredients.hide();
      dropdownAppareils.show();
      dropdownUstensiles.hide();
    }
    if (elem == tagSearchButtonIngredients) {
      inputAppareils.style.display = "none";
      inputUstensiles.style.display = "none";
      inputNameAppareils.style.display = "block";
      inputNameUstensiles.style.display = "block";
      dropdownAppareils.hide();
      dropdownIngredients.show();
      dropdownUstensiles.hide();
    }
    if (elem == tagSearchButtonUstensiles) {
      inputAppareils.style.display = "none";
      inputIngredients.style.display = "none";
      inputNameAppareils.style.display = "block";
      inputNameIngredients.style.display = "block";
      dropdownAppareils.hide();
      dropdownIngredients.hide();
      dropdownUstensiles.show();
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
  dropdownUstensiles.hide();
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
      let tagsFilteredAppareils = filteredAppareils.filter((tag) => {
        let resultIndex = tag.indexOf(event.target.value);
        if (resultIndex == 0) {
          return true;
        }
      });
      tagListAppareils.innerHTML = "";
      for (let i = 0; i < tagsFilteredAppareils.length; i++) {
        listFactory.createTag(tagsFilteredAppareils[i], ".list-appareils");
      }
    }
    if (elem == inputUstensiles) {
      let tagsFilteredUstensiles = filteredUstensiles.filter((tag) => {
        let resultIndex = tag.indexOf(event.target.value);
        if (resultIndex == 0) {
          return true;
        }
      });
      tagListUstensiles.innerHTML = "";
      for (let i = 0; i < tagsFilteredUstensiles.length; i++) {
        listFactory.createTag(tagsFilteredUstensiles[i], ".list-ustensiles");
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
function addTagEvent(dropdownItems, tagChoice, tagClass) {
  dropdownItems.forEach((elem) => {
    elem.addEventListener("click", (event) => {
      const tagElement = document.createElement("div");
      const closeIcon = document.createElement("i");
      closeIcon.classList.add(
        "fa-regular",
        "fa-circle-xmark",
        "ms-2",
        "tag-close"
      );
      tagElement.textContent = event.target.textContent;
      tagElement.classList.add(
        "d-flex",
        "tag-elem",
        tagClass,
        "justify-content-center",
        "align-items-center",
        "rounded"
      );
      tagElement.setAttribute("data-id", event.target.textContent);
      closeIcon.setAttribute("data-id", event.target.textContent);
      const tagFound = tagChoice.find((elem) => {
        return elem == event.target.textContent;
      });
      if (tagFound == undefined) {
        tagChoice.push(event.target.textContent);
        tagsContainer.appendChild(tagElement);
        tagElement.appendChild(closeIcon);
        console.log(tagChoice);
        removeTag(event.target.textContent, tagChoice);
      }
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

function getTagsAppareils() {
  for (let i = 0; i < recipes.length; i++) {
    tagsAppareils.push(recipes[i].appliance);
  }
}

function getTagsUstensiles() {
  for (let i = 0; i < recipes.length; i++) {
    for (let n = 0; n < recipes[i].ustensils.length; n++) {
      tagsUstensiles.push(recipes[i].ustensils[n]);
    }
  }
}

function filterTags(tags) {
  return tags.filter(function (element, index) {
    return tags.indexOf(element) == index;
  });
}

function removeTag(id, tagChoice) {
  const tagToRemove = document.querySelector(".tag-elem[data-id='" + id + "']");
  const tagClose = document.querySelector(".tag-close[data-id='" + id + "']");

  tagClose.addEventListener("click", () => {
    tagChoice.splice(tagChoice.indexOf(id), 1);
    tagToRemove.remove();
  });
}
