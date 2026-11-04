/* Ahmad Kholil Ahya Ainul Yaqin: Creative Portfolio
   Vanilla JS, no dependencies. */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector(".menu-toggle");

  /* ---------- Header: solid after scroll, hide on scroll down ---------- */
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle("is-solid", y > 24);
    if (!nav.classList.contains("is-open")) {
      header.classList.toggle("is-hidden", y > lastY && y > 240);
    }
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
    document.body.style.overflow = open ? "hidden" : "";
  }
  toggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("is-open"));
  });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) setMenu(false);
  });
  window.matchMedia("(min-width: 900px)").addEventListener("change", function (e) {
    if (e.matches) setMenu(false);
  });

  /* ---------- Current section in nav ---------- */
  var links = Array.prototype.slice.call(nav.querySelectorAll("a"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.toggleAttribute("aria-current", a.getAttribute("href") === "#" + entry.target.id);
          if (a.hasAttribute("aria-current")) a.setAttribute("aria-current", "true");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["about", "experience", "portfolio", "contact"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  /* ---------- Lightbox ---------- */
  var box = document.getElementById("lightbox");
  var imgEl = box.querySelector(".lightbox__img");
  var capEl = box.querySelector(".lightbox__caption");
  var srcEl = box.querySelector(".lightbox__source");
  var items = [];
  var index = 0;
  var opener = null;
  var touchX = null;

  function show(i) {
    index = (i + items.length) % items.length;
    var a = items[index];
    var thumb = a.querySelector("img");
    imgEl.src = a.getAttribute("href");
    imgEl.alt = thumb ? thumb.alt : "";
    capEl.textContent = a.dataset.caption + "  ·  " + (index + 1) + " / " + items.length;
    var ig = a.dataset.source;
    if (ig) { srcEl.href = ig; srcEl.hidden = false; } else { srcEl.hidden = true; }
    // warm the neighbours
    [index + 1, index - 1].forEach(function (n) {
      var next = items[(n + items.length) % items.length];
      if (next) new Image().src = next.getAttribute("href");
    });
  }

  function open(anchor) {
    var gallery = anchor.closest("[data-gallery]");
    items = Array.prototype.slice.call(gallery.querySelectorAll("a[data-caption]"));
    opener = anchor;
    show(items.indexOf(anchor));
    box.classList.add("is-open");
    box.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    box.querySelector(".lightbox__close").focus();
  }

  function close() {
    box.classList.remove("is-open");
    box.setAttribute("aria-hidden", "true");
    imgEl.removeAttribute("src");
    document.body.style.overflow = "";
    if (opener) opener.focus();
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-caption]");
    if (a && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      open(a);
    }
  });
  box.querySelector(".lightbox__close").addEventListener("click", close);
  box.querySelector(".lightbox__prev").addEventListener("click", function () { show(index - 1); });
  box.querySelector(".lightbox__next").addEventListener("click", function () { show(index + 1); });
  box.querySelector(".lightbox__stage").addEventListener("click", function (e) {
    if (e.target === this) close();
  });
  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") show(index + 1);
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "Tab") {
      var f = box.querySelectorAll("button, a[href]:not([hidden])");
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  box.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    touchX = null;
  });
})();
