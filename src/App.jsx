import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { animais } from './data.js'

const FILTROS = [
  { id: 'todos', label: 'Todos' },
  { id: 'cao', label: '🐕 Cães' },
  { id: 'gato', label: '🐈 Gatos' },
  { id: 'outro', label: '🐾 Outros' },
]

const TICKER = ['🐾 Adoção gratuita', '🏥 Acompanhamento veterinário', '💛 12 anos de missão']
const STATS = ['847 Adotados', '132 À Espera', '98% Satisfeitos', '12 Anos']

function tipoLabel(tipo) {
  const map = { cao: 'Cão', gato: 'Gato', outro: 'Outro' }
  return map[tipo] || tipo
}

function generoIcon(genero) {
  return genero === 'Macho' ? '♂' : '♀'
}

function Cursor() {
  const cursor = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      cursor.current.style.left = e.clientX + 'px'
      cursor.current.style.top = e.clientY + 'px'
      setTimeout(() => {
        if (!ring.current) return
        ring.current.style.left = e.clientX + 'px'
        ring.current.style.top = e.clientY + 'px'
      }, 60)
    }
    document.addEventListener('mousemove', onMove)
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div className="cursor" ref={cursor}></div>
      <div className="cursor-ring" ref={ring}></div>
    </>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <a href="#" className="nav__logo">
        <span className="logo-paw">✦</span> adota um amigo
      </a>
      <ul className="nav__links">
        <li><a href="#animais">Animais</a></li>
        <li><a href="#como-funciona">Como Funciona</a></li>
        <li><a href="#sobre">Sobre Nós</a></li>
      </ul>
      <a href="#animais" className="btn btn--nav">Adotar →</a>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__noise"></div>
      <div className="hero__grid-bg"></div>

      <div className="hero__left">
        <div className="hero__tag">
          <span className="tag-dot"></span>
          Adoção Responsável · Portugal · Desde 2013
        </div>
        <h1 className="hero__title">
          Todo animal<br />
          <span className="hero__title-italic">merece um lar</span><br />
          <span className="hero__title-outline">e amor.</span>
        </h1>
        <p className="hero__sub">Encontra o teu companheiro perfeito entre centenas de animais à espera de uma segunda oportunidade.</p>
        <div className="hero__actions">
          <a href="#animais" className="btn btn--primary">Ver Animais disponíveis</a>
          <a href="#como-funciona" className="btn btn--text">Como funciona <span className="arrow">↓</span></a>
        </div>
      </div>

      <div className="hero__right">
        <div className="hero__featured-card">
          <div className="featured-card__header">
            <span className="featured-label">Em destaque</span>
            <span className="featured-status">● Disponível</span>
          </div>
          <div className="featured-card__emoji-wrap">
            <div className="featured-emoji-bg"></div>
            <span className="featured-emoji">🐕</span>
          </div>
          <div className="featured-card__info">
            <h3>Bolinha</h3>
            <p>Labrador mix · 3 anos · Lisboa</p>
          </div>
          <div className="featured-card__tags">
            <span>Castrado</span><span>Vacinado</span><span>Sociável</span>
          </div>
        </div>

        <div className="hero__side-card">
          <span className="side-emoji">🐱</span>
          <div>
            <strong>Luna</strong>
            <span>Europeu · 1 ano</span>
          </div>
          <span className="side-badge">Porto</span>
        </div>

        <div className="hero__counter">
          <div className="counter-inner">
            <span className="counter-num">847</span>
            <span className="counter-label">animais<br />adotados</span>
          </div>
        </div>

        <div className="hero__ticker">
          {[...TICKER, ...TICKER].map((t, i) => (
            <Fragment key={i}>
              <span>{t}</span>
              <span>✦</span>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  return (
    <div className="marquee-bar">
      <div className="marquee-track">
        {[...STATS, ...STATS].map((s, i) => (
          <Fragment key={i}>
            <span>{s}</span>
            <span className="mx">✦</span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

function AnimalCard({ animal, index, onOpen }) {
  return (
    <div className="animal-card" style={{ animationDelay: `${index * 0.07}s` }} onClick={() => onOpen(animal)}>
      <div className="animal-card__img" style={{ background: animal.bg }}>
        <span className="card-emoji">{animal.emoji}</span>
        <span className="animal-card__tipo">{tipoLabel(animal.tipo)}</span>
        <span className="animal-card__loc">📍 {animal.localizacao}</span>
      </div>
      <div className="animal-card__body">
        <div className="animal-card__raca">{animal.raca}</div>
        <div className="animal-card__name">{animal.nome}</div>
        <div className="animal-card__meta">
          <span>📅 {animal.idade}</span>
          <span>{generoIcon(animal.genero)} {animal.genero}</span>
        </div>
        <div className="animal-card__desc">{animal.descricao}</div>
        <div className="animal-card__footer">
          <div className="animal-card__tags">
            {animal.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
          <div className="card-cta">→</div>
        </div>
      </div>
    </div>
  )
}

function Animais({ onOpen }) {
  const [filtro, setFiltro] = useState('todos')
  const lista = filtro === 'todos' ? animais : animais.filter((a) => a.tipo === filtro)

  return (
    <section className="animais" id="animais">
      <div className="animais__header">
        <div className="animais__header-left">
          <span className="section-label">Os nossos amigos</span>
          <h2 className="section-title">Conhece quem<br /><em>precisa de ti</em></h2>
        </div>
        <div className="filter-pills">
          {FILTROS.map((f) => (
            <button
              key={f.id}
              className={`pill${filtro === f.id ? ' pill--active' : ''}`}
              onClick={() => setFiltro(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="cards-grid" key={filtro}>
        {lista.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
            <p>Nenhum animal encontrado nesta categoria.</p>
          </div>
        ) : (
          lista.map((animal, i) => (
            <AnimalCard key={animal.id} animal={animal} index={i} onOpen={onOpen} />
          ))
        )}
      </div>
    </section>
  )
}

function Reveal({ as: Tag = 'div', className, children }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
    >
      {children}
    </Tag>
  )
}

const PASSOS = [
  { num: '01', icon: '🔍', titulo: 'Escolhe', texto: 'Navega pelos perfis e encontra o animal com quem sentes uma ligação especial.' },
  { num: '02', icon: '📞', titulo: 'Contacta', texto: 'Entra em contacto com o nosso abrigo para agendar uma visita presencial.' },
  { num: '03', icon: '🏡', titulo: 'Adota', texto: 'Após processo de aprovação, leva o teu novo companheiro para casa.' },
]

function ComoFunciona() {
  return (
    <section className="como-funciona" id="como-funciona">
      <div className="cf-noise"></div>
      <div className="cf-inner">
        <span className="section-label">O processo</span>
        <h2 className="section-title center">Como adotar</h2>
        <div className="steps">
          {PASSOS.map((p, i) => (
            <Fragment key={p.num}>
              {i > 0 && (
                <div className="step__connector">
                  <div className="connector-line"></div>
                  <span>→</span>
                </div>
              )}
              <Reveal className="step">
                <div className="step__num">{p.num}</div>
                <div className="step__icon">{p.icon}</div>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </Reveal>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

function Sobre() {
  return (
    <section className="sobre" id="sobre">
      <div className="sobre__left">
        <div className="sobre__img-box">
          <div className="sobre__paw-bg">🐾</div>
          <div className="sobre__float-badge sobre__float-badge--1">Amor incondicional 💛</div>
          <div className="sobre__float-badge sobre__float-badge--2">✓ Adoção gratuita</div>
        </div>
      </div>
      <Reveal className="sobre__right">
        <span className="section-label">A nossa missão</span>
        <h2 className="section-title">Acreditamos que<br /><em>todo amor conta.</em></h2>
        <p>Somos uma organização sem fins lucrativos dedicada a dar uma segunda chance a animais abandonados ou maltratados. Cada adoção é um ato de amor que muda duas vidas — a do animal e a tua.</p>
        <div className="sobre__stats">
          <div className="sobre__stat">
            <span className="sobre__stat-n">847</span>
            <span className="sobre__stat-l">Animais Adotados</span>
          </div>
          <div className="sobre__stat">
            <span className="sobre__stat-n">12</span>
            <span className="sobre__stat-l">Anos de Missão</span>
          </div>
        </div>
        <a href="mailto:adota@amigo.pt" className="btn btn--primary">Fala connosco →</a>
      </Reveal>
    </section>
  )
}

function Modal({ animal, onClose }) {
  useEffect(() => {
    if (!animal) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [animal, onClose])

  const subject = animal ? `Quero adotar ${animal.nome}` : ''
  const body = animal
    ? `Olá! Tenho interesse em adotar ${animal.nome}. Podem contactar-me para mais informações?`
    : ''

  return (
    <div
      className={`modal-overlay${animal ? ' open' : ''}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="modal">
        <button className="modal__close" onClick={onClose}>✕</button>
        <div className="modal__content">
          {animal && (
            <>
              <span className="modal-emoji">{animal.emoji}</span>
              <h2>{animal.nome}</h2>
              <span className="modal-raca">{animal.raca}</span>
              <div className="modal-meta">
                <span>📅 {animal.idade}</span>
                <span>{generoIcon(animal.genero)} {animal.genero}</span>
                <span>📍 {animal.localizacao}</span>
              </div>
              <p>{animal.descricao}</p>
              <div className="modal-tags">
                {animal.tags.map((t) => <span key={t} className="tag">{t}</span>)}
              </div>
              <a
                href={`mailto:adota@amigo.pt?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
                className="btn btn--primary"
              >
                💌 Quero adotar o(a) {animal.nome}
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="footer__brand">
          <span className="footer__logo">✦ adota um amigo</span>
          <p>Feito com ❤️ para os animais de Portugal.</p>
        </div>
        <div className="footer__links">
          <a href="#animais">Animais</a>
          <a href="#como-funciona">Como Funciona</a>
          <a href="#sobre">Sobre</a>
          <a href="mailto:adota@amigo.pt">Contacto</a>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2025 Adota um Amigo</span>
        <span>Todos os direitos reservados</span>
      </div>
    </footer>
  )
}

export default function App() {
  const [selecionado, setSelecionado] = useState(null)
  const fechar = useCallback(() => setSelecionado(null), [])

  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <Animais onOpen={setSelecionado} />
      <ComoFunciona />
      <Sobre />
      <Modal animal={selecionado} onClose={fechar} />
      <Footer />
    </>
  )
}
