(() => {
  const blocks = document.querySelectorAll('.detail-step, .editorial-row, .accompaniment article, .gallery-comparison, .coverage-list article');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('reveal-pending');
      entry.target.classList.add('reveal-shown');
      observer.unobserve(entry.target);
    });
  }, { threshold: .06, rootMargin: '0px 0px 24px 0px' });
  blocks.forEach(el => {
    if (el.getBoundingClientRect().top <= innerHeight) return;
    el.classList.add('reveal-pending');
    observer.observe(el);
  });
})();
