function createTrailElement(x, y) {
    const trailElement = document.createElement('div');
    trailElement.className = 'trail-element';
    trailElement.style.left = `${x}px`;
    trailElement.style.top = `${y}px`;
    document.getElementById('cursor-trail').appendChild(trailElement);
  
    // Remove the element after a short delay
    setTimeout(() => {
      trailElement.remove();
    }, 500); // Adjust the duration (in milliseconds) for how long the trail element lasts
  }
  
  document.addEventListener('mousemove', (e) => {
    createTrailElement(e.clientX, e.clientY);
  });
  
  function createRipple(x, y) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    document.body.appendChild(ripple); // Append to body so it can overlay other elements
  
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  }
  
  document.addEventListener('click', (e) => {
    createRipple(e.clientX, e.clientY);
  });
  function initInteractiveElements() {
    const navLinks = document.querySelectorAll('.navbar a'); // Select all anchor tags within elements with class 'navbar'
  
    document.addEventListener('mousemove', (e) => {
      navLinks.forEach(link => {
        const rect = link.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
  
        // Define a threshold distance within which the effect will be active
        const threshold = 50; // Adjust this value to change the interaction range
  
        if (distance < threshold) {
          const scaleFactor = 1 + (threshold - distance) / threshold * 0.1; // Scale up slightly based on proximity
          link.style.transform = `scale(${scaleFactor})`;
          link.style.transition = 'transform 0.2s ease-out'; // Add smooth transition
        } else {
          link.style.transform = 'scale(1)'; // Reset to original scale
          link.style.transition = 'transform 0.2s ease-in-out'; // Add smooth transition
        }
      });
    });
  }
  
  // Call this function when the script loads
  initInteractiveElements();