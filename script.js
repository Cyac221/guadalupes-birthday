/* ============================================================
   ⚙️ CONFIGURACIÓN EDITABLE
   Cambia estos valores para personalizar la invitación
   ============================================================ */
const EVENT_CONFIG = {
  eventDate: "2026-07-24T14:45:00", // Fecha y hora del evento (formato ISO)
  childName: "Guadalupe",            // Se usa en el mensaje de WhatsApp
  whatsappNumber: "573234403124",    // Número que recibe las confirmaciones (con código de país, sin +)
};

/* ---------- Imágenes de fondo (Nezuko) — repartidas sin superponerse ---------- */
const bgImagesContainer = document.getElementById('bgImages');

// 💡 Edita estas listas para cambiar cuáles imágenes van a la izquierda o derecha,
// su ancho base (antes de aplicar SCALE) y su rotación.
// Menos items por columna = más espacio disponible para cada una (se pueden hacer más grandes sin chocar).
const LEFT_ITEMS = [
  { src: 'images/1.png', width: 340, rotate: -8 },
  { src: 'images/5.png', width: 360, rotate: -6 },
];
const RIGHT_ITEMS = [
  { src: 'images/2.png', width: 340, rotate: 10 },
  { src: 'images/4.png', width: 340, rotate: 7 },
];

const SCALE = 2.2; // multiplicador de tamaño para TODAS las nezukos

function placeNezukos() {
  bgImagesContainer.innerHTML = '';
  const totalHeight = document.body.scrollHeight;
  const viewportWidth = window.innerWidth;
  const maxWidthByViewport = viewportWidth * 0.62; // nunca más del 62% del ancho de pantalla
  const leftSpacing = totalHeight / LEFT_ITEMS.length;
  const rightSpacing = totalHeight / RIGHT_ITEMS.length;

  LEFT_ITEMS.forEach((item, i) => {
    // El ancho final respeta 3 límites a la vez: el tamaño pedido, el espacio vertical
    // disponible (para no chocar con la siguiente) y el ancho de pantalla (para no salirse).
    const width = Math.round(Math.min(item.width * SCALE, leftSpacing * 0.85, maxWidthByViewport));
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = '';
    img.className = 'bg-image-item';
    img.style.width = width + 'px';
    img.style.left = '-' + Math.round(width * 0.15) + 'px';
    img.style.top = Math.round(i * leftSpacing + leftSpacing * 0.1) + 'px';
    img.style.transform = `rotate(${item.rotate}deg)`;
    bgImagesContainer.appendChild(img);
  });

  RIGHT_ITEMS.forEach((item, i) => {
    const width = Math.round(Math.min(item.width * SCALE, rightSpacing * 0.85, maxWidthByViewport));
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = '';
    img.className = 'bg-image-item';
    img.style.width = width + 'px';
    img.style.right = '-' + Math.round(width * 0.15) + 'px';
    // Se desfasan respecto a la columna izquierda para que se vea más natural
    img.style.top = Math.round(i * rightSpacing + rightSpacing * 0.55) + 'px';
    img.style.transform = `rotate(${item.rotate}deg)`;
    bgImagesContainer.appendChild(img);
  });
}

// Esperamos a que cargue todo (fuentes e imágenes) para medir bien el alto real de la página
window.addEventListener('load', placeNezukos);
// Recalculamos si cambia el tamaño de la ventana (ej. al girar el celular)
window.addEventListener('resize', placeNezukos);
// Por si acaso, una primera pasada inmediata
placeNezukos();

/* ---------- Confeti ---------- */
function launchConfetti(count = 120) {
  const colors = ['#FF4F81', '#FFD23F', '#2EC4B6', '#9B5DE5'];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--drift', (Math.random() * 200 - 100) + 'px');
    piece.style.setProperty('--spin', (Math.random() * 720 - 360) + 'deg');
    piece.style.animationDuration = (2.2 + Math.random() * 1.6) + 's';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4000);
  }
}

document.getElementById('surpriseBtn').addEventListener('click', () => {
  launchConfetti(160);
  document.getElementById('formRsvp').scrollIntoView({ behavior: 'smooth', block: 'center' });
});

/* ---------- Countdown ---------- */
const target = new Date(EVENT_CONFIG.eventDate).getTime();
const cdDays = document.getElementById('cd-days');
const cdHours = document.getElementById('cd-hours');
const cdMin = document.getElementById('cd-min');
const cdSec = document.getElementById('cd-sec');

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    cdDays.textContent = '00';
    cdHours.textContent = '00';
    cdMin.textContent = '00';
    cdSec.textContent = '00';
    document.querySelector('.countdown-title').textContent = '¡Es hoy! 🎉';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  cdDays.textContent = pad(days);
  cdHours.textContent = pad(hours);
  cdMin.textContent = pad(minutes);
  cdSec.textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ---------- Globos con detalles (revienta para ver) ---------- */
document.querySelectorAll('.balloon-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('popped')) return;
    btn.classList.add('popped');
    const key = btn.getAttribute('data-detail');
    document.getElementById('reveal-' + key).classList.add('show');
    launchConfetti(40);
  });
});

/* ---------- RSVP ---------- */
const formRsvp = document.getElementById('formRsvp');
const rsvpForm = document.getElementById('rsvpForm');
const rsvpThanks = document.getElementById('rsvpThanks');

formRsvp.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('guestName').value.trim() || 'Invitad@';
  const asistencia = formRsvp.querySelector('input[name="asistencia"]:checked').value;

  /* ---------- Mensaje personalizado según la respuesta ---------- */
  const message = asistencia === 'si'
    ? `¡Hola! Soy ${name} 🎉 y confirmo mi asistencia a la fiesta de ${EVENT_CONFIG.childName}. ¡Ahí nos vemos!`
    : `Hola, soy ${name}. Lamentablemente no podré asistir a la fiesta de ${EVENT_CONFIG.childName} 😢 ¡Gracias por la invitación!`;

  const waLink = `https://wa.me/${EVENT_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

  rsvpForm.style.display = 'none';
  rsvpThanks.classList.add('show');

  const waFallback = document.getElementById('waFallbackLink');
  waFallback.href = waLink;

  if (asistencia === 'si') {
    document.getElementById('thanksEmoji').textContent = '🎊';
    document.getElementById('thanksTitle').textContent = '¡Genial, ' + name + '!';
    document.getElementById('thanksMessage').textContent = 'Te estamos llevando a WhatsApp para confirmar…';
    launchConfetti(200);
  } else {
    document.getElementById('thanksEmoji').textContent = '💌';
    document.getElementById('thanksTitle').textContent = 'Gracias por avisar, ' + name;
    document.getElementById('thanksMessage').textContent = 'Te estamos llevando a WhatsApp para enviar tu respuesta…';
  }

  // Pequeña pausa para que se alcance a ver el mensaje/confeti antes de redirigir
  setTimeout(() => {
    window.location.href = waLink;
  }, 1400);
});