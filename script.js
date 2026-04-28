const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const backTop = document.querySelector("[data-back-top]");
const navLinks = [...document.querySelectorAll(".main-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function updateHeader() {
  const scrolled = window.scrollY > 12;
  header.classList.toggle("is-scrolled", scrolled);
  backTop.classList.toggle("is-visible", window.scrollY > 620);
}

function setMenu(open) {
  document.body.classList.toggle("nav-open", open);
  header.classList.toggle("is-open", open);
  nav.classList.toggle("is-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "关闭导航" : "打开导航");
}

function updateActiveLink() {
  const current = sections.reduce((active, section) => {
    const top = section.getBoundingClientRect().top;
    return top < 150 ? section.id : active;
  }, sections[0] ? sections[0].id : "");

  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#${current}`);
  });
}

menuToggle.addEventListener("click", () => {
  setMenu(!nav.classList.contains("is-open"));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  updateHeader();
  updateActiveLink();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 980) {
    setMenu(false);
  }
});

updateHeader();
updateActiveLink();
