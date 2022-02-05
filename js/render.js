"use strict";
(() => {
  const template = document
    .querySelector("#picture-template")
    .content.querySelector(".picture");
  const galleryOverlay = document.querySelector(".gallery-overlay");
  const socialBlock = document.querySelector(".social-list");
  const picturesElement = document.querySelector(".pictures");
  const socialTemplate = document
    .querySelector("#social-template")
    .content.querySelector(".social__comment--text");

  const renderUrl = (template, url) => {
    if (!url) {
      return;
    }
    template.querySelector("img").src = url;
  };

  const renderComment = (template, comment) => {
    template.querySelector(".social__picture").src = comment.avatar;
    template.querySelector(".social__text").textContent = comment.message;
    template.querySelector(".social__name").textContent = comment.name;
  };

  const renderSocial = (comments) => {
    const templateElement = socialTemplate.cloneNode(true);
    renderComment(templateElement, comments);
    return templateElement;
  };

  const renderGalleryOverlay = (pictures) => {
    document.querySelector(".gallery-overlay").classList.remove("hidden");
    galleryOverlay.querySelector(".gallery-overlay-image").src = pictures.url;
    galleryOverlay.querySelector(
      ".gallery-overlay-controls-like > .likes-count"
    ).textContent = pictures.likes;
    galleryOverlay.querySelector(
      ".gallery-overlay-controls-comments > .comments-count"
    ).textContent = pictures.comments.length;
    galleryOverlay.querySelector(".social__caption").textContent =
      pictures.description;
    socialBlock.innerHTML = "";
    pictures.comments.forEach((it) => {
      socialBlock.appendChild(renderSocial(it));
    });
    galleryOverlay
      .querySelector(".gallery-overlay-close")
      .addEventListener("click", (e) => {
        e.preventDefault();
        galleryOverlay.classList.add("hidden");
      });
  };

  const renderImages = (pictures, data) => {
    const templateElement = template.cloneNode(true);

    templateElement.setAttribute("id", pictures.id);

    renderUrl(templateElement, pictures.url);

    templateElement.querySelector(".picture-comments").textContent =
      pictures.comments[0].message;
    templateElement.querySelector(".picture-likes").textContent =
      pictures.likes;

    templateElement.addEventListener("click", (evt) => {
      evt.preventDefault();
      const currentElement = data.find(
        (el) => el.id === parseInt(evt.currentTarget.id)
      );
      renderGalleryOverlay(currentElement);
    });

    return templateElement;
  };

  window.render = (data) => {
    picturesElement.innerHTML = "";
    data.forEach((it) => {
      picturesElement.appendChild(renderImages(it, data));
    });
  };
})();
