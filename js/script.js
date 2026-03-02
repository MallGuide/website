document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const navbar = document.getElementById("navbar");
  const scrollBtn = document.getElementById("scrollUpBtn");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      mobileMenu.classList.toggle("hidden");
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (!mobileMenu.contains(target) && !menuButton.contains(target)) {
        mobileMenu.classList.add("hidden");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        mobileMenu.classList.add("hidden");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 768) {
        mobileMenu.classList.add("hidden");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
        if (menuButton) menuButton.setAttribute("aria-expanded", "false");
      }
    });
  });

  if (navbar || scrollBtn) {
    const onScroll = () => {
      const isScrolled = window.scrollY > 28;

      if (navbar) {
        navbar.classList.toggle("shadow-md", isScrolled);
      }

      if (scrollBtn) {
        scrollBtn.classList.toggle("visible", window.scrollY > 340);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (scrollBtn) {
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const faqItems = Array.from(document.querySelectorAll(".faq-item"));
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const icon = item.querySelector(".faq-icon");
    if (!question || !icon) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqItems.forEach((other) => {
        other.classList.remove("active");
        const otherIcon = other.querySelector(".faq-icon");
        if (otherIcon) otherIcon.textContent = "+";
      });

      if (!isActive) {
        item.classList.add("active");
        icon.textContent = "-";
      }
    });
  });

  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && revealEls.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -30px 0px" },
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
});
