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
const tagsContainer = document.querySelector(".tags-container");
const tagsSearch = document.querySelectorAll(".tag-search-input-container");
const tagsSearchIngredients = document.querySelector(".tag-search-ingredients");
const tagsSearchAppareils = document.querySelector(".tag-search-appareils");
const tagsSearchUstensiles = document.querySelector(".tag-search-ustensiles");
const inputIngredients = document.querySelector(
  ".group-ingredients .tag-search-input-container"
);
const inputAppareils = document.querySelector(
  ".group-appareils .tag-search-input-container"
);
const inputUstensiles = document.querySelector(
  ".group-ustensiles .tag-search-input-container"
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
const dropdownMenuIngredients = document.querySelector(
  ".group-ingredients .dropdown-menu"
);
const dropdownMenuAppareils = document.querySelector(
  ".group-appareils .dropdown-menu"
);
const dropdownMenuUstensiles = document.querySelector(
  ".group-ustensiles .dropdown-menu"
);
const btnIconUp = document.querySelectorAll(".btn-group-tag .fa-angle-up");
const alert = document.querySelector(".alert");

// Créé un objet dropdown qui hérite des méthodes de bootstrap dropdown
const dropdownIngredients = new bootstrap.Dropdown(dropdownToggleIngredients);
const dropdownAppareils = new bootstrap.Dropdown(dropdownToggleAppareils);
const dropdownUstensiles = new bootstrap.Dropdown(dropdownToggleUstensiles);

// le tableau de tag
let tagsIngredients = [];
let tagsAppareils = [];
let tagsUstensiles = [];

// observe si un changement a lieu dans les tags et lance addTagEvent
const appareilObserver = new MutationObserver(function () {
  let dropdownItemsAppareils = document.querySelectorAll(
    ".group-appareils .dropdown-item"
  );
  addTagEvent(
    dropdownItemsAppareils,
    tagsChoiceAppareils,
    "tag-elem_marine",
    "appareilsArray"
  );
});
const ingredientObserver = new MutationObserver(function () {
  let dropdownItemsIngredients = document.querySelectorAll(
    ".group-ingredients .dropdown-item"
  );
  addTagEvent(
    dropdownItemsIngredients,
    tagsChoiceIngredients,
    "tag-elem_primary",
    "ingredientsArray"
  );
});
const ustensilesObserver = new MutationObserver(function () {
  let dropdownItemsUstensiles = document.querySelectorAll(
    ".group-ustensiles .dropdown-item"
  );
  addTagEvent(
    dropdownItemsUstensiles,
    tagsChoiceUstensiles,
    "tag-elem_tomato",
    "ustensilesArray"
  );
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

toogleSearch(tagSearchButton);

buttonsGroup.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

document.addEventListener("click", () => {
  hideAll();
});

btnIconUp.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    event.stopPropagation();
    hideAll();
  });
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

// permet de créer la liste de tag
const listFactory = {
  createTag(tag, elem) {
    const listElem = document.createElement("li");
    listElem.classList.add("dropdown-item");

    listElem.textContent = tag;
    document.querySelector(elem).appendChild(listElem);
  },
};

// Filtre les ingrédients pour enlever les doublons
let filteredIngredients = [];
let filteredAppareils = [];
let filteredUstensiles = [];

getAllTags(searchResults);

// tableau de tag sélectionnés initialisé a vide
let tagsChoiceIngredients = [];
let tagsChoiceAppareils = [];
let tagsChoiceUstensiles = [];

// pour chaque element du tableau tag on lance tag factory
function createTag(tags, elem) {
  document.querySelector(elem).innerHTML = "";
  for (let i = 0; i < tags.length; i++) {
    listFactory.createTag(tags[i], elem);
  }
}

// pour chaque tag on ajoute un event au click pour permettre d'ajouter le tag au tag selectionné
function addTagEvent(dropdownItems, tagChoice, tagClass, arrayName) {
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

      // Si le tag sur lequel on clique n'est pas encore sélectionné, on l'ajoute aux tags choisis sous la barre de recherche
      if (tagFound == undefined) {
        tagChoice.push(event.target.textContent);
        tagsContainer.appendChild(tagElement);
        tagElement.appendChild(closeIcon);
        filterByTag(searchResults);
        removeTagOnClick(event.target.textContent, tagChoice);
      }
    });
  });
}

function getTagsIngredients(data) {
  tagsIngredients = [];
  filteredIngredients = [];
  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      for (let n = 0; n < data[i].ingredients.length; n++) {
        tagsIngredients.push(data[i].ingredients[n].ingredient);
      }
    }
    filteredIngredients = filterTags(tagsIngredients);
  }
  createTag(filteredIngredients, ".list-ingredients");
}

function getTagsAppareils(data) {
  tagsAppareils = [];
  filteredAppareils = [];
  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      tagsAppareils.push(data[i].appliance);
    }
    filteredAppareils = filterTags(tagsAppareils);
  }
  createTag(filteredAppareils, ".list-appareils");
}

function getTagsUstensiles(data) {
  tagsUstensiles = [];
  filteredUstensiles = [];
  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      for (let n = 0; n < data[i].ustensils.length; n++) {
        tagsUstensiles.push(data[i].ustensils[n]);
      }
    }
    filteredUstensiles = filterTags(tagsUstensiles);
  }
  createTag(filteredUstensiles, ".list-ustensiles");
}

