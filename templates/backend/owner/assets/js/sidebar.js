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
