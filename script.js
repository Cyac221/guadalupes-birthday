/* ============================================================
   ⚙️ CONFIGURACIÓN EDITABLE
   Cambia estos valores para personalizar la invitación
   ============================================================ */
const EVENT_CONFIG = {
  eventDate: "2026-07-24T14:45:00", // Fecha y hora del evento (formato ISO)
  childName: "Guadalupe",            // Se usa en el mensaje de WhatsApp
  whatsappNumber: "573234403124",    // Número que recibe las confirmaciones (con código de país, sin +)
};

/* ---------- Imágenes de fondo (Nezuko) — posición 100% manual ---------- */
const bgImagesContainer = document.getElementById('bgImages');

// 💡 CÓMO MOVERLAS TÚ MISMO:
// - "topPercent": qué tan abajo empieza, como % de TODA la altura de la página.
//     0 = arriba del todo, 50 = a la mitad de la página, 100 = al final.
//     Súbelo para bajar la imagen, bájalo para subirla.
// - "side": 'left' o 'right' — de qué lado de la pantalla sale.
// - "width": ancho FINAL en píxeles tal cual se va a ver (ya no hay multiplicador).
//     Ej: width: 400 = se ve de 400px de ancho (a menos que no quepa en pantalla).
// - "rotate": inclinación en grados (negativo = hacia la izquierda).
// - "bleed": qué tanto se sale de la pantalla hacia el borde (0 = pegada al borde,
//     0.15 = se le corta un 15% por el borde, típico para que no se vea "flotando").
//
// Edita, guarda, y refresca la página para ver el resultado. Repite hasta que quede bien.
const NEZUKO_ITEMS = [
  { src: 'images/1.png', side: 'left',  topPercent: 0,  width: 180, rotate: -8, bleed: 0.08 },
  { src: 'images/3.png', side: 'right', topPercent: 16, width: 480, rotate: 10, bleed: 0.25 },
  { src: 'images/2.png', side: 'left',  topPercent: 25, width: 260, rotate: -5, bleed: 0.08 },
  { src: 'images/4.png', side: 'right', topPercent: 33, width: 240, rotate: 7,  bleed: 0.08 },
  { src: 'images/2.png', side: 'left',  topPercent: 47, width: 250, rotate: -6, bleed: -0.08 },
  { src: 'images/5.png', side: 'right', topPercent: 70, width: 260, rotate: -9, bleed: 0.05 },
  { src: 'images/5.png', side: 'right', topPercent: 82, width: 280, rotate: 6,  bleed: 0.08 },
];

function placeNezukos() {
  bgImagesContainer.innerHTML = '';
  const totalHeight = document.body.scrollHeight;
  const viewportWidth = window.innerWidth;
  // Mismo tope grande en todas las pantallas (móvil incluido), para que se vea
  // igual de protagonista que en PC.
  const maxWidthByViewport = viewportWidth * 0.95;

  NEZUKO_ITEMS.forEach(item => {
    // "width" ahora ES el tamaño final en píxeles (ya no se multiplica por nada).
    // Solo se achica si tu número es más grande que lo que cabe en la pantalla.
    const width = Math.round(Math.min(item.width, maxWidthByViewport));
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = '';
    img.className = 'bg-image-item';
    img.style.width = width + 'px';
    img.style.top = Math.round((item.topPercent / 100) * totalHeight) + 'px';
    if (item.side === 'left') {
      img.style.left = '-' + Math.round(width * item.bleed) + 'px';
    } else {
      img.style.right = '-' + Math.round(width * item.bleed) + 'px';
    }
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