// Tooltip for Experiences
import {
    computePosition,
    offset,
    flip,
    shift
  } from "https://cdn.jsdelivr.net/npm/@floating-ui/dom@1.7.5/+esm";
  
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