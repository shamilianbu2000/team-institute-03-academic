(function () {
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

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
    var y=window.scrollY+120,cur=pairs[0];
    pairs.forEach(function(p){if(p.s.offsetTop<=y)cur=p});
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
