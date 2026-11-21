(function () {
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  var hdr = document.querySelector('.site-header');
  function sheetH() { var r = hdr.getBoundingClientRect(); var bw = parseFloat(getComputedStyle(hdr).borderBottomWidth) || 0; nav.style.setProperty('--sheet-h', Math.max(200, window.innerHeight - (r.bottom - bw)) + 'px'); }
  function closeNav() { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); document.body.classList.remove('menu-open'); }
  btn.addEventListener('click', function () {
    var open = !nav.classList.contains('open');
    if (open) { sheetH(); }
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('menu-open', open);
  });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) closeNav(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { closeNav(); btn.focus(); } });
  document.addEventListener('click', function (e) { if (nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)) closeNav(); });
  window.addEventListener('resize', function () { if (window.innerWidth > 1180) closeNav(); else if (nav.classList.contains('open')) sheetH(); });

  var form = document.getElementById('enqForm');
  var err = document.getElementById('formErr');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.name.value.trim();
    var phone = form.phone.value.trim();
    if (!name || !phone) { err.hidden = false; return; }
    err.hidden = true;
    var text = 'Hello Team Institute, I would like admission details.\n' +
      'Student: ' + name + '\nPhone: ' + phone + '\nProgramme: ' + form.course.value +
      (form.msg.value.trim() ? '\nMessage: ' + form.msg.value.trim() : '');
    window.open('https://wa.me/916381466472?text=' + encodeURIComponent(text), '_blank', 'noopener');
  });

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();

/* scroll-spy: highlight the nav link of the section in view */
(function(){
  var links=[].slice.call(document.querySelectorAll('#nav a')).filter(function(a){return /^#.+/.test(a.getAttribute('href'))&&!a.classList.contains('nav-cta')});
  var pairs=links.map(function(a){return {a:a,s:document.getElementById(a.getAttribute('href').slice(1))}}).filter(function(p){return p.s});
  function update(){
    var h=document.querySelector('.site-header'),y=window.scrollY+(h?h.offsetHeight:80)+40,cur=pairs[0];
    pairs.forEach(function(p){if(p.s.getBoundingClientRect().top+window.scrollY<=y)cur=p});
    if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4)cur=pairs[pairs.length-1];
    pairs.forEach(function(p){var on=p===cur;p.a.classList.toggle('active',on);if(on)p.a.setAttribute('aria-current','true');else p.a.removeAttribute('aria-current')});
  }
  window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);update();
})();

/* hide floating WhatsApp while primary buttons/form are on screen so it never covers them */
(function(){
  var wa=document.querySelector('.wa-float');
  if(!wa||!('IntersectionObserver' in window))return;
  var els=[].slice.call(document.querySelectorAll('.hero-actions,#enqForm button[type=submit],.sidebar .btn'));
  var vis=new Set();
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting)vis.add(e.target);else vis.delete(e.target)});
    wa.classList.toggle('wa-hide',vis.size>0&&window.innerWidth<=980);
  });
  els.forEach(function(e){io.observe(e)});
})();
