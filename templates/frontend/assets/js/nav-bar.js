document.addEventListener("DOMContentLoaded", function () {
  var navItems = document.querySelectorAll(".header__nav li"); // Lấy tất cả các thẻ li trong .header__nav
  const iconBars = document.querySelector(".fa-bars");
  const headerNav = document.querySelector("#header__nav");
  const languageDropdown = document.getElementById("languageDropdown");
  const languageDropdownResponsive = document.getElementById(
    "languageDropdownResponsive"
  );

  navItems.forEach(function (item) {
    item.addEventListener("click", function () {
      var link = this.querySelector("a"); // Tìm thẻ a trong thẻ li
      if (link) {
        window.location.href = link.href; // Chuyển hướng đến địa chỉ trong href của thẻ a
      }
    });
  });

  iconBars.addEventListener("click", function () {
    // Close the language dropdowns if they are open
    languageDropdown.classList.remove("show");
    languageDropdownResponsive.classList.remove("show");
    // Toggle the main menu
    headerNav.classList.toggle("active");
  });

  languageDropdownResponsive.addEventListener("click", function () {
    // Ensure other menus are closed when opening the language menu
    headerNav.classList.remove("active");
    this.classList.toggle("show");
  });
});

function changeLanguage(language, flagPath) {
  const languageButton = document.getElementById("languageDropdown");
  languageButton.innerHTML = `<img src="${flagPath}" alt="${language}"> <a href="#">${language}</a>`;
  const languageButtonResponsive = document.getElementById(
    "languageDropdownResponsive"
  );
  languageButtonResponsive.innerHTML = `<img src="${flagPath}" alt="${language}" > `;
}

function changeLanguageResponsive(language, flagPath) {
  const languageButton = document.getElementById("languageDropdown");
  languageButton.innerHTML = `<img src="${flagPath}" alt="${language}"><a href="#">${language}</a> `;
  const languageButtonResponsive = document.getElementById(
    "languageDropdownResponsive"
  );
  languageButtonResponsive.innerHTML = `<img src="${flagPath}" alt="${language}" > `;
}
