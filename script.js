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
