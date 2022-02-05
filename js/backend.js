"use strict";
(() => {
  let user = {
    name: "John",
    age: "16",
  };
  const postURL = "https://24.javascript.pages.academy/kekstagram";
  const getURL = "https://24.javascript.pages.academy/kekstagram/data";

  window.fetchLoad = (onSuccess, onError) => {
    fetch(getURL)
      .then(async (res) => {
        res.headers.get("content-type")?.includes("application/json");
        if (!res.ok) {
          throw res.status;
        }
        return res.json();
      })
      .then((data) => onSuccess(data))
      .catch((error) => {
        onError("Статус ответа: " + error);
      });
  };
})();
