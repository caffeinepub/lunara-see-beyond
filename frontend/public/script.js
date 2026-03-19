/* ============================================================
   LUNARA HUB — Main Script
   Vanilla JS — no framework dependencies
   ============================================================ */

var SESSION_KEY = 'lunara_user';
var USERS_KEY   = 'lunara_users';
var ADMIN_EMAIL = 'katariavianyt45@gmail.com';

/* Session helpers */
function getUser() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)); } catch(e) { return null; }
}

function setUser(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
  location.reload();
}

/* Nav avatar */
function updateNavAvatar() {
  var user      = getUser();
  var loginLink = document.getElementById('nav-login-link');
  var avatarWrap= document.getElementById('nav-avatar-wrap');
  var avatarEl  = document.getElementById('nav-avatar');
  if (!loginLink || !avatarWrap || !avatarEl) return;
  if (user) {
    loginLink.style.display = 'none';
    avatarWrap.style.display = 'flex';
    if (user.avatar) {
      avatarEl.style.backgroundImage = 'url(' + user.avatar + ')';
      avatarEl.style.backgroundSize  = 'cover';
      avatarEl.textContent = '';
    } else {
      avatarEl.textContent = (user.name || 'U')[0].toUpperCase();
    }
  } else {
    loginLink.style.display = '';
    avatarWrap.style.display = 'none';
  }
}

/* Profile menu */
function showProfileMenu(anchor) {
  var existing = document.getElementById('profile-menu-popup');
  if (existing) { existing.remove(); return; }
  var menu = document.createElement('div');
  menu.id = 'profile-menu-popup';
  menu.className = 'profile-menu open';
  menu.innerHTML =
    '<button onclick="editProfilePicture()">\uD83D\uDDBC\uFE0F Edit Profile Picture</button>' +
    '<button onclick="editName()">\u270F\uFE0F Edit Name</button>' +
    '<button onclick="window.location.href=\'tel:+917676387443\'">\uD83D\uDCDE Contact Developer</button>' +
    '<button onclick="logout()" style="color:#f87171">\uD83D\uDEAA Logout</button>';
  anchor.style.position = 'relative';
  anchor.appendChild(menu);
  setTimeout(function() {
    document.addEventListener('click', function handler(e) {
      if (!menu.contains(e.target) && !anchor.contains(e.target)) {
        menu.remove();
        document.removeEventListener('click', handler);
      }
    });
  }, 10);
}

