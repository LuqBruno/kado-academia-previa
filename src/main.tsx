import React, { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, LazyMotion, domAnimation, m, MotionConfig, useScroll, useTransform, type MotionStyle } from 'motion/react';
import '@fontsource/barlow-condensed/latin-700.css';
import '@fontsource/barlow-condensed/latin-600.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-600.css';
import { hours, INSTAGRAM, MAP_EMBED, MAPS, modalities, nextTab, whatsappUrl } from './data';
import './style.css';

const media = (file: string) => `${import.meta.env.BASE_URL}media/${file}`;
function subscribeMotionPreference(notify: () => void) {
  const query = matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', notify);
  return () => query.removeEventListener('change', notify);
}
function motionPreference() { return matchMedia('(prefers-reduced-motion: reduce)').matches; }
// Motion's installed useReducedMotion snapshots its initial preference. This store
// also stops the film when the visitor changes the OS setting with the page open.
function useMotionPreference() { return useSyncExternalStore(subscribeMotionPreference, motionPreference, () => true); }
function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
function Play({ pause = false }: { pause?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">{pause ? <path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="3" /> : <path d="m9 5 10 7-10 7V5Z" fill="currentColor" />}</svg>;
}
function Logo() { return <img src={media('logo-kado.webp')} width="150" height="99" alt="Kado Academia" />; }
function CTA({ children, subject, className = '' }: { children: React.ReactNode; subject?: string; className?: string }) {
  return <m.a whileTap={{ scale: .98 }} transition={{ type: 'spring', bounce: 0, duration: .25 }} className={`button ${className}`} href={whatsappUrl(subject)} target="_blank" rel="noopener noreferrer"><span>{children}</span><Arrow diagonal /></m.a>;
}

// A shared visual language, not a scroll hijacker: native scrolling drives each frame.
function SceneImage({ file, alt, width, height, className = '', children }: { file: string; alt: string; width: number; height: number; className?: string; children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.09, 1]);
  return <div ref={ref} className={`scene-image ${className}`}><m.img style={{ scale: reduced ? 1 : scale }} src={media(file)} width={width} height={height} alt={alt} loading="lazy" decoding="async" />{children}</div>;
}
// The map is a third-party frame: it only loads when the section approaches the
// viewport, and waits for an explicit tap when the visitor asked to save data.
function VisitMap() {
  const ref = useRef<HTMLDivElement>(null);
  const limited = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || limited) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setLoad(true); observer.disconnect(); } }, { rootMargin: '350px 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [limited]);
  return <div className="visit-map" ref={ref}>
    <div className="map-frame" data-ready={ready}>
      {load && <iframe src={MAP_EMBED} title="Mapa da região da Kado Academia, no bairro Santa Augusta, em Criciúma" loading="lazy" referrerPolicy="no-referrer-when-downgrade" tabIndex={-1} onLoad={() => setReady(true)} />}
      {!load && limited && <button className="map-load" onClick={() => setLoad(true)}>Ver o mapa da região</button>}
      {!ready && !(limited && !load) && <span className="map-wait" aria-hidden="true">Carregando o mapa…</span>}
    </div>
    <div className="map-card"><p className="map-kicker">Santa Augusta · Criciúma, SC</p><address>Rua Wolmir Wosnievski, 226</address><a className="button button-dark" href={MAPS} target="_blank" rel="noopener noreferrer"><span>Abrir rota no Google Maps</span><Arrow diagonal /></a></div>
  </div>;
}
// Equipe conforme o carrossel do site oficial em 11/11/2026 (15 pessoas). Nome e cargo
// já vêm impressos em cada foto; a legenda abaixo fica só para leitores de tela.
const team = [
  { name: 'Ricardo', role: 'Gestor e proprietário', img: 'equipe-ricardo.webp' },
  { name: 'Ariadne', role: 'Coordenadora', img: 'equipe-ariadne.webp' },
  { name: 'Gabriel', role: 'Instrutor de Musculação, Cross Training e GAP', img: 'equipe-gabriel.webp' },
  { name: 'Julio', role: 'Instrutor de musculação', img: 'equipe-3597.webp' },
  { name: 'Rodrigo', role: 'Instrutor de musculação', img: 'equipe-3600.webp' },
  { name: 'Maria Julia', role: 'Instrutora de Ritmos', img: 'equipe-maria-julia.webp' },
  { name: 'Letícia', role: 'Médica generalista', img: 'equipe-leticia.webp' },
  { name: 'Ana Vitoria', role: 'Fisioterapeuta', img: 'equipe-1.webp' },
  { name: 'Evandro', role: 'Fisioterapeuta', img: 'equipe-3.webp' },
  { name: 'Ana Claudia', role: 'Nutricionista', img: 'equipe-2.webp' },
  { name: 'Rodrigo Rodrigues', role: 'Estagiário de musculação', img: 'equipe-rodrigo-rodrigues.webp' },
  { name: 'Elaine', role: 'Estagiária de musculação', img: 'equipe-elaine.webp' },
  { name: 'Leonardo', role: 'Estagiário', img: 'equipe-3602.webp' },
  { name: 'Gabriela', role: 'Consultora de vendas', img: 'equipe-3587.webp' },
  { name: 'Camila', role: 'Consultora de vendas', img: 'equipe-camila.webp' },
];

