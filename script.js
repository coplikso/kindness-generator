const challenges = [
  { text: "Text a friend you haven't talked to in a while — just say hey.", why: "A simple message can seriously make someone's whole day.", category: "friends", difficulty: 1 },
  { text: "Leave a genuine, specific compliment on someone's recent post.", why: "Not just 'cute' — tell them exactly why it's great.", category: "online", difficulty: 1 },
  { text: "Put your phone away for the whole next meal with family.", why: "Real presence is the rarest gift right now.", category: "family", difficulty: 2 },
  { text: "Carry something for a family member without being asked.", why: "Small physical acts show you're actually paying attention.", category: "family", difficulty: 1 },
  { text: "Compliment a stranger's fit, hairstyle, or vibe — out loud.", why: "Saying it out loud > thinking it and staying silent.", category: "strangers", difficulty: 2 },
  { text: "Hold the elevator for someone who's a little too far away.", why: "That extra 5 seconds tells them they matter.", category: "strangers", difficulty: 1 },
  { text: "Share a small local business on your story with genuine love.", why: "One share from the right person can change their whole week.", category: "online", difficulty: 1 },
  { text: "Reply to a creator you follow with actual, thoughtful feedback.", why: "Most creators only get 'lol' and ghost emojis. Be different.", category: "online", difficulty: 2 },
  { text: "Pick up three pieces of trash near your school or home.", why: "You don't have to own a problem to fix it.", category: "environment", difficulty: 1 },
  { text: "Switch to a reusable bottle for the whole week.", why: "Tiny habit, compounding impact.", category: "environment", difficulty: 2 },
  { text: "Let someone merge in traffic without the passive-aggressive pause.", why: "Driving kindness is criminally underrated.", category: "strangers", difficulty: 1 },
  { text: "Send a voice note to check in on a friend instead of texting.", why: "Hearing your voice hits different than typed words.", category: "friends", difficulty: 1 },
  { text: "Thank a teacher, barista, or delivery person — by name.", why: "People who are thanked by name remember it for days.", category: "strangers", difficulty: 2 },
  { text: "Cook or make something for a family member this week.", why: "Effort tastes better than anything from a restaurant.", category: "family", difficulty: 3 },
  { text: "Log off social media for one hour and do something just for you.", why: "You can't pour from an empty cup. Refill.", category: "self", difficulty: 2 },
  { text: "Write down three things you actually like about yourself.", why: "Self-kindness isn't selfish — it's necessary.", category: "self", difficulty: 2 },
  { text: "Mute or unfollow accounts that make you feel bad. Right now.", why: "Your feed is yours. Curate it like you mean it.", category: "self", difficulty: 1 },
  { text: "Defend someone being talked about behind their back.", why: "Speaking up when it's easier to stay quiet is real courage.", category: "friends", difficulty: 3 },
  { text: "Amplify a creator from a marginalized community you genuinely enjoy.", why: "Visibility equals opportunity. Your share matters more than you think.", category: "online", difficulty: 1 },
  { text: "Ask a family member about their day and actually listen — fully.", why: "Listening without waiting to respond is an act of love.", category: "family", difficulty: 2 },
  { text: "Plant something, even just a small herb in a cup.", why: "Growing things is a slow, grounding form of hope.", category: "environment", difficulty: 3 },
  { text: "Take yourself on a walk with no podcasts, no music — just you.", why: "Being present with yourself is a form of kindness too.", category: "self", difficulty: 2 },
  { text: "Write an honest, positive review for a place you genuinely like.", why: "Small businesses live and die by reviews. Make yours count.", category: "online", difficulty: 2 },
  { text: "Smile at five strangers today — a real one, not a grimace.", why: "A genuine smile is free and completely contagious.", category: "strangers", difficulty: 1 },
  { text: "Call a grandparent or older relative just to chat, no reason needed.", why: "You might be the highlight of their entire week.", category: "family", difficulty: 2 },
  { text: "Surprise a friend with their favorite snack or drink.", why: "It's not about the money — it's about the thought they'll remember.", category: "friends", difficulty: 2 },
  { text: "Clean up a shared space at home without anyone asking.", why: "A tidy space is a gift to everyone who uses it.", category: "family", difficulty: 1 },
  { text: "DM a creator whose work genuinely changed how you see something.", why: "Creators rarely hear the real impact of their work. Tell them.", category: "online", difficulty: 2 },
  { text: "Spend 20 minutes reading something that has nothing to do with productivity.", why: "Rest isn't laziness. It's maintenance.", category: "self", difficulty: 1 },
  { text: "Give up your seat on public transport without being asked.", why: "It's a small sacrifice that genuinely helps someone else.", category: "strangers", difficulty: 1 },
];

