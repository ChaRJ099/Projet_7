// Elements du DOM
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

// Tableaux de tags
let tagsIngredients = [];
let tagsAppareils = [];
let tagsUstensiles = [];

// Constructeur permettant d’instancier un nouvel observateur de mutations DOM avec fonction callback qui appelle addTagEvent
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

// Observe si un changement a lieu dans les tags et lance addTagEvent si c'est le cas
appareilObserver.observe(tagListAppareils, { subtree: true, childList: true });
ingredientObserver.observe(tagListIngredients, {
  subtree: true,
  childList: true,
});
ustensilesObserver.observe(tagListUstensiles, {
  subtree: true,
  childList: true,
});

// On appelle la fonction toogleSearch
toogleSearch(tagSearchButton);

// stopPropagation pour éviter les event des éléments parents
buttonsGroup.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

// Appelle le fonction hideAll au clic dans le document
document.addEventListener("click", () => {
  hideAll();
});

// stopPropagation et hideAll au clic sur chaque elem de btnIconUp (icone angle up)
btnIconUp.forEach((elem) => {
  elem.addEventListener("click", (event) => {
    event.stopPropagation();
    hideAll();
  });
});

// Pour chaque barre de recherche associées aux listes de tags
tagsSearch.forEach((elem) => {
  elem.addEventListener("input", (event) => {
    // S'il s'agit de l'input ingrédients
    if (elem == inputIngredients) {
      // filtre le tableau de tags ingrédients
      let tagsFilteredIngredient = filteredIngredients.filter((tag) => {
        // On compare la valeur saisie dans la recherche de tags avec les tags de la liste
        let resultIndex = tag.indexOf(event.target.value);
        // Si la comparaison retourne une valeur autre que -1 (aucun résultat), on retourne true
        if (resultIndex != -1) {
          return true;
        }
      });
      // On réinitialise la liste de tags
      tagListIngredients.innerHTML = "";
      // Boucle sur tableau de tags filtrés et créé la liste de tags en fonction
      for (let i = 0; i < tagsFilteredIngredient.length; i++) {
        listFactory.createTag(tagsFilteredIngredient[i], ".list-ingredients");
      }
    }
    // S'il s'agit de l'input appareils
    if (elem == inputAppareils) {
      // filtre le tableau de tags appareils
      let tagsFilteredAppareils = filteredAppareils.filter((tag) => {
        // On compare la valeur saisie dans la recherche de tags avec les tags de la liste
        let resultIndex = tag.indexOf(event.target.value);
        // Si la comparaison retourne une valeur autre que -1 (aucun résultat), on retourne true
        if (resultIndex != -1) {
          return true;
        }
      });
      // On réinitialise la liste de tags
      tagListAppareils.innerHTML = "";
      // Boucle sur tableau de tags filtrés et créé la liste de tags en fonction
      for (let i = 0; i < tagsFilteredAppareils.length; i++) {
        listFactory.createTag(tagsFilteredAppareils[i], ".list-appareils");
      }
    }
    // S'il s'agit de l'input ustensils
    if (elem == inputUstensiles) {
      // filtre le tableau de tags ustensils
      let tagsFilteredUstensiles = filteredUstensiles.filter((tag) => {
        let resultIndex = tag.indexOf(event.target.value);
        if (resultIndex != -1) {
          return true;
        }
      });
      // On réinitialise la liste de tags
      tagListUstensiles.innerHTML = "";
      // Boucle sur tableau de tags filtrés et créé la liste de tags en fonction
      for (let i = 0; i < tagsFilteredUstensiles.length; i++) {
        listFactory.createTag(tagsFilteredUstensiles[i], ".list-ustensiles");
      }
    }
  });
});

// Permet de créer la liste de tag
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

// tableaux des tags sélectionnés initialisés à vide
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

/**
 * Boucle sur les ingrédients de l'objet data
 * Pousse les éléments ingrédient dans tagsIngredients
 * Filtre tagsIngredients et enregistre dans filteredIngredients (-> enlève doublons)
 * Créer le tag à partir du tableau d'ingrédients filtré
 *
 * @param {*} data
 */
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

/**
 * Boucle sur les appareils de l'objet data
 * Pousse les éléments appareil dans tagsAppareils
 * Filtre tagsAppareils et enregistre dans filteredAppareils (-> enlève doublons)
 * Créer le tag à partir du tableau d'appareils filtré
 *
 * @param {*} data
 */

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

/**
 * Boucle sur les ustensiles de l'objet data
 * Pousse les éléments ustensile dans tagsUstensils
 * Filtre tagsUstensils et enregistre dans filteredUstensils (-> enlève doublons)
 * Créer le tag à partir du tableau d'ustensils filtré
 *
 * @param {*} data
 */

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

/**
 * Supprime les doublons dans tags
 *
 * @param {*} tags
 * @returns
 */
function filterTags(tags) {
  return tags.filter(function (element, index) {
    return tags.indexOf(element) == index;
  });
}

