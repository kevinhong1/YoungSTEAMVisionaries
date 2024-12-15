document.addEventListener("DOMContentLoaded", function () {
  const ratingGroups = document.querySelectorAll(".rating-buttons");
  ratingGroups.forEach((group) => {
    const buttons = group.querySelectorAll("button");
    buttons.forEach((button) => button.remove());

    for (let i = 1; i <= 10; i++) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "rating-btn";
      button.textContent = i;
      button.setAttribute("data-value", i);
      button.addEventListener("click", () => handleRating(group, i));
      group.appendChild(button);
    }
  });

  function handleRating(group, value) {
    group.querySelectorAll(".rating-btn").forEach((btn) => {
      btn.classList.remove("selected");
    });

    const selectedButton = group.querySelector(
      `.rating-btn[data-value="${value}"]`
    );
    if (selectedButton) {
      selectedButton.classList.add("selected");
    }

    const groupName = group.dataset.ratingGroup;
    document.getElementById(`${groupName}Rating`).value = value;
  }

  document.querySelectorAll(".rating-buttons").forEach((group) => {
    group.addEventListener("click", () => {
      group.closest(".rating-section").classList.remove("error");
    });
  });
});
