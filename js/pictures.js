"use strict";

(() => {
  const formFilter = document.querySelector(".filters");

  window.pictures = [];
  window.filteredPicture = [];
  window.sortMap = {
    popular: "likes",
    discussed: "comments",
    random: "",
  };

  const updateFilter = (data) => {
    window.render(data);
  };
  const filter = (it) => {
    window.filteredPicture = pictures.slice().sort((a, b) => {
      if (it === "random") {
        return Math.random() - 0.5;
      }
      if (it === "discussed") {
        return b[sortMap[it]].length - a[sortMap[it]].length;
      }
      return b[sortMap[it]] - a[sortMap[it]];
    });
  };

  formFilter.addEventListener("change", (evt) => {
    filter(evt.target.value);
    updateFilter(window.filteredPicture);
  });

  const successHandler = (data) => {
    window.pictures = data;
    updateFilter(window.pictures);
  };

  window.fetchLoad(successHandler, errorHandler);
})();