function editProfilePicture() {
  var input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = function() {
    var file = input.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(e) {
      var user = getUser();
      if (!user) return;
      user.avatar = e.target.result;
      setUser(user);
      updateNavAvatar();
      var pm = document.getElementById('profile-menu-popup');
      if (pm) pm.remove();
      showToast('Profile picture updated!');
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

function editName() {
  var user = getUser();
  if (!user) return;
  var name = prompt('Enter your new display name:', user.name || '');
  if (name && name.trim()) {
    user.name = name.trim();
    setUser(user);
    updateNavAvatar();
    var pm = document.getElementById('profile-menu-popup');
    if (pm) pm.remove();
    showToast('Name updated to ' + user.name + '!');
  }
}

/* Login required guard */
function requireLogin(msg) {
  if (!getUser()) {
    showToast(msg || '\uD83D\uDD12 Please log in to use this feature.');
    return false;
  }
  return true;
}

/* Toast */
function showToast(msg) {
  var toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(function() { toast.classList.remove('show'); }, 3000);
}

/* Hamburger */
function initHamburger() {
  var btn   = document.getElementById('hamburger');
  var links = document.getElementById('nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', function() { links.classList.toggle('open'); });
  links.querySelectorAll('.nav-link').forEach(function(link) {
    link.addEventListener('click', function(e) {
      if (window.innerWidth > 768) return;
      var parent = link.closest('.nav-item');
      if (!parent) return;
      var dd = parent.querySelector('.dropdown');
      if (!dd) return;
      e.preventDefault();
      parent.classList.toggle('open');
    });
  });
}

/* Search overlay */
function initSearch() {
  var overlay  = document.getElementById('search-overlay');
  var input    = document.getElementById('search-input');
  var results  = document.getElementById('search-results');
  var btn      = document.getElementById('search-btn');
  var closeBtn = document.getElementById('search-close');

  var sections = [
    { label: '\uD83C\uDFB5 Soundscape',      id: 'soundscape' },
    { label: '\uD83C\uDFA8 PixelLand',        id: 'pixelland' },
    { label: '\uD83D\uDCAC Chat Rooms',        id: 'chatrooms' },
    { label: '\uD83C\uDFAE Tlunara Arcade',    id: 'arcade' },
    { label: '\uD83D\uDED2 Moon Cart',         id: 'mooncart' },
    { label: '\uD83E\uDDE0 Mainline Tech',     id: 'mainlinetech' },
    { label: '\uD83D\uDCBB Oxide',             id: 'oxide' },
    { label: '\uD83C\uDFC6 Competition',       id: 'competition' },
    { label: '\uD83C\uDF19 About',             id: 'about' }
  ];

  function openSearch() {
    if (!overlay) return;
    overlay.classList.add('open');
    renderPills('');
    setTimeout(function() { if (input) input.focus(); }, 50);
  }

  function closeSearch() {
    if (!overlay) return;
    overlay.classList.remove('open');
    if (input) input.value = '';
  }

  function renderPills(q) {
    if (!results) return;
    var filtered = q
      ? sections.filter(function(s) { return s.label.toLowerCase().indexOf(q.toLowerCase()) !== -1; })
      : sections;
    results.innerHTML = filtered.map(function(s) {
      return '<span class="search-pill" data-id="' + s.id + '">' + s.label + '</span>';
    }).join('');
    results.querySelectorAll('.search-pill').forEach(function(pill) {
      pill.addEventListener('click', function() {
        var el = document.getElementById(pill.dataset.id);
        if (el) {
          closeSearch();
          setTimeout(function() { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100);
        }
      });
    });
  }

  if (btn)      btn.addEventListener('click', openSearch);
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);
  if (overlay)  overlay.addEventListener('click', function(e) { if (e.target === overlay) closeSearch(); });

  if (input) {
    input.addEventListener('input', function() { renderPills(input.value); });
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') { var first = results && results.querySelector('.search-pill'); if (first) first.click(); }
      if (e.key === 'Escape') closeSearch();
    });
  }

  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  });
}

/* Countdown */
function initCountdown() {
  var el = document.getElementById('countdown');
  if (!el) return;
  function tick() {
    var now      = new Date();
    var midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    var diff = midnight - now;
    var h = Math.floor(diff / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000)   / 1000);
    el.textContent = String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
  }
  tick();
  setInterval(tick, 1000);
}

/* Navbar scroll */
function initNavScroll() {
  var navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }, { passive: true });
}

/* Smooth scroll nav links */
function initNavLinks() {
  document.querySelectorAll('[data-scroll]').forEach(function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      var target = document.getElementById(el.dataset.scroll);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      var links = document.getElementById('nav-links');
      if (links) links.classList.remove('open');
    });
  });
}

/* Login step switcher */
function goStep(stepId) {
  document.querySelectorAll('.login-step').forEach(function(s) { s.classList.remove('show'); });
  var target = document.getElementById(stepId);
  if (target) target.classList.add('show');
}