function App() {
  const reduced = useMotionPreference();
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const teamProgress = useRef<HTMLSpanElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [menu, setMenu] = useState(false);
  const [selected, setSelected] = useState(0);
  // Until the visitor picks a modality, contact stays neutral instead of assuming the default tab.
  const [chosen, setChosen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [teamPosition, setTeamPosition] = useState(1);
  const [teamEnd, setTeamEnd] = useState(false);
  const [filmOpen, setFilmOpen] = useState(false);
  const [floatingContact, setFloatingContact] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const heroContact = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end end'] });
  const { scrollYProgress: pageProgress } = useScroll();
  const active = modalities[selected];

  useEffect(() => {
    const section = heroRef.current, video = videoRef.current;
    if (!section || !video) return;
    const limited = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    let visible = true, alive = true;
    const syncVideo = () => {
      if (!visible || document.hidden || paused || filmOpen || reduced || limited) video.pause();
      else if (video.getAttribute('src')) void video.play().catch(() => { if (alive) setPaused(true); });
    };
    const observer = new IntersectionObserver(([e]) => { visible = e.isIntersecting; syncVideo(); }, { threshold: .01 });
    observer.observe(section);
    const load = window.setTimeout(() => {
      if (alive && !reduced && !limited) { if (!video.getAttribute('src')) video.src = media('kado-hero.mp4'); setVideoReady(true); syncVideo(); }
    }, 650);
    document.addEventListener('visibilitychange', syncVideo);
    syncVideo();
    return () => { alive = false; clearTimeout(load); observer.disconnect(); video.pause(); document.removeEventListener('visibilitychange', syncVideo); };
  }, [paused, reduced, filmOpen]);

  useEffect(() => {
    const contact = heroContact.current?.querySelector('.button'), footer = footerRef.current;
    if (!contact || !footer) return;
    let pastHero = false, atFooter = false;
    const visibleContacts = new Set<Element>();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === contact) pastHero = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        if (entry.target === footer) atFooter = entry.isIntersecting;
        else if (entry.isIntersecting) visibleContacts.add(entry.target);
        else visibleContacts.delete(entry.target);
      });
      setFloatingContact(pastHero && !atFooter && visibleContacts.size === 0);
    });
    document.querySelectorAll('main .button, .final-cta > a').forEach(el => observer.observe(el));
    observer.observe(footer);
    return () => observer.disconnect();
  }, [selected]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id);
    }, { rootMargin: '-20% 0px -55% 0px' });
    document.querySelectorAll('main > section[id]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menu) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const background = [...document.querySelectorAll<HTMLElement>('main, footer, .brand, .header-cta')];
    background.forEach(el => { el.inert = true; });
    const root = menuRef.current!;
    const links = root.querySelectorAll<HTMLAnchorElement>('a');
    links[0]?.focus();
    const key = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') { setMenu(false); menuButton.current?.focus(); }
      if (e.key === 'Tab') {
        const nodes: HTMLElement[] = [menuButton.current!, ...links];
        const index = nodes.indexOf(document.activeElement as HTMLElement);
        const next = e.shiftKey ? (index <= 0 ? nodes.length - 1 : index - 1) : (index + 1) % nodes.length;
        e.preventDefault(); nodes[next]?.focus();
      }
    };
    document.addEventListener('keydown', key);
    const resize = () => { if (matchMedia('(min-width: 901px)').matches) setMenu(false); };
    window.addEventListener('resize', resize, { passive: true });
    return () => { document.body.style.overflow = old; background.forEach(el => { el.inert = false; }); document.removeEventListener('keydown', key); window.removeEventListener('resize', resize); };
  }, [menu]);

  useEffect(() => {
    const track = teamRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => { frame = 0; const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4; const step = track.firstElementChild!.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap); setTeamPosition(end ? team.length : Math.min(team.length, Math.round(track.scrollLeft / step) + 1)); setTeamEnd(end); const range = track.scrollWidth - track.clientWidth; teamProgress.current?.style.setProperty('--w', String(Math.min(1, track.clientWidth / track.scrollWidth))); teamProgress.current?.style.setProperty('--p', String(range > 0 ? Math.min(1, track.scrollLeft / range) : 0)); };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    track.addEventListener('scroll', schedule, { passive: true });
    const resize = new ResizeObserver(schedule); resize.observe(track); update();
    let drag: { x: number; y: number; scroll: number; moving: boolean } | null = null;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      drag = { x: e.clientX, y: e.clientY, scroll: track.scrollLeft, moving: false };
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      if (Math.abs(e.clientY - drag.y) > Math.abs(e.clientX - drag.x) && !drag.moving) { drag = null; return; }
      if (Math.abs(e.clientX - drag.x) > 6) { drag.moving = true; track.setPointerCapture(e.pointerId); track.classList.add('dragging'); e.preventDefault(); track.scrollLeft = drag.scroll - (e.clientX - drag.x); }
    };
    const up = (e: PointerEvent) => { drag = null; track.classList.remove('dragging'); if (track.hasPointerCapture(e.pointerId)) track.releasePointerCapture(e.pointerId); };
    track.addEventListener('pointerdown', down); track.addEventListener('pointermove', move); track.addEventListener('pointerup', up); track.addEventListener('pointercancel', up);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); track.removeEventListener('scroll', schedule); track.removeEventListener('pointerdown', down); track.removeEventListener('pointermove', move); track.removeEventListener('pointerup', up); track.removeEventListener('pointercancel', up); };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (filmOpen) { dialog.showModal(); document.body.style.overflow = 'hidden'; }
    else if (dialog.open) { dialog.close(); document.body.style.overflow = ''; triggerRef.current?.focus(); }
    return () => { if (filmOpen) document.body.style.overflow = ''; };
  }, [filmOpen]);

  function tabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault(); const next = nextTab(index, event.key, modalities.length); setSelected(next); setChosen(true); tabs.current[next]?.focus();
  }
  function moveTeam(direction: number) {
    const track = teamRef.current!;
    track.scrollBy({ left: direction * (track.firstElementChild!.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap)), behavior: reduced ? 'instant' : 'smooth' });
  }

  return <LazyMotion features={domAnimation}><MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
    <a href="#conteudo" className="skip">Pular para o conteúdo</a>
    <div className="preview">Proposta de nova experiência Kado · prévia independente, sujeita à aprovação</div>
    <header className="header">
      <a className="brand" href="#inicio" aria-label="Kado Academia — início"><Logo /></a>
      <img className="author-mark" src={media('logo-bruno-luque.svg')} width="22" height="30" alt="" aria-hidden="true" />
      <nav className="desktop-nav" aria-label="Navegação principal">{[['Modalidades', 'modalidades'], ['A Kado', 'estrutura'], ['Equipe', 'equipe'], ['Como chegar', 'visita']].map(([label, id]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined}>{label}</a>)}</nav>
      <a href={whatsappUrl()} className="header-cta" target="_blank" rel="noopener noreferrer">Vamos treinar? <Arrow diagonal /></a>
      <button ref={menuButton} className="menu-toggle" aria-label={menu ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(v => !v)}><span /><span /></button>
      <m.div className="reading-line" aria-hidden="true" style={{ scaleX: pageProgress }} />
    </header>
    <AnimatePresence>{menu && <m.div ref={menuRef} className="mobile-menu" id="mobile-menu" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: reduced ? 0 : .3 }}><nav aria-label="Navegação móvel">{[['Modalidades', 'modalidades'], ['A Kado', 'estrutura'], ['Equipe', 'equipe'], ['Como chegar', 'visita']].map(([name, id]) => <a key={id} href={`#${id}`} onClick={() => { setMenu(false); menuButton.current?.focus(); }}>{name}<Arrow diagonal /></a>)}<CTA>Agendar minha aula</CTA></nav></m.div>}</AnimatePresence>

    <main id="conteudo">
      <m.section className="hero" id="inicio" ref={heroRef} aria-labelledby="hero-title" style={{ '--hero-p': reduced ? 0 : heroProgress } as MotionStyle}>
        <div className="hero-stage">
          <picture className="hero-picture"><source media="(max-width: 700px)" srcSet={media('hero-mobile.webp')} /><img src={media('hero-poster.webp')} width="1600" height="900" fetchPriority="high" alt="Treino real dentro da Kado Academia, em Criciúma." /></picture>
          <video ref={videoRef} className="hero-video" poster={media('hero-poster.webp')} muted playsInline loop preload="none" aria-hidden="true" />
          <div className="hero-shade" />
          <div className="hero-copy">
            <m.h1 id="hero-title" initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)', y: 25 }} animate={{ clipPath: 'inset(0)', y: 0 }} transition={{ duration: .85, ease: [.16, 1, .3, 1] }}>SEU PRÓXIMO<br /><span>MOVIMENTO.</span></m.h1>
            <div className="hero-bottom" ref={heroContact}><div><p>Começa aqui. Na Kado.</p><p className="hero-intro">Academia em Criciúma. Encontre seu treino,<br className="desktop-break" /> sua turma e um motivo para voltar.</p></div><CTA>Agendar minha aula</CTA></div>
          </div>
          <div className="hero-foot"><a href="#modalidades">Encontre seu ritmo <span className="scroll-line" aria-hidden="true" /></a><button className="video-toggle" onClick={event => { if (reduced || !videoReady) { triggerRef.current = event.currentTarget; setFilmOpen(true); } else setPaused(v => !v); }} aria-label={reduced || !videoReady ? 'Assistir ao vídeo da Kado' : paused ? 'Reproduzir vídeo de fundo' : 'Pausar vídeo de fundo'}><Play pause={!paused && !reduced && videoReady} /><span>{reduced || !videoReady ? 'Assistir ao' : paused ? 'Reproduzir' : 'Pausar'} vídeo</span></button><span>Santa Augusta · desde 2008</span></div>
          <div className="hero-curtain" aria-hidden="true"><span /><span /><div className="transition-word">KADO</div></div>
        </div>
      </m.section>

      <section className="manifesto" aria-labelledby="manifesto-title">
        <div className="manifesto-copy"><h2 id="manifesto-title">O TREINO É SEU.<br />A ENERGIA<br />É NOSSA.</h2><p>Na Kado, ninguém é só “aluno”. O treino divide espaço com conversa, orientação e gente que faz parte da rotina.</p><a href="#modalidades" className="text-link">Tem um ritmo para você <Arrow diagonal /></a></div>
        <figure className="community-photo"><SceneImage file="comunidade.webp" alt="Um aluno treinando com pesos no ambiente da Kado, em fotografia do Instagram oficial." width={1080} height={1350} /><figcaption>Gente real. A energia da Kado.</figcaption></figure>
        <span className="manifesto-word" aria-hidden="true">KADO</span>
      </section>

      <section className="modalities section" id="modalidades" aria-labelledby="modalities-title">
        <div className="section-heading"><h2 id="modalities-title">QUAL É<br />O SEU RITMO?</h2><p>Seis modalidades. Diferentes formas de começar.<br />Explore e converse com a equipe sobre a sua próxima aula.</p></div>
        <div className="mod-layout"><div role="tablist" aria-label="Modalidades da Kado" className="mod-tabs">{modalities.map((item, index) => <button key={item.id} id={`tab-${item.id}`} role="tab" aria-selected={index === selected} aria-controls="modality-panel" tabIndex={index === selected ? 0 : -1} ref={el => { tabs.current[index] = el; }} onClick={() => { setSelected(index); setChosen(true); }} onKeyDown={event => tabKey(event, index)}>{selected === index && <m.span className="tab-selection" layoutId="modality-selection" transition={{ type: 'spring', bounce: 0, duration: reduced ? 0 : .4 }} aria-hidden="true" />}<span>{item.name}</span><Arrow diagonal /></button>)}</div>
          <div className="mod-panel-wrap" id="modality-panel" role="tabpanel" aria-labelledby={`tab-${active.id}`} tabIndex={0}><AnimatePresence mode="wait" initial={false}><m.div className="mod-panel" key={active.id} initial={reduced ? false : { opacity: .6, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: reduced ? 0 : .18 }}><p className="mod-meta"><span>{String(selected + 1).padStart(2, '0')} / {String(modalities.length).padStart(2, '0')}</span><span>{active.group}</span></p><h3>{active.focus}</h3><p>{active.text}</p><p className="mod-detail">{active.detail}</p><CTA subject={active.name}>Quero conhecer {active.name}</CTA><span className="mod-backdrop" aria-hidden="true">{String(selected + 1).padStart(2, '0')}</span></m.div></AnimatePresence></div>
        </div>
      </section>

      <section className="structure section" id="estrutura" aria-labelledby="structure-title">
        <div className="section-heading"><h2 id="structure-title">VEM VER<br />DE PERTO.</h2><div><p>Espaço para treinar. Equipe para orientar.<br />Conheça a academia antes da primeira aula.</p><a className="text-link" href={MAPS} target="_blank" rel="noopener noreferrer">Traçar rota para a Kado <Arrow diagonal /></a></div></div>
        <SceneImage className="structure-film" file="estrutura-clara.webp" width={1920} height={1080} alt="Ambiente e equipamentos de musculação da Kado, em quadro do vídeo oficial."><button className="film-play" onClick={event => { triggerRef.current = event.currentTarget; setFilmOpen(true); }}><Play /><span>Um pouco da Kado<br /><small>Assistir ao vídeo</small></span></button><span className="film-caption">Imagens da nossa academia</span></SceneImage>
        <div className="structure-details"><div><h3>Treine com orientação.</h3><p>Instrutores, personal trainers e profissionais de saúde fazem parte da equipe. Pergunte como funciona cada atendimento.</p></div><div><h3>Faça caber na rotina.</h3><p>Funcionamento desde as 5h durante a semana, com atendimento também aos sábados.</p></div><div><h3>Encontre a sua turma.</h3><p>Da musculação às aulas coletivas e ao Pilates. Você não precisa escolher sozinho.</p></div></div>
      </section>

      <section className="team-section section" id="equipe" aria-labelledby="team-title">
        <div className="section-heading"><h2 id="team-title">GENTE QUE<br />TREINA JUNTO.</h2><div><p>Quinze pessoas entre gestão, aulas, saúde e atendimento.<br />Cada um com seu trabalho. Todos no seu caminho.</p><div className="carousel-controls"><span aria-live="polite">{String(teamPosition).padStart(2, '0')} / {String(team.length).padStart(2, '0')}</span><button onClick={() => moveTeam(-1)} disabled={teamPosition === 1} aria-label="Profissional anterior"><Arrow /></button><button onClick={() => moveTeam(1)} disabled={teamEnd} aria-label="Próximo profissional"><Arrow /></button></div></div></div>
        <div className="team-track" ref={teamRef} role="region" aria-roledescription="carrossel" aria-label="Equipe da Kado" tabIndex={0} onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); moveTeam(e.key === 'ArrowRight' ? 1 : -1); } if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); teamRef.current!.scrollTo({ left: e.key === 'Home' ? 0 : teamRef.current!.scrollWidth, behavior: reduced ? 'instant' : 'smooth' }); } }}>
          {team.map((person, i) => <figure key={person.name} className="team-person" role="group" aria-label={`${i + 1} de ${team.length}: ${person.name}, ${person.role}`}><img src={media(person.img)} width="406" height="434" alt={`${person.name}, ${person.role}, em fotografia da equipe no site oficial.`} loading="lazy" draggable={false} /><figcaption><span>{person.name}</span><small>{person.role}</small></figcaption></figure>)}
        </div>
        <div className="team-progress" aria-hidden="true"><span ref={teamProgress} /></div>
      </section>

      <section className="visit section" id="visita" aria-labelledby="visit-title">
        <div className="visit-main"><h2 id="visit-title">A PRÓXIMA<br />PARADA<br />É A KADO.</h2><p>Veja a região no mapa e trace a rota quando quiser.</p></div>
        <VisitMap />
        <div className="visit-info"><h3>Um horário para você.</h3><dl>{hours.map(([day, time]) => <div key={day}><dt>{day}</dt><dd>{time}</dd></div>)}</dl><p>Consulte os horários das turmas e o funcionamento em feriados com a equipe.</p><CTA>Combinar minha primeira aula</CTA></div>
      </section>

      <section className="questions section" aria-labelledby="questions-title"><h2 id="questions-title">ANTES DE<br />COMEÇAR.</h2><div>{[
        ['Preciso já ter experiência para começar?', 'Você pode conversar com a equipe mesmo que esteja começando. Ela orienta sobre as modalidades e o próximo passo para conhecer a academia.'],
        ['Como agendo uma aula?', 'Pelo WhatsApp oficial. Informe a modalidade que quer conhecer e consulte a disponibilidade. A mensagem abre uma conversa; não confirma um horário automaticamente.'],
        ['Como sei os horários das modalidades?', 'Peça à equipe a programação atual das aulas. Horários de funcionamento da academia e horários de cada turma são informações diferentes.'],
        ['A Kado oferece aula experimental?', 'O site oficial divulga uma aula experimental. Consulte diretamente a equipe para confirmar as condições atuais, o agendamento e quais modalidades participam.'],
      ].map(([q, answer]) => <details key={q}><summary>{q}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="1.5" /></svg></summary><p>{answer}</p></details>)}</div></section>

      <section className="final-cta"><p>O primeiro movimento é seu.</p><a href={whatsappUrl(chosen ? active.name : undefined)} target="_blank" rel="noopener noreferrer">BORA<br />TREINAR?<Arrow diagonal /><small>Chamar no WhatsApp</small></a><span>{chosen ? `A conversa já começa falando de ${active.name}.` : 'Abre uma conversa no WhatsApp oficial da Kado.'}</span></section>
    </main>
    <footer ref={footerRef}><div className="footer-top"><a href="#inicio" aria-label="Kado Academia — voltar ao início"><Logo /></a><p>Sua melhor versão será<br />construída aqui.</p><div><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram <Arrow diagonal /></a><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">WhatsApp <Arrow diagonal /></a><a href="https://kadoacademia.com.br/" target="_blank" rel="noopener noreferrer">Site atual <Arrow diagonal /></a></div></div><div className="footer-note"><span>Prévia de repaginação · 2026</span><p>Proposta independente de Bruno Luque. Fotos e informações de fontes oficiais, sujeitas à aprovação da academia e dos direitos de imagem. Não é o site oficial.</p></div></footer>
    <AnimatePresence>{floatingContact && !menu && !filmOpen && <m.a initial={reduced ? false : { y: 90 }} animate={{ y: 0 }} exit={{ y: reduced ? 0 : 90, opacity: 0 }} transition={{ type: 'spring', bounce: 0, duration: .35 }} className="mobile-cta" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Vamos treinar? <Arrow diagonal /></m.a>}</AnimatePresence>
    <dialog ref={dialogRef} className="film-dialog" aria-label="Vídeo da Kado Academia" onCancel={e => { e.preventDefault(); setFilmOpen(false); }} onClick={e => { if (e.target === e.currentTarget) setFilmOpen(false); }}><button aria-label="Fechar vídeo" onClick={() => setFilmOpen(false)}>Fechar <span aria-hidden="true">×</span></button>{filmOpen && <video src={media('kado-hero.mp4')} controls autoPlay playsInline preload="metadata" />}</dialog>
  </MotionConfig></LazyMotion>;
}

const root = import.meta.hot?.data.root ?? createRoot(document.getElementById('root')!);
if (import.meta.hot) import.meta.hot.data.root = root;
root.render(<App />);
