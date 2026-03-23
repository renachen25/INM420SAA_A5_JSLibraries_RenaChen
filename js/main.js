gsap.registerPlugin(ScrollTrigger);

window.addEventListener("DOMContentLoaded", () => {
  // Initialize Glide FIRST so its cloned slides are created before GSAP
  // sets any inline opacity: 0 on .destination-card elements.
  new Glide(".glide", {
    type: "carousel",
    perView: 3,
    gap: 24,
    autoplay: 2000,
    hoverpause: true,
    animationDuration: 800,
    breakpoints: {
      1024: {
        perView: 2
      },
      768: {
        perView: 1
      }
    }
  }).mount();

  const fadeUp = {
    opacity: 0,
    ease: "power3.out"
  };

  // Hero animations
  gsap.from(".navbar", {
    y: -30,
    duration: 1,
    delay: 0.2,
    ease: "power2.out",
    opacity: 0
  });

  gsap.from(".hero-title", {
    ...fadeUp,
    y: 60,
    duration: 1.2
  });

  gsap.from(".hero-content p", {
    ...fadeUp,
    y: 40,
    duration: 1,
    delay: 0.3
  });

  gsap.from(".cta", {
    ...fadeUp,
    y: 30,
    duration: 1,
    delay: 0.6
  });

  // Scroll animations
  gsap.utils.toArray(".section h2").forEach((title) => {
    gsap.from(title, {
      ...fadeUp,
      scrollTrigger: title,
      y: 50,
      duration: 1
    });
  });

  // Exclude Glide's cloned slides — they must stay at opacity: 1 for the seamless loop
  gsap.utils.toArray(".destination-card:not(.glide__slide--clone)").forEach((card, index) => {
    gsap.from(card, {
      ...fadeUp,
      scrollTrigger: card,
      y: 60,
      duration: 0.8,
      delay: index * 0.1
    });
  });

  gsap.utils.toArray(".experience").forEach((item, index) => {
    gsap.from(item, {
      ...fadeUp,
      scrollTrigger: item,
      y: 50,
      duration: 0.8,
      delay: index * 0.1
    });
  });

  gsap.utils.toArray(".step").forEach((step, index) => {
    gsap.from(step, {
      ...fadeUp,
      scrollTrigger: step,
      y: 50,
      duration: 0.8,
      delay: index * 0.15
    });
  });
});

//   Map
window.addEventListener("DOMContentLoaded", () => {
    const mapContainer = document.getElementById("peru-map");
  
    if (mapContainer) {
      const map = L.map("peru-map").setView([-11.5, -74.5], 5);
  
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
      }).addTo(map);
  
      const destinations = [
        {
          name: "Lima",
          coords: [-12.0464, -77.0428],
          text: "Start in Lima for food, culture, and coastal city energy."
        },
        {
          name: "Cusco",
          coords: [-13.5319, -71.9675],
          text: "Historic Andean city and gateway to Machu Picchu."
        },
        {
          name: "Sacred Valley",
          coords: [-13.3289, -72.074],
          text: "A scenic valley filled with markets, ruins, and mountain views."
        },
        {
          name: "Machu Picchu",
          coords: [-13.1631, -72.545],
          text: "Peru’s iconic Incan citadel in the Andes."
        }
      ];
  
      const latlngs = [];
  
      destinations.forEach((place) => {
        latlngs.push(place.coords);
  
        L.marker(place.coords)
          .addTo(map)
          .bindPopup(`<strong>${place.name}</strong><br>${place.text}`);
      });
  
      L.polyline(latlngs, {
        color: "#a35b3d",
        weight: 4,
        opacity: 0.85
      }).addTo(map);
    }
  });

// Tooltip for Experiences
const { computePosition, offset, flip, shift } = FloatingUIDOM;

const experiences = document.querySelectorAll(".experience");
const tooltip = document.getElementById("experience-tooltip");

let mouseX = 0;
let mouseY = 0;

function updateTooltip() {
  const virtualEl = {
    getBoundingClientRect() {
      return {
        width: 0,
        height: 0,
        x: mouseX,
        y: mouseY,
        top: mouseY,
        left: mouseX,
        right: mouseX,
        bottom: mouseY
      };
    }
  };

  computePosition(virtualEl, tooltip, {
    placement: "top",
    middleware: [offset(16), flip(), shift({ padding: 12 })]
  }).then(({ x, y }) => {
    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y}px`
    });
  });
}

experiences.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    tooltip.textContent = card.dataset.tooltip;
    tooltip.setAttribute("data-show", "");
  });

  card.addEventListener("mouseleave", () => {
    tooltip.removeAttribute("data-show");
  });

  card.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    updateTooltip();
  });
});

