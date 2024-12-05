particlesJS("particles-js", {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: [
        "#FF4D5E", 
        "#4D9EFF", 
        "#9D4DFF", 
        "#4DCD7D", 
        "#FF9B4D",
      ],
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
      },
    },
    opacity: {
      value: 0.9,
      random: true,
      anim: {
        enable: true,
        speed: 0.5,
        opacity_min: 0.6,
        sync: false,
      },
    },
    size: {
      value: 8,
      random: true,
      anim: {
        enable: false, 
        speed: 1,
        size_min: 8, 
        sync: true, 
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false,
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      push: {
        particles_nb: 1, 
      },
    },
  },
  retina_detect: true,
});

let clickCount = 0;
const maxExtraParticles = 10;

const particlesContainer = document.getElementById("particles-js");

particlesContainer.addEventListener("click", () => {
  if (clickCount < maxExtraParticles) {
    clickCount++;
  } else {
    pJSDom[0].pJS.interactivity.events.onclick.enable = false;
  }
});