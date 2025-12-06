const initAOS = () => {
  // Load AOS CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://unpkg.com/aos@2.3.4/dist/aos.css';
  document.head.appendChild(link);

  // Load AOS JS
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/aos@2.3.4/dist/aos.js';
  script.onload = () => {
    window.AOS.init({
      duration: 750,
      easing: 'ease-in-out',
      once: false,
    });
  };
  document.body.appendChild(script);
};

export default initAOS; 