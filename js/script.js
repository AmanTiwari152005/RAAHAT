const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const scrollProgress = document.getElementById("scrollProgress");
const typingText = document.getElementById("typingText");
const year = document.getElementById("currentYear");
const hero = document.querySelector(".hero");
const counters = document.querySelectorAll(".counter");
const revealElements = document.querySelectorAll(".reveal");
const navItems = document.querySelectorAll(".nav-link");
const sections = [...navItems]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

year.textContent = new Date().getFullYear();

document.querySelectorAll(".work-grid, .gallery-grid, .vision-grid, .contact-grid").forEach((group) => {
  group.querySelectorAll(".reveal").forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
  });
});

const typingPhrases = [
  "Teach with empathy.",
  "Serve with purpose.",
  "Lead with kindness.",
  "Become the change."
];

let phraseIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typePhrase() {
  const currentPhrase = typingPhrases[phraseIndex];
  const visibleText = currentPhrase.slice(0, characterIndex);
  typingText.textContent = visibleText;

  if (!isDeleting && characterIndex < currentPhrase.length) {
    characterIndex += 1;
    setTimeout(typePhrase, 85);
    return;
  }

  if (!isDeleting && characterIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(typePhrase, 1300);
    return;
  }

  if (isDeleting && characterIndex > 0) {
    characterIndex -= 1;
    setTimeout(typePhrase, 45);
    return;
  }

  isDeleting = false;
  phraseIndex = (phraseIndex + 1) % typingPhrases.length;
  setTimeout(typePhrase, 300);
}

typePhrase();

function closeMobileMenu() {
  menuToggle.classList.remove("active");
  navLinks.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.classList.toggle("active", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navItems.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));
    if (!target) {
      return;
    }

    const headerOffset = header.offsetHeight;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset + 1;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });

    closeMobileMenu();
  });
});

function updateScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  scrollProgress.style.transform = `scaleX(${progress})`;
}

function updateHeaderState() {
  header.classList.toggle("scrolled", window.scrollY > 20);
}

function updateHeroParallax() {
  if (!hero) {
    return;
  }

  const offset = Math.min(window.scrollY * 0.18, 90);
  hero.style.setProperty("--parallax-y", `${offset}px`);
}

function updateActiveLink() {
  const scrollPosition = window.scrollY + header.offsetHeight + 60;
  let currentSectionId = "home";

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      currentSectionId = section.id;
    }
  });

  navItems.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSectionId}`);
  });
}

function handlePageScroll() {
  updateHeaderState();
  updateScrollProgress();
  updateHeroParallax();
  updateActiveLink();
}

window.addEventListener("scroll", handlePageScroll, { passive: true });
window.addEventListener("resize", updateActiveLink);
handlePageScroll();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

function animateCounter(counter) {
  const target = Number(counter.dataset.target);
  const duration = 1600;
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(easedProgress * target);

    counter.textContent = currentValue.toLocaleString("en-IN");

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target.toLocaleString("en-IN");
    }
  }

  requestAnimationFrame(updateCounter);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.6
  }
);

counters.forEach((counter) => counterObserver.observe(counter));