const catConfig = {
  friends:     { label: 'Friends',    class: 'cat-friends',     accent: '#2A4A7A' },
  family:      { label: 'Family',     class: 'cat-family',      accent: '#3A6B4A' },
  strangers:   { label: 'Strangers',  class: 'cat-strangers',   accent: '#C4902A' },
  online:      { label: 'Online',     class: 'cat-online',      accent: '#5B3A9A' },
  environment: { label: 'Planet',     class: 'cat-environment', accent: '#3A6B4A' },
  self:        { label: 'Self-care',  class: 'cat-self',        accent: '#D4622A' },
};

/* ── State ── */
let currentFilter    = 'all';
let currentChallenge = null;
let streak    = parseInt(localStorage.getItem('kg_streak')   || '0');
let total     = parseInt(localStorage.getItem('kg_total')    || '0');
let lastDate  = localStorage.getItem('kg_lastDate')          || '';
let log       = JSON.parse(localStorage.getItem('kg_log')    || '[]');
let todayDone = localStorage.getItem('kg_todayDone') === 'true';

/* ── Persistence ── */
function saveState() {
  localStorage.setItem('kg_streak',    streak);
  localStorage.setItem('kg_total',     total);
  localStorage.setItem('kg_lastDate',  lastDate);
  localStorage.setItem('kg_log',       JSON.stringify(log));
  localStorage.setItem('kg_todayDone', todayDone);
}

function todayStr() {
  return new Date().toDateString();
}

/* ── UI updates ── */
function updateStats() {
  document.getElementById('streakNum').textContent = streak;
  document.getElementById('totalNum').textContent  = total;
}

function renderLog() {
  const grid  = document.getElementById('logGrid');
  const count = document.getElementById('logCount');

  if (!log.length) {
    grid.innerHTML  = '<div class="log-empty">Nothing yet — go be kind! ✨</div>';
    count.textContent = '';
    return;
  }

  count.textContent = log.length + ' acts';
  grid.innerHTML = log.slice(0, 8).map(item => `
    <div class="log-item">
      <div class="log-check">
        <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <span class="log-text">${item}</span>
    </div>
  `).join('');
}

function setDiffDots(n) {
  document.getElementById('diffDots').innerHTML = [1, 2, 3]
    .map(i => `<div class="diff-dot ${i <= n ? 'filled' : ''}"></div>`)
    .join('');
}

/* ── Generate ── */
function generate() {
  const pool = currentFilter === 'all'
    ? challenges
    : challenges.filter(c => c.category === currentFilter);

  if (!pool.length) return;

  let c;
  do { c = pool[Math.floor(Math.random() * pool.length)]; }
  while (pool.length > 1 && currentChallenge && c.text === currentChallenge.text);

  currentChallenge = c;
  todayDone = false;
  saveState();

  /* card flip animation */
  const card = document.getElementById('challengeCard');
  card.classList.remove('card-animate');
  void card.offsetWidth;
  card.classList.add('card-animate');

  /* shine effect */
  const shine = document.createElement('div');
  shine.className = 'card-shine';
  card.appendChild(shine);
  setTimeout(() => shine.remove(), 600);

  /* update card accent color */
  const cfg = catConfig[c.category];
  card.style.setProperty('--card-accent', cfg.accent);

  /* category tag */
  const tag = document.getElementById('catTag');
  tag.textContent = cfg.label;
  tag.className   = 'cat-tag ' + cfg.class;

  setDiffDots(c.difficulty);
  document.getElementById('challengeText').textContent = c.text;
  document.getElementById('challengeWhy').innerHTML   = '<span>Why it matters:</span> ' + c.why;

  /* reset done button */
  const doneBtn = document.getElementById('doneBtn');
  doneBtn.classList.remove('done-state');
  doneBtn.innerHTML = svgCheck(16) + ' I did it!';
}

/* ── Mark done ── */
function markDone() {
  if (!currentChallenge) { showToast('Get a challenge first!'); return; }
  if (todayDone)         { showToast('Already logged today — come back tomorrow! 🌟'); return; }

  todayDone = true;
  total++;

  const t = todayStr();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (lastDate === yesterday.toDateString()) {
    streak++;
  } else if (lastDate !== t) {
    streak = 1;
  }
  lastDate = t;

  log.unshift(currentChallenge.text);
  if (log.length > 20) log = log.slice(0, 20);

  saveState();
  updateStats();
  renderLog();

  const doneBtn = document.getElementById('doneBtn');
  doneBtn.classList.add('done-state');
  doneBtn.innerHTML = svgCheck(16) + ' Done!';

  showToast('Nice one! Keep the streak going 🔥');
}

/* ── Share ── */
function shareChallenge() {
  if (!currentChallenge) { showToast('Generate a challenge first!'); return; }

  const text = `Today's kindness challenge: "${currentChallenge.text}" — try it too! 💛`;

  if (navigator.share) {
    navigator.share({ text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!'));
  }
}

/* ── Toast ── */
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

/* ── Helpers ── */
function svgCheck(size) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
}

/* ── Filter clicks ── */
document.getElementById('filtersEl').addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  currentFilter = btn.dataset.cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
});

/* ── Init ── */
updateStats();
renderLog();
generate();