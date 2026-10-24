// ---------- floating red hearts ----------
const heartsBox = document.getElementById('hearts');

function spawnHeart() {
  const h = document.createElement('div');
  h.className = 'heart';
  h.textContent = Math.random() > 0.2 ? '❤' : '💗';
  h.style.left = Math.random() * 100 + 'vw';
  h.style.fontSize = 14 + Math.random() * 30 + 'px';
  const dur = 6 + Math.random() * 6;
  h.style.animationDuration = dur + 's';
  heartsBox.appendChild(h);
  setTimeout(() => h.remove(), dur * 1000);
}
setInterval(spawnHeart, 350);
for (let i = 0; i < 12; i++) setTimeout(spawnHeart, i * 150);

// ---------- login ----------
const input = document.getElementById('dateInput');
const errorEl = document.getElementById('error');
const enterBtn = document.getElementById('enterBtn');
const song = document.getElementById('song');
const musicBtn = document.getElementById('musicBtn');

// Correct date: 15 / 8 (15 August)
function isCorrectDate(value) {
  const v = value.trim().toLowerCase();
  const nums = v.match(/\d+/g);
  if (nums && nums.length >= 2) {
    const a = parseInt(nums[0], 10);
    const b = parseInt(nums[1], 10);
    if (a === 15 && b === 8) return true;
  }
  return /^15\s*(th)?\s*(of)?\s*(aug|august)/.test(v) || /^(aug|august)\s*15/.test(v);
}

function tryLogin() {
  if (isCorrectDate(input.value)) {
    errorEl.textContent = '';
    goHome();
  } else {
    errorEl.textContent = "Hmm, that's not our date... try again 💭";
    input.classList.remove('shake');
    void input.offsetWidth;
    input.classList.add('shake');
  }
}

enterBtn.addEventListener('click', tryLogin);
input.addEventListener('keydown', e => { if (e.key === 'Enter') tryLogin(); });

// ---------- go to home ----------
function goHome() {
  document.getElementById('login').classList.remove('active');
  document.getElementById('home').classList.add('active');
  window.scrollTo(0, 0);

  // play the song (the button click allows autoplay)
  song.volume = 0.8;
  song.play().catch(() => musicBtn.classList.add('paused'));

  revealOnScroll();
  burst(25);
}

// ---------- music button ----------
musicBtn.addEventListener('click', () => {
  if (song.paused) {
    song.play();
    musicBtn.classList.remove('paused');
  } else {
    song.pause();
    musicBtn.classList.add('paused');
  }
});

// ---------- reveal messages while scrolling ----------
function revealOnScroll() {
  const items = document.querySelectorAll('.msg, .final');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('show');
        if (en.target.classList.contains('final')) burst(30);
      }
    });
  }, { threshold: 0.3 });
  items.forEach(el => obs.observe(el));
}

// ---------- go to gift page ----------
document.getElementById('nextBtn').addEventListener('click', () => {
  document.getElementById('home').classList.remove('active');
  document.getElementById('gift').classList.add('active');
  window.scrollTo(0, 0);
});

// second music button (same song keeps playing)
document.getElementById('musicBtn2').addEventListener('click', () => {
  if (song.paused) { song.play(); } else { song.pause(); }
  document.getElementById('musicBtn2').classList.toggle('paused', song.paused);
  musicBtn.classList.toggle('paused', song.paused);
});

// ---------- open the heart box ----------
const heartBox = document.getElementById('heartBox');
let opened = false;
heartBox.addEventListener('click', () => {
  if (opened) return;
  opened = true;
  heartBox.classList.add('open');
  document.getElementById('tapHint').classList.add('hide');
  setTimeout(() => burst(35), 1400);
  setTimeout(() => document.getElementById('afterText').classList.add('show'), 100);
  setTimeout(() => burst(30), 4000);
});

// ---------- heart burst ----------
function burst(n) {
  for (let i = 0; i < n; i++) setTimeout(spawnHeart, i * 60);
}
document.getElementById('heartBurst').addEventListener('click', () => burst(40));
