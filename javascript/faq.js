document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  const accordionButtons = document.querySelectorAll(".accordion-button");
  accordionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      setTimeout(() => {
        if (!this.classList.contains("collapsed")) {
          this.closest(".accordion-item")
            .querySelector(".accordion-collapse")
            .scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 350);
    });
  });
});
