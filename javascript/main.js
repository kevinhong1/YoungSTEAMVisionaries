document.addEventListener("DOMContentLoaded", function () {
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

  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });

  const navLinks = document.querySelectorAll(".nav-link");
  const menuToggle = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 992) {
        navbarCollapse.classList.remove("show");
      }
    });
  });

  const cards = document.querySelectorAll(".floating-card");
  cards.forEach((card) => {
    card.style.animation = "float 3s ease-in-out infinite";
  });
});

const forms = document.querySelectorAll("form");
forms.forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Form submitted");
  });
});
document.addEventListener('DOMContentLoaded', function() {
    const scheduleModal = document.getElementById('scheduleModal');
    const selectedDaySpan = document.getElementById('selectedDay');
    const timeButtons = document.querySelectorAll('.time-btn');
    const saveScheduleBtn = document.getElementById('saveSchedule');
    let currentDay = '';
    let selectedTimes = {};

    document.querySelectorAll('.day-card').forEach(card => {
        const day = card.dataset.day;
        selectedTimes[day] = [];
    });

    scheduleModal.addEventListener('show.bs.modal', function(event) {
        const button = event.relatedTarget;
        currentDay = button.dataset.day;
        selectedDaySpan.textContent = currentDay;
        
        timeButtons.forEach(btn => {
            btn.classList.remove('selected');
            if (selectedTimes[currentDay].includes(btn.dataset.time)) {
                btn.classList.add('selected');
            }
        });
    });

    timeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });

    saveScheduleBtn.addEventListener('click', function() {
        const selected = Array.from(document.querySelectorAll('.time-btn.selected'))
            .map(btn => btn.dataset.time);
        
        selectedTimes[currentDay] = selected;
        
        const hoursElement = document.getElementById(`${currentDay.toLowerCase()}-hours`);
        if (selected.length > 0) {
            hoursElement.innerHTML = selected.join('<br>');
        } else {
            hoursElement.textContent = 'No hours scheduled';
        }

        updateTotalHours();

        bootstrap.Modal.getInstance(scheduleModal).hide();
    });

    function updateTotalHours() {
        const total = Object.values(selectedTimes)
            .reduce((sum, times) => sum + times.length, 0);
        document.getElementById('total-hours').textContent = total;
    }
});