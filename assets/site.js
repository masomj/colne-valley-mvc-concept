(function () {
  'use strict';

  /* Mobile menu: under 700px the nav sits behind the Menu button. */
  var toggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var mq = window.matchMedia('(max-width: 699.98px)');
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true' && mq.matches) {
        setOpen(false);
        toggle.focus();
      }
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && mq.matches) setOpen(false);
    });
    var reset = function () { if (!mq.matches) setOpen(false); };
    if (mq.addEventListener) mq.addEventListener('change', reset); else mq.addListener(reset);
  }

  /* "Hear the Choir" sample toggles: visual only, no real audio. One at a time. */
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.sample-btn'));
  function setSample(btn, on) {
    var title = btn.getAttribute('data-title');
    btn.setAttribute('data-playing', on ? 'true' : 'false');
    btn.setAttribute('aria-label', (on ? 'Pause sample: ' : 'Play sample: ') + title);
    var bar = btn.closest('.sample').querySelector('.progress');
    if (bar) bar.hidden = !on;
  }
  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var turnOn = btn.getAttribute('data-playing') !== 'true';
      buttons.forEach(function (b) { setSample(b, false); });
      if (turnOn) setSample(btn, true);
    });
  });
})();
