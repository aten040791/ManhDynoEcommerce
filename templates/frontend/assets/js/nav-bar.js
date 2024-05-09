document.addEventListener("DOMContentLoaded", function () {
  const iconBars = document.querySelector("#icon-bars");
  const headerNav = document.querySelector("#header-nav");
  const langDropdown = document.querySelector("#lang-dropdown");
  iconBars.addEventListener("click", function () {
    if (langDropdown.classList.contains("show")) {
      langDropdown.classList.remove("show");
    }
    headerNav.classList.toggle("active");
  });

  langDropdown.addEventListener("click", function () {
    headerNav.classList.remove("active");
    this.classList.add("show");
  });

  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      const language = this.textContent.trim();
      const flagPath = `../../../backend/owner/assets/images/flags/${
        language === "English" ? "US" : "VN"
      }.png`;

      langDropdown.innerHTML = `<img src="${flagPath}" class="w-40" alt="${language}"> <a href="#" class="text-decoration-none color-disabled fw-600">${language}</a>`;
    });
  });
});
