const header = document.getElementById("siteHeader");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const scrollProgress = document.getElementById("scrollProgress");
const typingText = document.getElementById("typingText");
const year = document.getElementById("currentYear");
const hero = document.querySelector(".hero");
const warriorModal = document.getElementById("warriorModal");
const warriorYesBtn = document.getElementById("warriorYesBtn");
const joinFormLink = document.getElementById("joinFormLink");
const warriorCloseButtons = document.querySelectorAll("[data-close-warrior-modal]");
const heroImageSlides = document.querySelectorAll(".hero-image-slide");
const khelSlides = document.querySelectorAll(".khel-slide");
const khelSlideTitle = document.getElementById("khelSlideTitle");
const imageFrame = document.getElementById("imageFrame");
const frameTrack = document.getElementById("frameTrack");
const frameCounter = document.getElementById("frameCounter");
const counters = document.querySelectorAll(".counter");
const revealElements = document.querySelectorAll(".reveal");
const navItems = document.querySelectorAll(".nav-link");
const sections = [...navItems]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (year) {
  year.textContent = new Date().getFullYear();
}

function openWarriorModal() {
  if (!warriorModal) {
    return;
  }

  warriorModal.classList.add("show");
  warriorModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  if (warriorYesBtn) {
    warriorYesBtn.focus();
  }
}

function closeWarriorModal() {
  if (!warriorModal) {
    return;
  }

  warriorModal.classList.remove("show");
  warriorModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

if (warriorYesBtn && joinFormLink) {
  warriorYesBtn.href = joinFormLink.href;
  warriorYesBtn.target = joinFormLink.target;
  warriorYesBtn.rel = joinFormLink.rel;
  warriorYesBtn.addEventListener("click", closeWarriorModal);
}

warriorCloseButtons.forEach((button) => {
  button.addEventListener("click", closeWarriorModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeWarriorModal();
  }
});

window.addEventListener("load", () => {
  setTimeout(openWarriorModal, 700);
});

document.querySelectorAll(".work-grid, .impact-grid, .stats-grid, .timeline-list, .featured-layout, .activities-section .container, .vision-grid, .contact-grid").forEach((group) => {
  group.querySelectorAll(".reveal").forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
  });
});

const khelSlideTitles = [
  "Games, prizes, and teamwork",
  "100+ kids participating with joy",
  "Memorable moments for every child"
];

const frameImages = [
  "images/optimized/0b122a5a-426b-4a93-b917-ae1da75dc768.jpg",
  "images/optimized/1b645ab5-9c4e-42ae-a329-f59fe7a820e4.jpg",
  "images/optimized/IMG20251129130103.jpg",
  "images/IMG_9182.JPG",
  "images/optimized/DSC05447.jpg",
  "images/IMG_4140.jpg",
  "images/optimized/DSC05502.jpg",
  "images/optimized/DSC_0212.jpg",
  "images/optimized/2a9c8d1d-113c-497c-9c51-5d0e77040d7f.jpg",
  "images/optimized/1f3d3973-01f0-46a2-b060-bf887dc19132.jpg",
  "images/optimized/0a85c5a0-0f03-4504-8dbc-4544526bedf1.jpg",
  "images/IMG_3897.jpg",
  "images/optimized/DSC_0202.jpg"
];

const FRAME_INTERVAL = 5000;
const HERO_IMAGE_INTERVAL = 9000;
const SLIDE_DURATION = 850;
let frameIndex = 0;
let heroImageIndex = 0;
let khelIndex = 0;
let frameSlideImages = [];

function setActiveSlide(slides, activeIndex) {
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === activeIndex);
  });
}

if (heroImageSlides.length > 1) {
  setInterval(() => {
    heroImageIndex = (heroImageIndex + 1) % heroImageSlides.length;
    setActiveSlide(heroImageSlides, heroImageIndex);
  }, HERO_IMAGE_INTERVAL);
}

if (khelSlides.length > 1) {
  setInterval(() => {
    khelIndex = (khelIndex + 1) % khelSlides.length;
    setActiveSlide(khelSlides, khelIndex);

    if (khelSlideTitle) {
      khelSlideTitle.textContent = khelSlideTitles[khelIndex];
    }
  }, FRAME_INTERVAL);
}

function buildFrameTrack() {
  if (!frameTrack || frameImages.length === 0) {
    return;
  }

  const loopingImages = [...frameImages, frameImages[0]];

  loopingImages.forEach((imagePath, index) => {
    const slide = document.createElement("div");
    const image = document.createElement("img");

    slide.className = "frame-slide";
    image.dataset.src = imagePath;
    image.loading = "lazy";
    image.decoding = "async";
    image.alt = index === frameImages.length ? "" : "RAAHAT activity photo";

    if (index === 0) {
      image.src = imagePath;
    }

    if (index === frameImages.length) {
      image.setAttribute("aria-hidden", "true");
    }

    slide.appendChild(image);
    frameTrack.appendChild(slide);
  });

  frameSlideImages = [...frameTrack.querySelectorAll("img")];
}

function updateFrameDetails(realIndex) {
  if (imageFrame) {
    imageFrame.style.setProperty("--frame-bg", `url("${frameImages[realIndex]}")`);
  }

  if (frameCounter) {
    frameCounter.textContent = `${realIndex + 1} / ${frameImages.length}`;
  }
}

function loadFrameSlide(index) {
  const image = frameSlideImages[index];

  if (image && !image.src) {
    image.src = image.dataset.src;
  }
}

function slideFrameWindow() {
  if (!frameTrack || frameImages.length === 0) {
    return;
  }

  frameIndex += 1;
  loadFrameSlide(frameIndex);
  loadFrameSlide((frameIndex + 1) % frameSlideImages.length);
  frameTrack.style.transform = `translateX(-${frameIndex * 100}%)`;
  updateFrameDetails(frameIndex % frameImages.length);

  if (frameIndex === frameImages.length) {
    setTimeout(() => {
      frameTrack.classList.add("no-transition");
      frameIndex = 0;
      frameTrack.style.transform = "translateX(0)";
      frameTrack.offsetHeight;
      frameTrack.classList.remove("no-transition");
    }, SLIDE_DURATION);
  }
}

if (imageFrame && frameTrack && frameImages.length > 0) {
  buildFrameTrack();
  updateFrameDetails(0);
  loadFrameSlide(1);

  setInterval(slideFrameWindow, FRAME_INTERVAL);
}

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
