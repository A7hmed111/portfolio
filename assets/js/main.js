/* ============================= */
/* Select Elements */
/* ============================= */

const html = document.documentElement;
const toggleBtn = document.getElementById("themeToggle");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const bars = document.querySelectorAll(".progress-bar");
const navbar = document.querySelector(".navbar-custom");

/* ============================= */
/* Load Saved Theme */
/* ============================= */
/* Subtle floating effect */

const heroImg = document.querySelector(".hero-img");

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  html.dataset.theme = savedTheme;
  toggleBtn.textContent = savedTheme === "dark" ? "☀️" : "🌙";
} else {
  html.dataset.theme = "dark";
  toggleBtn.textContent = "☀️";
}

/* ============================= */
/* Theme Toggle */
/* ============================= */

toggleBtn.addEventListener("click", () => {
  const currentTheme = html.dataset.theme;

  if (currentTheme === "dark") {
    html.dataset.theme = "light";
    toggleBtn.textContent = "🌙";
    localStorage.setItem("theme", "light");
  } else {
    html.dataset.theme = "dark";
    toggleBtn.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  }
});

/* ============================= */
/* Scroll Reveal */
/* ============================= */

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add("active");
    }
  });
}

/* ============================= */
/* Animate Progress Bars */
/* ============================= */

function animateBars() {
  bars.forEach((bar) => {
    if (!bar.classList.contains("animated")) {
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        bar.style.width = bar.dataset.width;
        bar.classList.add("animated");
      }
    }
  });
}

/* ============================= */
/* Active Nav Link on Scroll */
/* ============================= */

function highlightNav() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(currentSection)) {
      link.classList.add("active");
    }
  });
}

/* ============================= */
/* Navbar Shrink on Scroll */
/* ============================= */

function shrinkNavbar() {
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.style.padding = "10px 0";
    navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
  } else {
    navbar.style.padding = "20px 0";
    navbar.style.boxShadow = "none";
  }
}

/* ============================= */
/* Scroll Event */
/* ============================= */

let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      revealOnScroll();
      animateBars();
      highlightNav();
      shrinkNavbar();
      ticking = false;
    });
    ticking = true;
  }
});

/* Run once on load */
revealOnScroll();
animateBars();
highlightNav();
/* ============================= */
/* 3D Tilt Effect */
/* ============================= */

if (window.innerWidth > 992) {
  const cards = document.querySelectorAll(".card-modern");

  cards.forEach(card => {

    card.style.transition = "transform 0.2s ease";
    card.style.transformStyle = "preserve-3d";

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();

      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateX = (0.5 - y) * 10; 
      const rotateY = (x - 0.5) * 10;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });

  });
}
/* Stagger animation for Why cards */

const whyCards = document.querySelectorAll("#why .card-modern");

whyCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});
/* ============================= */
/* Project Code Modal */
/* ============================= */

const modal = document.getElementById("codeModal");
const codeImage = document.getElementById("codeImage");
const closeModal = document.querySelector(".close-modal");

document.querySelectorAll(".view-code-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const codePath = btn.getAttribute("data-code");
    codeImage.src = codePath;
    modal.style.display = "flex";
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});