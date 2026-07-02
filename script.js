/* ============================================================
   ⚙️ CONFIGURACIÓN EDITABLE
   Cambia estos valores para personalizar la invitación
   ============================================================ */
const EVENT_CONFIG = {
  eventDate: "2026-08-15T15:00:00", // Fecha y hora del evento (formato ISO)
};

/* ---------- Globos de fondo flotando ---------- */
const balloonColors = ['var(--pink)', 'var(--yellow)', 'var(--turquoise)', 'var(--violet)'];
const bgContainer = document.getElementById('bgBalloons');
const BG_BALLOON_COUNT = 10;

for (let i = 0; i < BG_BALLOON_COUNT; i++) {
  const b = document.createElement('div');
  b.className = 'bg-balloon';
  b.style.left = Math.random() * 100 + 'vw';
  b.style.background = balloonColors[i % balloonColors.length];
  const duration = 14 + Math.random() * 10;
  const delay = Math.random() * 14;
  b.style.animationDuration = duration + 's';
  b.style.animationDelay = '-' + delay + 's';
  bgContainer.appendChild(b);
}

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

document.getElementById('surpriseBtn').addEventListener('click', () => launchConfetti(160));

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
  const name = document.getElementById('guestName').value.trim();
  const asistencia = formRsvp.querySelector('input[name="asistencia"]:checked').value;

  /* 💡 Aquí puedes conectar un backend real (ej. Formspree, Google Sheets, etc.)
     enviando "name" y "asistencia" a un endpoint con fetch(). Por ahora solo
     muestra un mensaje de confirmación en pantalla. */

  rsvpForm.style.display = 'none';
  rsvpThanks.classList.add('show');

  if (asistencia === 'si') {
    document.getElementById('thanksEmoji').textContent = '🎊';
    document.getElementById('thanksTitle').textContent = '¡Genial, ' + (name || 'amig@') + '!';
    document.getElementById('thanksMessage').textContent = 'Ya te esperamos en la fiesta. ¡Va a ser increíble!';
    launchConfetti(200);
  } else {
    document.getElementById('thanksEmoji').textContent = '💌';
    document.getElementById('thanksTitle').textContent = 'Gracias por avisar, ' + (name || 'amig@');
    document.getElementById('thanksMessage').textContent = '¡Te vamos a extrañar en la fiesta!';
  }
});