function filterTags(tags) {
  return tags.filter(function (element, index) {
    return tags.indexOf(element) == index;
  });
}

function removeTagOnClick(id, tagChoice) {
  const tagToRemove = document.querySelector(`.tag-elem[data-id="${id}"]`);
  const tagClose = document.querySelector(`.tag-close[data-id="${id}"]`);

  tagClose.addEventListener("click", () => {
    tagChoice.splice(tagChoice.indexOf(id), 1);
    tagToRemove.remove();

    //On reset les results
    searchResults = recipes;

    // si l'input de recherche est > 3 on lance la recherche
    if (document.querySelector(".input-search").value.length >= 3) {
      filterRecipe(document.querySelector(".input-search").value);

      if (searchResults.length > 0) {
        getRecipes(searchResults);
      }
    }

    // on filtre par tags
    filterByTag(searchResults);
  });
}

function toogleSearch(element) {
  element.forEach((elem) => {
    elem.addEventListener("click", (event) => {
      event.stopPropagation();
      elem.nextSibling.nextSibling.style.display = "flex";
      elem.classList.add("tag-search-button-hidden");
      setTimeout(() => {
        elem.nextSibling.nextSibling.querySelector(".tag-search").focus();
      }, 250);

      if (elem == tagSearchButtonAppareils) {
        tagSearchButtonIngredients.classList.remove("tag-search-button-hidden");
        tagSearchButtonUstensiles.classList.remove("tag-search-button-hidden");
        inputIngredients.style.display = "none";
        inputUstensiles.style.display = "none";
        dropdownIngredients.hide();
        dropdownAppareils.show();
        dropdownUstensiles.hide();
      }
      if (elem == tagSearchButtonIngredients) {
        tagSearchButtonAppareils.classList.remove("tag-search-button-hidden");
        tagSearchButtonUstensiles.classList.remove("tag-search-button-hidden");
        inputAppareils.style.display = "none";
        inputUstensiles.style.display = "none";
        dropdownAppareils.hide();
        dropdownIngredients.show();
        dropdownUstensiles.hide();
      }
      if (elem == tagSearchButtonUstensiles) {
        tagSearchButtonAppareils.classList.remove("tag-search-button-hidden");
        tagSearchButtonIngredients.classList.remove("tag-search-button-hidden");
        inputAppareils.style.display = "none";
        inputIngredients.style.display = "none";
        dropdownAppareils.hide();
        dropdownIngredients.hide();
        dropdownUstensiles.show();
      }
    });
  });
}

function hideAll() {
  tagSearchButton.forEach((elem) => {
    elem.nextSibling.nextSibling.style.display = "none";
    elem.classList.remove("tag-search-button-hidden");
  });
  dropdownAppareils.hide();
  dropdownIngredients.hide();
  dropdownUstensiles.hide();
}

function filterByTag(searchResults) {
  if (tagsChoiceIngredients.length > 0) {
    tagsChoiceIngredients.forEach((tagChoice) => {
      searchResults = searchResults.filter((result) => {
        let isValue = false;

        result.ingredients.forEach((ingredient) => {
          if (ingredient.ingredient.indexOf(tagChoice) != -1) {
            return (isValue = true);
          }
        });

        return isValue;
      });
    });

    if (searchResults.length >= 1) {
      getRecipes(searchResults);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (tagsChoiceAppareils.length > 0) {
    tagsChoiceAppareils.forEach((tagChoice) => {
      searchResults = searchResults.filter((result) => {
        let isValue = false;

        if (result.appliance.indexOf(tagChoice) != -1) {
          return (isValue = true);
        }

        return isValue;
      });
    });

    if (searchResults.length >= 1) {
      getRecipes(searchResults);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (tagsChoiceUstensiles.length > 0) {
    tagsChoiceUstensiles.forEach((tagChoice) => {
      searchResults = searchResults.filter((result) => {
        let isValue = false;

        result.ustensils.forEach((unstensil) => {
          if (unstensil.indexOf(tagChoice) != -1) {
            return (isValue = true);
          }
        });

        return isValue;
      });
    });

    if (searchResults.length >= 1) {
      getRecipes(searchResults);
      setError(false);
    } else {
      setError(true);
    }
  }
  getAllTags(searchResults);
  if (document.querySelector(".input-search").value.length < 3 && !hasTags()) {
    resetResults();
  }
}

function getAllTags(searchResults) {
  getTagsIngredients(searchResults);
  getTagsAppareils(searchResults);
  getTagsUstensiles(searchResults);
}

function resetResults() {
  searchResults = recipes;
  getRecipes(recipes);
  getAllTags(recipes);
}

function hasTags() {
  const allTagsArray = [
    ...tagsChoiceAppareils,
    ...tagsChoiceIngredients,
    ...tagsChoiceUstensiles,
  ];
  if (allTagsArray.length > 0) {
    return true;
  }
  return false;
}

function removeAllTagsChoice() {
  const allTags = document.querySelectorAll(".tag-elem");

  allTags.forEach((elem) => elem.remove());
  tagsChoiceAppareils = [];
  tagsChoiceIngredients = [];
  tagsChoiceUstensiles = [];
}

function setError(bool) {
  if (!bool) {
    alert.classList.add("d-none");
    tagSearchButton.forEach((elem) => {
      elem.removeAttribute("disabled", "");
    });
  } else {
    alert.classList.remove("d-none");
    tagSearchButton.forEach((elem) => {
      elem.setAttribute("disabled", "");
    });
  }
}
