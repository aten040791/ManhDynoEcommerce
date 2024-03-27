let arrow = document.querySelectorAll(".arrow");
let sidebarNavItem = document.querySelectorAll(
  ".sidebar__nav .sidebar__link-dropdown .sidebar__nav-title"
);
console.log(sidebarNavItem);
for (var i = 0; i < arrow.length; i++) {
  arrow[i].addEventListener("click", (e) => {
    let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
    arrowParent.classList.toggle("showMenu");
  });
}
for (var i = 0; i < sidebarNavItem.length; i++) {
  sidebarNavItem[i].addEventListener("click", (e) => {
    let navItemParent = e.target.parentElement.parentElement.parentElement; //selecting main parent of arrow
    navItemParent.classList.toggle("showMenu");
  });
}
let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

const optionsMenu = document.querySelectorAll(".select__menu");
for (var i = 0; i < optionsMenu.length; i++) {
  const selectBtn = optionsMenu[i].querySelector(".select__menu-btn");
  selectBtn.addEventListener("click", () => {
    selectBtn.parentElement.classList.toggle("active");
  });
  const options = optionsMenu[i].querySelectorAll(".select__option");
  const sBtn_text = optionsMenu[i].querySelector(".select__title");
  options.forEach((option) => {
    option.addEventListener("click", () => {
      let selectedOption = option.querySelector(".menu__option-text").innerText;
      const selectMenuBtn = option.parentElement.parentElement.querySelector(
        ".select__menu-img img"
      );
      console.log(selectedOption);
      if (selectMenuBtn) {
        let srcImg = option.querySelector("img").src;
        selectMenuBtn.src = srcImg;
        selectMenuBtn.classList.remove("hide");
      }
      sBtn_text.innerText = selectedOption;
      option.parentElement.parentElement.classList.remove("active");
    });
  });
}

var logOutBtn = document.querySelector(".bx-log-out");
logOutBtn.addEventListener("click", function () {
  window.location.href = "../login/index.html";
});
