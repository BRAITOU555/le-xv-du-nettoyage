(() => {
  const root = document.querySelector('.dg');
  if (!root) return;
  root.classList.remove('dg-nojs');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Apparition au défilement */
  const targets = root.querySelectorAll('.dg-rv, .dg-card, .dg-h2');
  if ('IntersectionObserver' in window && !reduce) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('dg-in');
      io.unobserve(e.target);
    }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach(t => io.observe(t));
  } else targets.forEach(t => t.classList.add('dg-in'));

  /* Compteurs */
  const counters = root.querySelectorAll('[data-count]');
  const run = el => {
    const end = +el.dataset.count, dur = 1400, t0 = performance.now();
    const tick = t => {
      const p = Math.min((t - t0) / dur, 1), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
      el.textContent = v;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window && !reduce) {
    const co = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { run(e.target); co.unobserve(e.target); }
    }), { threshold: .6 });
    counters.forEach(c => { c.textContent = '0'; co.observe(c); });
  }

  /* Curseurs avant / après */
  const setP = (ba, v) => ba.style.setProperty('--p', v + '%');
  root.querySelectorAll('.dg-ba').forEach(ba => {
    const input = ba.querySelector('input');
    const start = +input.value;
    setP(ba, start);
    input.addEventListener('input', () => { ba.dataset.touched = '1'; setP(ba, input.value); });
    ba.addEventListener('pointerdown', () => ba.classList.add('drag'));
    addEventListener('pointerup', () => ba.classList.remove('drag'));
    if (ba.dataset.sweep && !reduce && 'IntersectionObserver' in window) {
      const so = new IntersectionObserver(es => es.forEach(e => {
        if (!e.isIntersecting) return;
        so.disconnect();
        const t0 = performance.now() + 900;
        const step = t => {
          if (ba.dataset.touched) return;
          const k = Math.min(Math.max((t - t0) / 2600, 0), 1);
          const v = 50 - 40 * Math.sin(k * Math.PI * 2) * (1 - k * .3);
          input.value = v; setP(ba, v);
          if (k < 1) requestAnimationFrame(step); else { input.value = 50; setP(ba, 50); }
        };
        requestAnimationFrame(step);
      }), { threshold: .5 });
      so.observe(ba);
    }
  });

  /* Onglets des pièces */
  const rooms = {
    salon:   { img: 'salon',          ar: '800/686', bs: '200% 100%', py: '0%' },
    cuisine: { img: 'cuisine',        ar: '1/1',     bs: '200% auto', py: '55%' },
    studio:  { img: 'studio',         ar: '800/667', bs: '200% 100%', py: '0%' },
    chambre: { img: 'chambre',        ar: '800/667', bs: '200% 100%', py: '0%' },
    cave:    { img: 'cave',           ar: '800/596', bs: '200% 100%', py: '0%' },
    sdb:     { img: 'salle-de-bain',  ar: '1/1',     bs: '200% auto', py: '50%' }
  };
  const vis = root.querySelector('.dg-room-vis');
  if (vis) {
    const ba = vis.querySelector('.dg-ba'), base = vis.dataset.base, input = ba.querySelector('input');
    root.querySelectorAll('.dg-tabs button').forEach(b => b.addEventListener('click', () => {
      const r = rooms[b.dataset.room]; if (!r) return;
      root.querySelectorAll('.dg-tabs button').forEach(x => x.setAttribute('aria-selected', x === b));
      vis.classList.add('sw');
      setTimeout(() => {
        const url = `url("${base}avant-apres-${r.img}.webp")`;
        ba.style.setProperty('--ar', r.ar); ba.style.setProperty('--bs', r.bs); ba.style.setProperty('--py', r.py);
        ba.querySelectorAll('.ly').forEach(l => l.style.backgroundImage = url);
        ba.setAttribute('aria-label', 'Avant et après : ' + b.textContent);
        input.value = 50; setP(ba, 50);
        vis.classList.remove('sw');
      }, reduce ? 0 : 320);
    }));
  }

  /* Cartes qui s'empilent : la carte du dessous se tasse quand la suivante arrive */
  const cards = [...root.querySelectorAll('.dg-card')];
  if (cards.length && !reduce && false) {
    let raf = 0;
    const upd = () => {
      raf = 0;
      cards.forEach((c, i) => {
        const nx = cards[i + 1];
        if (!nx) return;
        const gap = nx.getBoundingClientRect().top - c.getBoundingClientRect().top;
        const h = c.offsetHeight;
        const k = Math.min(Math.max(1 - gap / h, 0), 1);
        c.style.transform = `scale(${1 - k * .06})`;
        c.style.filter = `brightness(${1 - k * .12})`;
      });
    };
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true });
    upd();
  }
})();
