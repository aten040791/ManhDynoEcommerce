
import en from "../data/en.json" with { type: "json" };
import vi from "../data/vi.json" with { type: "json" };
document.addEventListener("DOMContentLoaded", function () {
  const headerNavItems = document.querySelectorAll("#header-nav .header-nav-item");
  const langDropdown = document.querySelector("#lang-dropdown");
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  const textsLangChange = document.querySelectorAll("[data-section]");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function (event) {
      event.preventDefault();
      let language = "English";
       language = this.textContent.trim();
      const flagPath = `../../../backend/owner/assets/images/flags/${
        language === "English" ? "US" : "VN"
      }.png`;
      if(language !== "English"){
        headerNavItems[0].classList.add("mw-120");
        headerNavItems[1].classList.add("mw-130"); 
      }else{
        headerNavItems[0].classList.remove("mw-120");
        headerNavItems[1].classList.remove("mw-130"); 
      }

      langDropdown.innerHTML = `<img src="${flagPath}" class="w-40" alt="${language}"> <a href="#" class="text-decoration-none color-disabled fw-600">${language}</a>`; 
      textsLangChange.forEach((item) =>{
        const section = item.dataset.section;
        const value = item.dataset.value;
        if(language === "English"){
            item.textContent = en[section][value];
        }else{
            item.textContent = vi[section][value];
        }
      })
    });
  });
});
