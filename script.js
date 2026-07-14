/* ============================================================
   ⚙️ CONFIGURACIÓN EDITABLE
   Cambia estos valores para personalizar la invitación
   ============================================================ */
const EVENT_CONFIG = {
  eventDate: "2026-07-24T14:45:00", // Fecha y hora del evento (formato ISO)
  childName: "Guadalupe",            // Se usa en el mensaje de WhatsApp
  whatsappNumber: "573234403124",    // Número que recibe las confirmaciones (con código de país, sin +)
};

/* ---------- Imágenes de fondo (Nezuko) — estáticas y grandes ---------- */
const bgImagesContainer = document.getElementById('bgImages');

// 💡 Cada imagen tiene su propia posición, tamaño y rotación.
// Edita estos valores para mover/agrandar/achicar cada una.
const NEZUKO_LAYOUT = [
  { src: 'images/1.png', top: '-30px',   left: '-40px',  width: '320px', rotate: '-8deg' },
  { src: 'images/2.png', top: '4%',      right: '-60px', width: '300px', rotate: '10deg' },
  { src: 'images/3.png', bottom: '-20px', left: '8%',    width: '340px', rotate: '-5deg' },
  { src: 'images/4.png', bottom: '2%',   right: '4%',    width: '300px', rotate: '7deg' },
  { src: 'images/5.png', top: '38%',     left: '50%',    width: '360px', rotate: '0deg', extraTransform: 'translateX(-50%)' },
  { src: 'images/2.png', top: '-20px',   left: '38%',    width: '220px', rotate: '5deg' },
  { src: 'images/4.png', top: '18%',     left: '-70px',  width: '250px', rotate: '-12deg' },
  { src: 'images/1.png', top: '22%',     right: '-30px', width: '230px', rotate: '9deg' },
  { src: 'images/5.png', bottom: '30%',  left: '-50px',  width: '260px', rotate: '-6deg' },
  { src: 'images/3.png', bottom: '34%',  right: '-40px', width: '240px', rotate: '8deg' },
  { src: 'images/2.png', bottom: '-40px', left: '42%',   width: '280px', rotate: '4deg' },
  { src: 'images/1.png', top: '60%',     right: '30%',   width: '200px', rotate: '-10deg' },
];

NEZUKO_LAYOUT.forEach(item => {
  const img = document.createElement('img');
  img.src = item.src;
  img.alt = '';
  img.className = 'bg-image-item';
  img.style.width = item.width;
  if (item.top !== undefined) img.style.top = item.top;
  if (item.bottom !== undefined) img.style.bottom = item.bottom;
  if (item.left !== undefined) img.style.left = item.left;
  if (item.right !== undefined) img.style.right = item.right;
  const rotate = `rotate(${item.rotate})`;
  img.style.transform = item.extraTransform ? `${item.extraTransform} ${rotate}` : rotate;
  bgImagesContainer.appendChild(img);
});

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