/* Login page */
function initLoginPage() {
  var pickerBtn    = document.getElementById('avatarPickerBtn');
  var signinForm   = document.getElementById('signinForm');
  var registerForm = document.getElementById('registerForm');
  if (!pickerBtn && !signinForm && !registerForm) return;

  if (pickerBtn) pickerBtn.addEventListener('click', function() { goStep('step-signin'); });

  if (signinForm) {
    signinForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var email = signinForm.querySelector('[name="email"]').value.trim();
      var pass  = signinForm.querySelector('[name="password"]').value;
      var users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      var found = null;
      for (var i = 0; i < users.length; i++) { if (users[i].email === email && users[i].password === pass) { found = users[i]; break; } }
      if (!found) { showToast('\u274C Invalid email or password.'); return; }
      setUser({ name: found.name, email: found.email, isAdmin: found.isAdmin });
      window.location.href = 'index.html';
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var name  = registerForm.querySelector('[name="name"]').value.trim();
      var email = registerForm.querySelector('[name="email"]').value.trim();
      var pass  = registerForm.querySelector('[name="password"]').value;
      var users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      for (var i = 0; i < users.length; i++) { if (users[i].email === email) { showToast('\u26A0\uFE0F Email already registered.'); return; } }
      var isAdmin = email === ADMIN_EMAIL;
      users.push({ name: name, email: email, password: pass, isAdmin: isAdmin });
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      setUser({ name: name, email: email, isAdmin: isAdmin });
      window.location.href = 'index.html';
    });
  }

  goStep('step-picker');
}

/* Avatar menu */
function initAvatarMenu() {
  var wrap = document.getElementById('nav-avatar-wrap');
  if (!wrap) return;
  wrap.addEventListener('click', function(e) { e.stopPropagation(); showProfileMenu(wrap); });
}

/* Music upload */
function initMusicUpload() {
  var btn = document.getElementById('music-upload-btn');
  if (!btn) return;
  btn.addEventListener('click', function() {
    if (!requireLogin('\uD83D\uDD12 Log in to upload music.')) return;
    var input = document.createElement('input');
    input.type = 'file'; input.accept = 'audio/*';
    input.onchange = function() { if (input.files[0]) showToast('\uD83C\uDFB5 "' + input.files[0].name + '" uploaded!'); };
    input.click();
  });
}

/* Art upload */
function initArtUpload() {
  var btn = document.getElementById('art-upload-btn');
  if (!btn) return;
  btn.addEventListener('click', function() {
    if (!requireLogin('\uD83D\uDD12 Log in to upload art.')) return;
    var input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*';
    input.onchange = function() { if (input.files[0]) showToast('\uD83C\uDFA8 "' + input.files[0].name + '" uploaded!'); };
    input.click();
  });
}

/* MoonCart listing */
function initMoonCart() {
  var btn = document.getElementById('moonmart-list-btn');
  if (!btn) return;
  btn.addEventListener('click', function() {
    if (!requireLogin('\uD83D\uDD12 Log in to list an item.')) return;
    showToast('\uD83D\uDCE6 Listing feature coming soon \u2014 stay tuned!');
  });
}

/* Study groups */
function initStudyGroups() {
  var btn = document.getElementById('create-study-btn');
  if (!btn) return;
  btn.addEventListener('click', function() {
    if (!requireLogin('\uD83D\uDD12 Log in to create a study group.')) return;
    var name = prompt('Study group name:');
    if (!name) return;
    var dur  = prompt('Total study duration (minutes):', '60');
    if (!dur) return;
    var brks = prompt('Number of breaks:', '2');
    var intv = prompt('Break interval (minutes):', '25');
    showToast('\uD83D\uDCDA "' + name + '" created! (' + dur + 'min, ' + (brks||0) + ' breaks every ' + (intv||25) + 'min)');
  });
}

/* Login-gate generic buttons */
function initLoginGates() {
  document.querySelectorAll('[data-require-login]').forEach(function(el) {
    el.addEventListener('click', function() { requireLogin(); });
  });
}

/* DOMContentLoaded */
document.addEventListener('DOMContentLoaded', function() {
  updateNavAvatar();
  initHamburger();
  initSearch();
  initCountdown();
  initNavScroll();
  initNavLinks();
  initLoginPage();
  initAvatarMenu();
  initMusicUpload();
  initArtUpload();
  initMoonCart();
  initStudyGroups();
  initLoginGates();
});
