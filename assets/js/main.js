/* ============================= */
/* DOM References                */
/* ============================= */

const html          = document.documentElement;
const navbar        = document.querySelector(".navbar-custom");
const scrollProgress = document.querySelector(".scroll-progress");
const toggleBtn     = document.getElementById("themeToggle");
const modal         = document.getElementById("codeModal");
const codeImage     = document.getElementById("codeImage");
const sections      = document.querySelectorAll("section[id]");
const navLinks      = document.querySelectorAll(".nav-links a");
const progressBars  = document.querySelectorAll(".progress-bar");

/* ============================= */
/* Theme                         */
/* ============================= */

html.dataset.theme = localStorage.getItem("theme") ?? "dark";

if (toggleBtn) {
  const updateToggleIcon = () => {
    toggleBtn.textContent = html.dataset.theme === "dark" ? "☀️" : "🌙";
  };

  updateToggleIcon();

  toggleBtn.addEventListener("click", () => {
    const newTheme = html.dataset.theme === "dark" ? "light" : "dark";
    html.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
    updateToggleIcon();
  });
}

/* ============================= */
/* Scroll Reveal                 */
/* ============================= */

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

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ============================= */
/* Progress Bars                 */
/* ============================= */

const progressObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width;
        progressObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

progressBars.forEach((bar) => progressObserver.observe(bar));

/* ============================= */
/* Active Nav Link               */
/* ============================= */

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.6 }
);

sections.forEach((section) => navObserver.observe(section));

/* ============================= */
/* Navbar + Scroll Progress      */
/* ============================= */

function onScroll() {
  if (navbar) {
    navbar.classList.toggle("navbar-scrolled", window.scrollY > 50);
  }

  if (scrollProgress) {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = `${(window.scrollY / scrollable) * 100}%`;
  }
}

window.addEventListener("scroll", onScroll);
onScroll(); // run once on load

/* ============================= */
/* 3D Tilt Effect (desktop only) */
/* ============================= */

if (window.innerWidth > 992) {
  document.querySelectorAll(".card-modern").forEach((card) => {
    card.style.transition = "transform 0.2s ease";
    card.style.transformStyle = "preserve-3d";

    card.addEventListener("mousemove", (e) => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const rotateX = (0.5 - (e.clientY - top) / height) * 10;
      const rotateY = ((e.clientX - left) / width - 0.5) * 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
  });
}

/* ============================= */
/* Why Cards Stagger             */
/* ============================= */

document.querySelectorAll("#why .card-modern").forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

/* ============================= */
/* Code Modal                    */
/* ============================= */

if (modal && codeImage) {
  const openModal = (src) => {
    codeImage.src = src;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    codeImage.src = "";
  };

  document.querySelectorAll(".view-code-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const codePath = btn.dataset.code;
      if (codePath) openModal(codePath);
    });
  });

  document.querySelector(".close-modal")?.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
  });
}

/* ============================= */
/* Mobile Menu                   */
/* ============================= */

const menuToggle  = document.querySelector(".menu-toggle");
const closeBtn    = document.querySelector(".close-menu");
const mobileMenu  = document.getElementById("mobileMenu");
const backdrop    = document.getElementById("menuBackdrop");

if (menuToggle && mobileMenu && backdrop) {
  const openMenu = () => {
    mobileMenu.classList.add("active");
    backdrop.classList.add("active");
    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    mobileMenu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("active");
    backdrop.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.contains("active") ? closeMenu() : openMenu();
  });

  closeBtn?.addEventListener("click", closeMenu);
  backdrop.addEventListener("click", closeMenu);

  document.querySelectorAll(".mobile-menu a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 991 && mobileMenu.classList.contains("active")) closeMenu();
  });
}
