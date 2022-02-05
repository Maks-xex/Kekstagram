"use strict";
(() => {
  const getRandomArbitrary = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const errorHandler = (errorText) => {
    if (!document.querySelector(".error-message")) {
      const errorMessage = document.createElement("div");
      errorMessage.className = "error-message";
      errorMessage.style =
        "margin: 0 auto; text-align: center; background-color: red; z-index: 21; top: 0px; left: 0px; position: sticky; right:0; font-size: 30px;";
      errorMessage.innerHTML = "";
      errorMessage.textContent = errorText;
      document.body.insertAdjacentElement("afterbegin", errorMessage);
    }
  };
})();
