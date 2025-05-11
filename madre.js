const carrusel = document.querySelector('.carrusel-inner');
const puntos = document.querySelectorAll('.punto');
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');

let index = 0;

function mostrarSlide(i) {
  index = (i + carrusel.children.length) % carrusel.children.length;
  carrusel.style.transform  = `translateX(-${index * 100}%)`;
  [...carrusel.children].forEach((img, idx) => {
    img.style.animation = idx === index ? 'fadeZoom 1s ease-in-out' : 'none';
  });
  actualizarPuntos();
}

function actualizarPuntos() {
  puntos.forEach((p, i) => {
    p.classList.toggle('active', i === index);
  });
}

btnNext.addEventListener('click', () => mostrarSlide(index + 1));
btnPrev.addEventListener('click', () => mostrarSlide(index - 1));
puntos.forEach((p, i) => p.addEventListener('click', () => mostrarSlide(i)));

// Auto avanzar
setInterval(() => mostrarSlide(index + 1), 5000);

// Deslizamiento táctil
let startX = 0;
carrusel.parentElement.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});
carrusel.parentElement.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  if (endX < startX - 50) mostrarSlide(index + 1);
  else if (endX > startX + 50) mostrarSlide(index - 1);
});
