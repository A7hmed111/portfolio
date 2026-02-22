/* ============================= */
/* Select Elements */
/* ============================= */

const html = document.documentElement;
const toggleBtn = document.getElementById("themeToggle");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");
const bars = document.querySelectorAll(".progress-bar");
const navbar = document.querySelector(".navbar-custom");
const scrollProgress = document.querySelector(".scroll-progress");

const modal = document.getElementById("codeModal");
const codeImage = document.getElementById("codeImage");
const closeModal = document.querySelector(".close-modal");

/* ============================= */
/* Load Saved Theme */
/* ============================= */

const savedTheme = localStorage.getItem("theme");
html.dataset.theme = savedTheme ? savedTheme : "dark";

if (toggleBtn) {
  toggleBtn.textContent =
    html.dataset.theme === "dark" ? "☀️" : "🌙";

  toggleBtn.addEventListener("click", () => {
    const newTheme =
      html.dataset.theme === "dark" ? "light" : "dark";

    html.dataset.theme = newTheme;
    toggleBtn.textContent =
      newTheme === "dark" ? "☀️" : "🌙";

    localStorage.setItem("theme", newTheme);
  });
}

/* ============================= */
/* Scroll Reveal */
/* ============================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* ============================= */
/* Animate Progress Bars */
/* ============================= */

const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        bar.style.width = bar.dataset.width;
        progressObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.4 }
);

bars.forEach((bar) => progressObserver.observe(bar));

/* ============================= */
/* Active Nav Link */
/* ============================= */

function highlightNav() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

/* ============================= */
/* Navbar Shrink */
/* ============================= */

function shrinkNavbar() {
  if (!navbar) return;

  navbar.classList.toggle(
    "navbar-scrolled",
    window.scrollY > 50
  );
}

/* ============================= */
/* Scroll Listener */
/* ============================= */

window.addEventListener("scroll", () => {
  highlightNav();
  shrinkNavbar();

  if (scrollProgress) {
    const scrolled =
      (window.scrollY /
        (document.documentElement.scrollHeight -
          window.innerHeight)) *
      100;

    scrollProgress.style.width = scrolled + "%";
  }
});

/* Run once on load */
highlightNav();
shrinkNavbar();

/* ============================= */
/* 3D Tilt Effect */
/* ============================= */

if (window.innerWidth > 992) {
  const cards = document.querySelectorAll(".card-modern");

  cards.forEach((card) => {
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

/* ============================= */
/* Stagger Why Cards */
/* ============================= */

const whyCards = document.querySelectorAll(
  "#why .card-modern"
);

whyCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
});

/* ============================= */
/* Project Code Modal */
/* ============================= */

document.querySelectorAll(".view-code-btn").forEach(
  (btn) => {
    btn.addEventListener("click", () => {
      const codePath =
        btn.getAttribute("data-code");

      if (modal && codeImage && codePath) {
        codeImage.src = codePath;
        modal.style.display = "flex";
      }
    });
  }
);

if (modal && closeModal) {
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modal.style.display = "none";
    }
  });
}