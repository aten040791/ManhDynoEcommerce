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
const resultsBox = document.querySelector("#form_search-suggestion");
const inputBox = document.querySelector("#input-title-box");
const iconDrop = document.querySelector("#icon-drop");

if (inputBox) {
  inputBox.addEventListener("keyup", function () {
    resultsBox.classList.remove("d-none");
    let result = [];
    let input = inputBox.value;
    if (input.length) {
      iconDrop.classList.remove("d-none");
      result = availableKeywords.filter((keyword) => {
        return keyword.toLowerCase().includes(input.toLowerCase());
      });
    }
    display(result);
    if (!result.length) {
      iconDrop.classList.add("d-none");
      resultsBox.classList.add("d-none");
    }
  });
}


function display(result) {
  const content = result.map((list) => {
    return (
      "<li onclick=selectInput(this) class='list-group-item bg-hover text-sm'>" +
      list +
      "</li>"
    );
  });
  resultsBox.innerHTML = "<ul class='list-group'>" + content.join("") + "</ul>";
}

function selectInput(list) {
  inputBox.value = list.innerHTML;
  iconDrop.classList.add("d-none");
  resultsBox.classList.add("d-none");
}
