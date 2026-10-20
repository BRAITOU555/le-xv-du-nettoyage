(function(){
  var cards=document.querySelectorAll('.pl-card');if(!cards.length)return;
  var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('pl-js');
  cards.forEach(function(c,i){var n=document.createElement('span');n.className='pl-n';n.dataset.count=(i%6)+1;n.textContent=('0'+((i%6)+1)).slice(-2);c.insertBefore(n,c.firstChild);c.style.setProperty('--i',i%6)});
  function count(el){var t=+el.dataset.count,t0=null;if(rm)return;(function f(t1){if(!t0)t0=t1;var k=Math.min((t1-t0)/650,1);el.textContent=('0'+Math.max(1,Math.round(t*k))).slice(-2);if(k<1)requestAnimationFrame(f)})(performance.now())}
  if(!('IntersectionObserver' in window)||rm){cards.forEach(function(c){c.classList.add('pl-in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('pl-in');count(e.target.querySelector('.pl-n'));io.unobserve(e.target)}})},{threshold:.25});
  cards.forEach(function(c){io.observe(c)});
})();
