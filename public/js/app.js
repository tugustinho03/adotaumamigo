// app.js — Adota um Amigo (Redesign)

let filtroAtivo = 'todos';

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  setTimeout(() => {
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
  }, 60);
});

// ===== NAV SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// ===== TIPO LABELS =====
function tipoLabel(tipo) {
  const map = { cao: 'Cão', gato: 'Gato', outro: 'Outro' };
  return map[tipo] || tipo;
}

// ===== RENDER CARDS =====
function renderCards(lista) {
  const grid = document.getElementById('cards-grid');
  grid.innerHTML = '';

  if (lista.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:80px 0;color:var(--muted);">
        <div style="font-size:3rem;margin-bottom:16px;">🔍</div>
        <p>Nenhum animal encontrado nesta categoria.</p>
      </div>`;
    return;
  }

  lista.forEach((animal, i) => {
    const card = document.createElement('div');
    card.className = 'animal-card';
    card.style.animationDelay = `${i * 0.07}s`;
    card.innerHTML = `
      <div class="animal-card__img" style="background:${animal.bg}">
        <span class="card-emoji">${animal.emoji}</span>
        <span class="animal-card__tipo">${tipoLabel(animal.tipo)}</span>
        <span class="animal-card__loc">📍 ${animal.localizacao}</span>
      </div>
      <div class="animal-card__body">
        <div class="animal-card__raca">${animal.raca}</div>
        <div class="animal-card__name">${animal.nome}</div>
        <div class="animal-card__meta">
          <span>📅 ${animal.idade}</span>
          <span>${animal.genero === 'Macho' ? '♂' : '♀'} ${animal.genero}</span>
        </div>
        <div class="animal-card__desc">${animal.descricao}</div>
        <div class="animal-card__footer">
          <div class="animal-card__tags">
            ${animal.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <div class="card-cta">→</div>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openModal(animal));
    grid.appendChild(card);
  });
}

// ===== FILTER =====
function filtrar(tipo) {
  filtroAtivo = tipo;
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('pill--active'));
  document.querySelector(`[data-filter="${tipo}"]`).classList.add('pill--active');
  const filtrados = tipo === 'todos' ? animais : animais.filter(a => a.tipo === tipo);
  renderCards(filtrados);
}

document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => filtrar(pill.dataset.filter));
});

// ===== MODAL =====
function openModal(animal) {
  const overlay = document.getElementById('modal-overlay');
  const content = document.getElementById('modal-content');

  content.innerHTML = `
    <span class="modal-emoji">${animal.emoji}</span>
    <h2>${animal.nome}</h2>
    <span class="modal-raca">${animal.raca}</span>
    <div class="modal-meta">
      <span>📅 ${animal.idade}</span>
      <span>${animal.genero === 'Macho' ? '♂' : '♀'} ${animal.genero}</span>
      <span>📍 ${animal.localizacao}</span>
    </div>
    <p>${animal.descricao}</p>
    <div class="modal-tags">
      ${animal.tags.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>
    <a href="mailto:adota@amigo.pt?subject=Quero adotar ${encodeURIComponent(animal.nome)}&body=Olá! Tenho interesse em adotar ${encodeURIComponent(animal.nome)}. Podem contactar-me para mais informações?"
       class="btn btn--primary">
       💌 Quero adotar o(a) ${animal.nome}
    </a>
  `;

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ===== INTERSECTION OBSERVER (scroll reveal) =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.step, .sobre__right').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(32px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===== INIT =====
renderCards(animais);
