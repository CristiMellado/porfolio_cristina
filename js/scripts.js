// Generar estrellas
const starsContainer = document.getElementById("stars");
const numberOfStars = 200;

for (let i = 0; i < numberOfStars; i++) {
  const star = document.createElement("div");
  star.className = "star";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.animationDelay = Math.random() * 3 + "s";
  star.style.animationDuration = 2 + Math.random() * 3 + "s";
  starsContainer.appendChild(star);
}

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Año dinámico en el footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Back to top: mostrar/ocultar y scroll
const backToTopBtn = document.querySelector(".back-to-top");
const toggleBackToTop = () => {
  if (!backToTopBtn) return;
  const scrolled = window.scrollY || document.documentElement.scrollTop;
  backToTopBtn.style.display = scrolled > 200 ? "flex" : "none";
};

window.addEventListener("scroll", toggleBackToTop, { passive: true });
window.addEventListener("load", toggleBackToTop);

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Toggle menú (mobile) con clases y accesibilidad
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
if (navToggle && siteNav) {
  const navLinks = siteNav.querySelectorAll(".nav-link");

  const openMenu = () => {
    siteNav.classList.add("is-open");
    document.body.classList.add("no-scroll");
    navToggle.setAttribute("aria-expanded", "true");
    if (navLinks.length) {
      navLinks[0].focus();
    }
  };

  const closeMenu = () => {
    siteNav.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.focus();
  };

  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.contains("is-open");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Cerrar al hacer clic en cualquier enlace del menú
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Cerrar con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && siteNav.classList.contains("is-open")) {
      closeMenu();
    }
  });
}

// Copiar email
const copyBtn = document.getElementById("copy-email");
const emailText = document.getElementById("email-text");
const originalBtnHTML = copyBtn.innerHTML;
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(emailText.textContent);
    copyBtn.innerHTML = '<img src="/images/other/ok-50.png" height="18px" alt="ok"/>';
    setTimeout(() => (copyBtn.innerHTML = originalBtnHTML), 2000);
  } catch {
    alert("No se pudo copiar el correo 😅");
  }
});