/**
 * Au clic sur tagClose, supprime le tag sous la barre de recherche principale à l'aide de son id
 * Lance la recherche principale s'il y avait une saisie puis filtre par tag
 *
 * @param {*} id
 * @param {*} tagChoice
 */
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

/**
 * Au clic, pour chaque input des trois boutons :
 * Affiche l'input de recherche avancée du bouton cliqué
 * Affiche la liste de tags du bouton cliqué
 * Cache les listes des deux autres boutons
 *
 * @param {*} element
 */
function toogleSearch(element) {
  element.forEach((elem) => {
    elem.addEventListener("click", (event) => {
      event.stopPropagation();
      elem.nextSibling.nextSibling.style.display = "flex";
      elem.classList.add("tag-search-button-hidden");
      // Override le focus auto du dropdown pour cibler l'input de recherche
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

// Cache toutes les listes de tags pour chacun des dropdowns
function hideAll() {
  tagSearchButton.forEach((elem) => {
    elem.nextSibling.nextSibling.style.display = "none";
    elem.classList.remove("tag-search-button-hidden");
  });
  dropdownAppareils.hide();
  dropdownIngredients.hide();
  dropdownUstensiles.hide();
}

/**
 * Recherche avancée prenant en compte les tags sélectionnés
 *
 * @param {*} searchResults
 */
function filterByTag(searchResults) {
  // S'il y a au moins un tag dans le tableau des tags "ingrédients" sélectionnés
  if (tagsChoiceIngredients.length > 0) {
    // Pour chaque tag de ce tableau
    tagsChoiceIngredients.forEach((tagChoice) => {
      // Filtre les résultats de la recherche principale
      searchResults = searchResults.filter((result) => {
        let isValue = false;
        // Pour chaque ingrédient de chaque recette en résultat de recherche principale
        result.ingredients.forEach((ingredient) => {
          // Si correspondance entre le tag ingrédient choisi et un des ingrédients de la recette
          if (ingredient.ingredient.indexOf(tagChoice) != -1) {
            // Assigne true à isValue (la méthode filter attend un booléen)
            return (isValue = true);
          }
        });
        // Retourne isValue (si true, ajout à searchResults, sinon n'est pas ajouté)
        return isValue;
      });
    });
    // Si au moins un résultat trouvé, affiche la recette du résultat de recherche et cache le message d'erreur. Sinon, affiche le message d'erreur et bloque les boutons de tags
    if (searchResults.length >= 1) {
      getRecipes(searchResults);
      setError(false);
    } else {
      setError(true);
    }
  }

  // S'il y a au moins un tag dans le tableau des tags "appareils" sélectionnés
  if (tagsChoiceAppareils.length > 0) {
    // Pour chaque tag de ce tableau
    tagsChoiceAppareils.forEach((tagChoice) => {
      // Filtre les résultats de la recherche principale
      searchResults = searchResults.filter((result) => {
        let isValue = false;
        // Si correspondance entre le tag appareil choisi et un des appareils de la recette
        if (result.appliance.indexOf(tagChoice) != -1) {
          // Assigne true à isValue (la méthode filter attend un booléen)
          return (isValue = true);
        }
        // Retourne isValue (si true, ajout à searchResults, sinon n'est pas ajouté)
        return isValue;
      });
    });
    //Si au moins un résultat trouvé, affiche la recette du résultat de recherche et cache le message d'erreur. Sinon, affiche le message d'erreur et bloque les boutons de tags
    if (searchResults.length >= 1) {
      getRecipes(searchResults);
      setError(false);
    } else {
      setError(true);
    }
  }
  // S'il y a au moins un tag dans le tableau des tags "ustensiles" sélectionnés
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
  // cf. fonction)
  getAllTags(searchResults);
  // Si la valeur saisie dans la recherche principale est inérieure à trois caractères et qu'il n'y a pas de tags sélectionnés :
  if (document.querySelector(".input-search").value.length < 3 && !hasTags()) {
    // ...on réinitialise les recettes affichées (toutes les recettes non filtrées)
    resetResults();
  }
}

/**
 * Permet de récupérer, avec une seule fonction, les tags des trois tableaux de tags filtrés
 *
 * @param {*} searchResults
 */
function getAllTags(searchResults) {
  getTagsIngredients(searchResults);
  getTagsAppareils(searchResults);
  getTagsUstensiles(searchResults);
}

// Permet de réinitialiser le contenu de la page des recettes et des listes de tags au point de départ, sans filtres.
function resetResults() {
  searchResults = recipes;
  getRecipes(recipes);
  getAllTags(recipes);
}

// Détecte s'il y a des tags selectionnés
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

// Supprime tous les tags des tableaux contenant les tags sélectionnés
function removeAllTagsChoice() {
  const allTags = document.querySelectorAll(".tag-elem");

  allTags.forEach((elem) => elem.remove());
  tagsChoiceAppareils = [];
  tagsChoiceIngredients = [];
  tagsChoiceUstensiles = [];
}

/**
 * Si setError est true, affiche le message d'erreur et rend les boutons de recherches de tags inutilisables
 *
 * @param {*} bool
 */
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
