/* =========================
   MOBILE MENU TOGGLE
========================= */

const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
});


/* =========================
   SMOOTH SCROLL
========================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({
                behavior: "smooth"
            });

        // Close menu on mobile after click
        menu.classList.remove("active");
    });
});


/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const revealElements = document.querySelectorAll(
    ".card, .impact-box, article, .donation-content"
);

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            el.classList.add("show");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);


/* =========================
   IMPACT COUNTER ANIMATION
========================= */

const counters = document.querySelectorAll(".impact-box h3");

let counterStarted = false;

const runCounter = () => {
    if (counterStarted) return;

    const section = document.querySelector(".impact");
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 100) {
        counterStarted = true;

        counters.forEach(counter => {
            const target = +counter.innerText.replace(/\D/g, "");
            let count = 0;

            const increment = target / 100;

            const updateCount = () => {
                count += increment;

                if (count < target) {
                    counter.innerText = Math.floor(count) + "+";
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target + "+";
                }
            };

            updateCount();
        });
    }
};

window.addEventListener("scroll", runCounter);


/* =========================
   PARALLAX EFFECT (HERO)
========================= */

const heroBg = document.querySelector(".hero-bg");

window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;

    heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
});


/* =========================
   ADD REVEAL CSS CLASS
========================= */

document.addEventListener("DOMContentLoaded", () => {
    revealOnScroll();
});