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

let availableKeywords = [
  "Learn about ReacJS for beginners",
  "Học về ReactJS cho người mới bắt đầu",
  "Tutorial about JS language for beginners",
  "Hướng dẫn về ngôn ngữ JS cho người mới bắt đầu",
  "Learn about set up ReacJS project for beginners",
  "Học về cách tạo dự án ReactJS cho người mới bắt đầu",
  "Learn about NodeJS for beginners",
  "Học về NodeJS cho người mới bắt đầu",
  "Learn about create NodeJS project for beginners",
  "Học về cách tạo dự án NodeJS cho người mới bắt đầu",
];
const resultsBox = document.querySelector(".form__search-suggestion");
const inputBox = document.querySelector("#input-box");
const iconDrop = document.querySelector("#icon-drop");

inputBox.addEventListener("keyup", function () {
  resultsBox.classList.remove("hide");
  let result = [];
  let input = inputBox.value;
  if (input.length) {
    iconDrop.classList.remove("hide");
    result = availableKeywords.filter((keyword) => {
      return keyword.toLowerCase().includes(input.toLowerCase());
    });
  }
  display(result);
  if (!result.length) {
    iconDrop.classList.add("hide");
    resultsBox.classList.add("hide");
  }
});

function display(result) {
  const content = result.map((list) => {
    return "<li onclick=selectInput(this)><span>" + list + "</span></li>";
  });
  resultsBox.innerHTML = "<ul>" + content.join("") + "</ul>";
}

function selectInput(list) {
  inputBox.value = list.children[0].innerHTML;
  iconDrop.classList.add("hide");
  resultsBox.classList.add("hide");
}
