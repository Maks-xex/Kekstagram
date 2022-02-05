"use strict";
(() => {
  const formFilter = document.querySelector(".filters");

  const updateFilter = (data) => {
    window.render(data);
  };
  const filter = (it) => {
    filteredPicture = pictures.slice().sort((a, b) => {
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
    updateFilter(filteredPicture);
  });

  const successHandler = (data) => {
    pictures = data;
    updateFilter(pictures);
  };

  window.fetchLoad(successHandler, errorHandler);
})();
