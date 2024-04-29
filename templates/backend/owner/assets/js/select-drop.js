document.addEventListener("DOMContentLoaded", function () {
  const optionsMenu = document.querySelectorAll("#select-menu");
  const textEditor = document.querySelectorAll(".ck-editor__main");

  for (var i = 0; i < optionsMenu.length; i++) {
    const selectBtn = optionsMenu[i].querySelector("#select-menu-btn");
    selectBtn.addEventListener("click", () => {
      toggleDropdown(optionsMenu[i], i);
      selectBtn.classList.toggle("icon-down");
      selectBtn.parentElement
        .querySelector("#select-options")
        .classList.toggle("d-none");
    });

    const options = optionsMenu[i].querySelectorAll("#select-option");
    const sBtn_text = optionsMenu[i].querySelector("#select-title");
    options.forEach((option) => {
      option.addEventListener("click", () => {
        let selectedOption = option.querySelector(
          "#select-option-text"
        ).innerText;
        const selectMenuBtn = option.parentElement.parentElement.querySelector(
          "#select-menu-img img"
        );
        if (selectMenuBtn) {
          let srcImg = option.querySelector("img").src;
          selectMenuBtn.src = srcImg;
          selectMenuBtn.classList.remove("d-none");
          sBtn_text.classList.add("ms-1");
        }
        sBtn_text.innerText = selectedOption;
        option.parentElement.classList.add("d-none");
        option.parentElement.parentElement.parentElement
          .querySelector("#select-menu-btn")
          .classList.toggle("icon-down");
      });
    });
  }
  const toggleDropdown = (elementDropdown, index) => {
    for (var i = 0; i < optionsMenu.length; i++) {
      if (optionsMenu[i] !== elementDropdown[index]) {
        const selectBtn = optionsMenu[i].querySelector("#select-menu-btn");
        const selectOptions = optionsMenu[i].querySelector("#select-options");
        selectBtn.classList.remove("icon-down");
        selectOptions.classList.add("d-none");
      }
    }
  };
  for (var i = 0; i < textEditor.length; i++) {
    textEditor[i].addEventListener("click", () => {
      for (var i = 0; i < optionsMenu.length; i++) {
        const selectBtn = optionsMenu[i].querySelector("#select-menu-btn");
        const selectOptions = optionsMenu[i].querySelector("#select-options");
        selectBtn.classList.remove("icon-down");
        selectOptions.classList.add("d-none");
      }
    });
  }
});
