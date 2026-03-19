/* LUNARA HUB — script.js */
const SESSION_KEY = 'lunara_user';
function getUser() { try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch { return null; } }
function setUser(u) { localStorage.setItem(SESSION_KEY, JSON.stringify(u)); }
function logout() { localStorage.removeItem(SESSION_KEY); location.reload(); }

function updateNavAvatar() {
  const user = getUser();
  const btn = document.querySelector('.btn-login');
  if (!btn) return;
  if (user) {
    btn.textContent = user.name ? user.name[0].toUpperCase() : '👤';
    btn.style.cssText = 'width:38px;height:38px;border-radius:50%;padding:0;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem;cursor:pointer;background:linear-gradient(135deg,#6A0DAD,#9B30FF);border:none;color:#fff;box-shadow:0 0 14px rgba(155,48,255,0.5);';
    btn.title = user.name || user.email;
    btn.onclick = function(e) { e.preventDefault(); showProfileMenu(btn); };
  }
}

function showProfileMenu(anchor) {
  const existing = document.getElementById('profileMenu');
  if (existing) { existing.remove(); return; }
  const menu = document.createElement('div');
  menu.id = 'profileMenu';
  menu.style.cssText = 'position:fixed;top:60px;right:1.5rem;background:rgba(13,0,31,0.97);border:1px solid rgba(155,48,255,0.4);border-radius:12px;padding:0.6rem 0;min-width:200px;z-index:3000;backdrop-filter:blur(18px);box-shadow:0 8px 32px rgba(106,13,173,0.5);';
  [
    { label: '👤 Edit Profile Picture', action: editProfilePicture },
    { label: '✏️ Edit Name', action: editName },
    { label: '📞 Contact Developer', action: () => window.open('tel:+917676387443') },
    { label: '🚪 Logout', action: logout },
  ].forEach(item => {
    const b = document.createElement('button');
    b.textContent = item.label;
    b.style.cssText = 'display:block;width:100%;padding:0.6rem 1.2rem;background:none;border:none;color:#C084FC;font-size:0.9rem;text-align:left;cursor:pointer;';
    b.onmouseenter = () => b.style.background = 'rgba(106,13,173,0.3)';
    b.onmouseleave = () => b.style.background = 'none';
    b.onclick = () => { menu.remove(); item.action(); };
    menu.appendChild(b);
  });
  document.body.appendChild(menu);
  setTimeout(() => document.addEventListener('click', function h(e) {
    if (!menu.contains(e.target) && e.target !== anchor) { menu.remove(); document.removeEventListener('click', h); }
  }), 50);
}

function editProfilePicture() {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = 'image/*';
  input.onchange = () => {
    const file = input.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { const u = getUser() || {}; u.avatar = reader.result; setUser(u); updateNavAvatar(); showToast('Profile picture updated!'); };
    reader.readAsDataURL(file);
  };
  input.click();
}

function editName() {
  const u = getUser() || {};
  const n = prompt('Enter your new display name:', u.name || '');
  if (n && n.trim()) { u.name = n.trim(); setUser(u); updateNavAvatar(); showToast('Name updated!'); }
}

function requireLogin() {
  if (getUser()) return true;
  showToast('🔒 Please <a href="login.html">login</a> to use this feature.');
  return false;
}

function showToast(msg) {
  const t = document.getElementById('loginToast');
  if (!t) return;
  t.innerHTML = msg; t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3500);
}

function initHamburger() {
  const btn = document.getElementById('hamburger');
  const links = document.querySelector('.nav-links');
  if (btn && links) btn.addEventListener('click', () => links.classList.toggle('open'));
}

function initSearch() {
  const toggle = document.getElementById('searchToggle');
  const overlay = document.getElementById('searchOverlay');
  const close = document.getElementById('searchClose');
  const input = document.getElementById('searchInput');
  if (!toggle) return;
  const sections = [
    { id: 'soundscape', label: 'Soundscape Music' },
    { id: 'art',        label: 'PixelLand Art' },
    { id: 'chatrooms',  label: 'Chat Rooms' },
    { id: 'games',      label: 'Tlunara JDM Arcade Games' },
    { id: 'marketplace',label: 'Moon Cart Marketplace Players' },
    { id: 'strategy',   label: 'Mainline Tech Strategy VC' },
    { id: 'tech',       label: 'Oxide Tech Aloxide' },
    { id: 'competition',label: 'Oxide Competition' },
    { id: 'about',      label: 'About Lunara' },
  ];
  toggle.addEventListener('click', () => { overlay.classList.add('active'); setTimeout(() => input && input.focus(), 100); });
  close && close.addEventListener('click', () => overlay.classList.remove('active'));
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); overlay.classList.add('active'); setTimeout(() => input && input.focus(), 100); }
    if (e.key === 'Escape') overlay.classList.remove('active');
  });
  input && input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = input.value.trim().toLowerCase();
      const match = sections.find(s => s.label.toLowerCase().includes(q) || s.id.includes(q));
      if (match) { overlay.classList.remove('active'); document.getElementById(match.id)?.scrollIntoView({ behavior: 'smooth' }); }
      else showToast('Section not found: ' + input.value);
    }
  });
}

function initCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;
  function update() {
    const now = new Date(), next = new Date(now);
    next.setHours(24,0,0,0);
    const d = next - now;
    const h = Math.floor(d/3600000), m = Math.floor((d%3600000)/60000), s = Math.floor((d%60000)/1000);
    el.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
  update(); setInterval(update, 1000);
}

function initNavScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 10 ? 'rgba(13,0,31,0.92)' : 'rgba(13,0,31,0.7)';
  });
}

function goStep(id) {
  document.querySelectorAll('.login-step').forEach(el => el.classList.remove('active'));
  document.getElementById(id)?.classList.add('active');
}

function initLoginPage() {
  const picker = document.getElementById('avatarPickerBtn');
  if (picker) picker.addEventListener('click', () => goStep('step-signin'));

  // Sign In
  const signinForm = document.getElementById('signinForm');
  if (signinForm) signinForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('signinEmail').value.trim();
    const pass = document.getElementById('signinPassword').value;
    const users = JSON.parse(localStorage.getItem('lunara_users') || '[]');
    const user = users.find(u => u.email === email && u.password === pass);
    if (user) { setUser(user); window.location.href = 'lunara-site.html'; }
    else alert('Incorrect email or password. Please register first.');
  });

  // Register
  const regForm = document.getElementById('registerForm');
  if (regForm) regForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pass = document.getElementById('regPassword').value;
    const users = JSON.parse(localStorage.getItem('lunara_users') || '[]');
    if (users.find(u => u.email === email)) { alert('Account exists. Please sign in.'); return; }
    const newUser = { name, email, password: pass, isAdmin: email === 'katariavianyt45@gmail.com', createdAt: Date.now() };
    users.push(newUser);
    localStorage.setItem('lunara_users', JSON.stringify(users));
    setUser(newUser);
    window.location.href = 'lunara-site.html';
  });

  // Forgot Password
  const forgotForm = document.getElementById('forgotForm');
  if (forgotForm) forgotForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value.trim();
    const newPass = document.getElementById('forgotNewPass').value;
    const confirmPass = document.getElementById('forgotConfirmPass').value;
    const msgEl = document.getElementById('forgotMsg');

    if (newPass !== confirmPass) {
      msgEl.textContent = '❌ Passwords do not match.';
      msgEl.style.cssText = 'display:block;background:rgba(255,50,50,0.12);border:1px solid rgba(255,80,80,0.4);color:#FF8080;text-align:center;padding:0.8rem;border-radius:8px;font-size:0.9rem;margin-top:0.5rem;';
      return;
    }

    const users = JSON.parse(localStorage.getItem('lunara_users') || '[]');
    const idx = users.findIndex(u => u.email === email);

    if (idx === -1) {
      msgEl.textContent = '❌ No account found with that email.';
      msgEl.style.cssText = 'display:block;background:rgba(255,50,50,0.12);border:1px solid rgba(255,80,80,0.4);color:#FF8080;text-align:center;padding:0.8rem;border-radius:8px;font-size:0.9rem;margin-top:0.5rem;';
      return;
    }

    users[idx].password = newPass;
    localStorage.setItem('lunara_users', JSON.stringify(users));
    msgEl.textContent = '✅ Password reset! Redirecting to sign in...';
    msgEl.style.cssText = 'display:block;background:rgba(46,204,64,0.1);border:1px solid rgba(46,204,64,0.4);color:#2ecc40;text-align:center;padding:0.8rem;border-radius:8px;font-size:0.9rem;margin-top:0.5rem;';
    setTimeout(() => goStep('step-signin'), 1800);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateNavAvatar();
  initHamburger();
  initSearch();
  initCountdown();
  initNavScroll();
  initLoginPage();
});
