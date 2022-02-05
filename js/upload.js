"use strict";
(() => {
  const FILE_TYPES = ["jpg", "png", "jpeg", "gif"];

  const fileChooser = document.querySelector("#upload-file"),
    photoFilter = document.querySelector(".upload-overlay"),
    preview = document.querySelector(".upload-form-preview > img"),
    closeFilter = document.querySelector(".upload-form-cancel"),
    //variable size control
    resizeControl = document.querySelector(".upload-resize-controls"),
    buttonDec = document.querySelector(".upload-resize-controls-button-dec"),
    buttonInc = document.querySelector(".upload-resize-controls-button-inc");
  //variable effects
  let effectValue = 20;
  const effectControl = document.querySelector(".upload-effect-controls");
  const [effectChrome, effectSepia, effectMarvin, effectPhobos, effectHeat] = [
    document.querySelector("#upload-effect-chrome"),
    document.querySelector("#upload-effect-sepia"),
    document.querySelector("#upload-effect-marvin"),
    document.querySelector("#upload-effect-phobos"),
    document.querySelector("#upload-effect-heat"),
  ];

  const uploadSubmit = document.querySelector("#upload-submit");

  uploadSubmit.addEventListener("click", (evt) => {
    evt.preventDefault();
    // window.fetchUpload(errorHandler, preview);
  });

  const pin = document.querySelector(".upload-effect-level-pin");
  const val = document.querySelector(".upload-effect-level-val");

  let size = preview.clientWidth;
  let stand = preview.clientWidth;
  resizeControl.addEventListener("click", (evt) => {
    if (!preview.hasAttribute("style")) {
      size = preview.clientWidth;
      stand = preview.clientWidth;
    }
    if (evt.target === buttonInc) {
      size += stand * 0.05;
    }
    if (evt.target === buttonDec) {
      size -= stand * 0.05;
    }
    preview.style.width = size + "px";
    document.querySelector(".upload-resize-controls-value").value =
      ((100 * size) / stand).toFixed() + "%";
  });

  effectControl.addEventListener("change", (evt) => {
    evt.preventDefault();
    window.renderEffect = (effectValues) => {
      switch (evt.target) {
        case effectChrome:
          preview.style.filter = "grayscale(" + effectValues + "%)";
          break;
        case effectSepia:
          preview.style.filter = "sepia(" + effectValues + "%)";
          break;
        case effectMarvin:
          preview.style.filter = "invert(" + effectValues + "%)";
          break;
        case effectPhobos:
          preview.style.filter = "blur(" + effectValues + "px)";
          break;
        case effectHeat:
          preview.style.filter = "brightness(" + effectValues * 10 + "%)";
          break;
        default:
          preview.style.filter = "none";
      }
    };
    renderEffect(effectValue);
  });

  pin.addEventListener("mousedown", (evt) => {
    evt.preventDefault();
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };
    const onMouseMove = (moveEvent) => {
      moveEvent.preventDefault();
      let shift = {
        x: startCoords.x - moveEvent.clientX,
        y: startCoords.y - moveEvent.clientY,
      };
      startCoords = {
        x: moveEvent.clientX,
        y: moveEvent.clientY,
      };
      pin.style.left = pin.offsetLeft - shift.x + "px";
      val.style.width = pin.offsetLeft - shift.x + "px";
      if (pin.offsetLeft >= 455) {
        pin.style.left = "455px";
        val.style.width = "455px";
      }
      if (pin.offsetLeft <= 0) {
        pin.style.left = "0";
        val.style.width = "0";
      }
      if (!document.querySelector("#upload-effect-none").checked) {
        effectValue = ((pin.offsetLeft * 100) / 455).toFixed();
        try {
          window.renderEffect(effectValue);
        } catch {}
      }
    };
    const onMouseUp = (upEvent) => {
      upEvent.preventDefault();
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });

  closeFilter.addEventListener("click", (evt) => {
    evt.preventDefault();
    photoFilter.classList.add("hidden");
    document.querySelector("#upload-select-image").reset();
    preview.removeAttribute("style");
  });

  fileChooser.addEventListener("change", () => {
    photoFilter.classList.remove("hidden");
    let file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });
    if (matches) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
})();
