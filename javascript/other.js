document.addEventListener("DOMContentLoaded", function () {
  const scheduleModal = document.getElementById("scheduleModal");
  const selectedDaySpan = document.getElementById("selectedDay");
  const weekdaySlots = document.querySelector(".weekday-slots");
  const weekendSlots = document.querySelector(".weekend-slots");
  const timeButtons = document.querySelectorAll(".time-btn");
  const saveScheduleBtn = document.getElementById("saveSchedule");
  const resetButton = document.getElementById("resetSchedule");
  let currentDay = "";
  let selectedTimes = {};
const recurringRadio = document.getElementById("recurring");
const oneTimeRadio = document.getElementById("oneTime");
const recurringOptions = document.getElementById("recurringOptions");

recurringRadio.addEventListener("change", function () {
  recurringOptions.style.display = "block";
  document
    .querySelectorAll('input[name="recurringFrequency"]')
    .forEach((radio) => {
      radio.required = true;
    });
});

oneTimeRadio.addEventListener("change", function () {
  recurringOptions.style.display = "none";
  document
    .querySelectorAll('input[name="recurringFrequency"]')
    .forEach((radio) => {
      radio.required = false;
      radio.checked = false;
    });
});
  document.querySelectorAll(".day-card").forEach((card) => {
    const day = card.dataset.day;
    selectedTimes[day] = [];
  });

  scheduleModal.addEventListener("show.bs.modal", function (event) {
    const button = event.relatedTarget;
    currentDay = button.dataset.day;
    selectedDaySpan.textContent = currentDay;

    if (currentDay === "Saturday" || currentDay === "Sunday") {
      weekdaySlots.style.display = "none";
      weekendSlots.style.display = "block";
    } else {
      weekdaySlots.style.display = "block";
      weekendSlots.style.display = "none";
    }

    timeButtons.forEach((btn) => {
      btn.classList.remove("selected");
      if (selectedTimes[currentDay].includes(btn.dataset.time)) {
        btn.classList.add("selected");
      }
    });
  });

  timeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      this.classList.toggle("selected");
    });
  });

  saveScheduleBtn.addEventListener("click", function () {
    const visibleSlots =
      currentDay === "Saturday" || currentDay === "Sunday"
        ? weekendSlots
        : weekdaySlots;

    const selected = Array.from(
      visibleSlots.querySelectorAll(".time-btn.selected")
    )
      .map((btn) => btn.dataset.time)
      .sort((a, b) => {
        const timeToMinutes = (time) => {
          const [hourStr, period] = time.match(/(\d+):00\s+(AM|PM)/).slice(1);
          let hour = parseInt(hourStr);
          if (period === "PM" && hour !== 12) hour += 12;
          if (period === "AM" && hour === 12) hour = 0;
          return hour * 60;
        };
        return timeToMinutes(a) - timeToMinutes(b);
      });

    selectedTimes[currentDay] = selected;

    const hoursElement = document.getElementById(
      `${currentDay.toLowerCase()}-hours`
    );
    if (selected.length > 0) {
      const formatTimeRange = (time) => {
        const [startHour, period] = time.match(/(\d+):00\s+(AM|PM)/).slice(1);
        let endHour = parseInt(startHour) + 1;
        let endPeriod = period;

        if (endHour === 12) {
          endPeriod = period === "AM" ? "PM" : "AM";
        }
        else if (endHour > 12) {
          endHour = 1;
        }

        return `${startHour} ${period} to ${endHour} ${endPeriod}`;
      };

      hoursElement.innerHTML = selected
        .map((time) => formatTimeRange(time))
        .join("<br>");
    } else {
      hoursElement.textContent = "No hours scheduled";
    }

    updateTotalHours();

    const modal = bootstrap.Modal.getInstance(scheduleModal);
    if (modal) {
      modal.hide();
    }
  });

  resetButton.addEventListener("click", function () {
    if (
      confirm(
        "Are you sure you want to reset all scheduled hours? This cannot be undone."
      )
    ) {
      Object.keys(selectedTimes).forEach((day) => {
        selectedTimes[day] = [];
        const hoursElement = document.getElementById(
          `${day.toLowerCase()}-hours`
        );
        hoursElement.textContent = "No hours scheduled";
      });

      timeButtons.forEach((btn) => {
        btn.classList.remove("selected");
      });

      updateTotalHours();

      const toast = document.createElement("div");
      toast.className = "schedule-toast";
      toast.textContent = "All schedules have been reset";
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.remove();
      }, 3000);
    }
  });

  function updateTotalHours() {
    const total = Object.values(selectedTimes).reduce(
      (sum, times) => sum + times.length,
      0
    );
    document.getElementById("total-hours").textContent = total;
  }

  const form = document.getElementById("inquiryForm");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const totalHours = Object.values(selectedTimes).reduce(
        (sum, times) => sum + times.length,
        0
      );

      if (totalHours === 0) {
        alert("Please schedule at least one tutoring hour.");
        return;
      }

      const scheduledTimesInput = document.createElement("input");
      scheduledTimesInput.type = "hidden";
      scheduledTimesInput.name = "scheduledTimes";
      scheduledTimesInput.value = JSON.stringify(selectedTimes);
      form.appendChild(scheduledTimesInput);

      if (form.checkValidity()) {
        console.log("Form submitted with schedule:", selectedTimes);
      }

      form.classList.add("was-validated");
    });
  }

  const style = document.createElement("style");
  style.textContent = `
        .schedule-toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease-out, fadeOut 0.3s ease-in 2.7s;
            z-index: 1050;
        }

        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
  document.head.appendChild(style);

  document.getElementById('inquiryForm').addEventListener('submit', function(e) {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    days.forEach(day => {
        const hoursElement = document.getElementById(`${day}-hours`);
        const inputElement = document.getElementById(`${day}-hours-input`);
        inputElement.value = hoursElement.textContent.trim();
    });

    const totalHoursElement = document.getElementById('total-hours');
    const totalHoursInput = document.getElementById('total-hours-input');
    totalHoursInput.value = totalHoursElement.textContent.trim();
  });

  document.getElementById('saveSchedule').addEventListener('click', function(e) {
    e.preventDefault();
  });

  function validateForm() {
    return true; 
  }
});
