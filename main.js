(function () {
  "use strict";

  var SITE = window.SITE || {};
  var PROJECTS = window.PROJECTS || [];
  var doc = document;
  doc.documentElement.classList.add("js");

  function el(tag, cls, text) {
    var n = doc.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function $(sel) { return doc.querySelector(sel); }

  /* ---------- Brand, footer, availability ---------- */
  var brand = SITE.brand || "Your Name";
  doc.querySelectorAll('[data-site="brand"]').forEach(function (n) { n.textContent = brand; });
  $("#year").textContent = SITE.year || new Date().getFullYear();
  $("#legal").textContent = SITE.legalName || brand;

  if (SITE.siteUrl) {
    $("#canonical").setAttribute("href", SITE.siteUrl);
    var og = doc.createElement("meta");
    og.setAttribute("property", "og:url");
    og.setAttribute("content", SITE.siteUrl);
    doc.head.appendChild(og);
  } else {
    var c = $("#canonical"); if (c) c.remove();
  }

  if (SITE.availability && SITE.availability.enabled) {
    $("#availText").textContent = SITE.availability.text || "Available for new projects";
    $("#availability").hidden = false;
  }

  /* ---------- Projects ---------- */
  function mockPreview(theme, layout) {
    var t = theme || {};
    var m = el("div", "mock mock--" + (layout || "split"));
    m.style.background = t.bg || "#272b2f";
    m.style.setProperty("--m-ink", t.ink || "#f2efe8");
    m.style.setProperty("--m-accent", t.accent || "#ff6f4a");
    m.setAttribute("aria-hidden", "true");

    var bar = el("div", "mock__bar");
    bar.appendChild(el("div", "mock__logo"));
    var nav = el("div", "mock__nav");
    for (var i = 0; i < 3; i++) nav.appendChild(el("i"));
    bar.appendChild(nav);
    m.appendChild(bar);

    var main = el("div", "mock__main");
    if (layout === "cards") {
      var top = el("div", "mock__stack");
      var h = el("div", "mock__h"); h.style.width = "60%";
      var p = el("div", "mock__p"); p.style.width = "80%";
      top.appendChild(h); top.appendChild(p);
      main.appendChild(top);
      var row = el("div", "mock__row");
      for (var j = 0; j < 3; j++) row.appendChild(el("div", "mock__cell"));
      main.appendChild(row);
    } else if (layout === "centered") {
      main.appendChild(el("div", "mock__h"));
      main.appendChild(el("div", "mock__p"));
      main.appendChild(el("div", "mock__btn"));
    } else {
      var left = el("div", "mock__stack");
      var h2 = el("div", "mock__h"); h2.style.width = "90%";
      var h3 = el("div", "mock__h"); h3.style.width = "65%";
      var p2 = el("div", "mock__p");
      var p3 = el("div", "mock__p"); p3.style.width = "70%";
      left.appendChild(h2); left.appendChild(h3); left.appendChild(p2); left.appendChild(p3);
      left.appendChild(el("div", "mock__btn"));
      main.appendChild(left);
      main.appendChild(el("div", "mock__img"));
    }
    m.appendChild(main);
    return m;
  }

  function buildMedia(p) {
    var media = el("div", "card__media");
    var showMock = function () {
      media.innerHTML = "";
      media.appendChild(mockPreview(p.theme, p.theme && p.theme.layout));
      media.appendChild(el("span", "card__badge", "Illustrative preview"));
    };
    if (p.image) {
      var img = new Image();
      img.alt = p.name + " website preview";
      img.loading = "lazy";
      img.decoding = "async";
      img.onerror = showMock; // polished fallback instead of a broken icon
      img.src = p.image;
      media.appendChild(img);
    } else {
      showMock();
    }
    return media;
  }

  var grid = $("#projectGrid");
  PROJECTS.filter(function (p) { return p.featured !== false; }).forEach(function (p) {
    var card = el("article", "card reveal");
    card.appendChild(buildMedia(p));

    var body = el("div", "card__body");
    var meta = el("div", "card__meta");
    meta.appendChild(el("p", "card__cat", p.category));
    if (p.status) meta.appendChild(el("span", "card__status", p.status));
    body.appendChild(meta);
    body.appendChild(el("h3", "card__title", p.name));
    body.appendChild(el("p", "card__desc", p.description));

    if (p.tags && p.tags.length) {
      var tags = el("ul", "tags");
      p.tags.forEach(function (t) { tags.appendChild(el("li", null, t)); });
      body.appendChild(tags);
    }

    var actions = el("div", "card__actions");
    var a = el("a", "btn btn--primary", "View Live Project");
    a.href = p.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", "View Live Project: " + p.name + " (opens in a new tab)");
    actions.appendChild(a);
    if (p.github) {
      var g = el("a", "card__link", "Source code");
      g.href = p.github; g.target = "_blank"; g.rel = "noopener noreferrer";
      actions.appendChild(g);
    }
    body.appendChild(actions);
    card.appendChild(body);
    grid.appendChild(card);
  });

  /* ---------- Stack ---------- */
  var stackList = $("#stackList");
  (SITE.stack || []).forEach(function (s) {
    var li = el("li");
    li.appendChild(el("strong", null, s.name));
    if (s.note) li.appendChild(el("span", null, s.note));
    stackList.appendChild(li);
  });

  /* ---------- Contact links ---------- */
  var C = SITE.contact || {};
  var links = $("#contactLinks");
  var footerSocial = $("#footerSocial");

  function addContact(label, href, placeholderMsg, external) {
    var li = el("li");
    if (href) {
      var a = el("a", null, label);
      a.href = href;
      if (external) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
      li.appendChild(a);
    } else {
      li.appendChild(el("span", "is-placeholder", label + ": " + placeholderMsg));
    }
    links.appendChild(li);
  }
  var email = (C.email || "").trim();
  var wa = (C.whatsapp || "").replace(/\D/g, "");
  var gh = (C.github || "").trim();

  addContact(email ? "Email: " + email : "Email", email ? "mailto:" + email : "", "add your email in src/data/site.js");
  // WhatsApp and GitHub are only shown once they are filled in site.js.
  if (wa) {
    addContact("WhatsApp", "https://wa.me/" + wa + "?text=" + encodeURIComponent(C.whatsappMessage || ""), "", true);
  }
  if (gh) addContact("GitHub", gh, "", true);
  (C.social || []).forEach(function (s) { if (s && s.url) addContact(s.label || s.url, s.url, "", true); });

  // Footer: only configured links
  var footerItems = [];
  if (email) footerItems.push({ label: "Email", url: "mailto:" + email });
  if (wa) footerItems.push({ label: "WhatsApp", url: "https://wa.me/" + wa });
  if (gh) footerItems.push({ label: "GitHub", url: gh });
  (C.social || []).forEach(function (s) { if (s && s.url) footerItems.push({ label: s.label || s.url, url: s.url }); });
  footerItems.forEach(function (f) {
    var li = el("li"); var a = el("a", null, f.label);
    a.href = f.url;
    if (f.url.indexOf("mailto:") !== 0) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
    li.appendChild(a); footerSocial.appendChild(li);
  });

  /* ---------- Mobile menu ---------- */
  var btn = $("#menuBtn"), nav = $("#nav"), header = $("#header");
  function setMenu(open) {
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
    doc.body.style.overflow = open ? "hidden" : "";
  }
  btn.addEventListener("click", function () { setMenu(btn.getAttribute("aria-expanded") !== "true"); });
  nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  doc.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") { setMenu(false); btn.focus(); }
  });
  window.matchMedia("(min-width: 821px)").addEventListener("change", function (e) { if (e.matches) setMenu(false); });

  // Keep menu links out of the tab order while the mobile menu is closed.
  var mq = window.matchMedia("(max-width: 820px)");
  function syncNavFocus() {
    var hide = mq.matches && btn.getAttribute("aria-expanded") !== "true";
    nav.querySelectorAll("a").forEach(function (a) { a.tabIndex = hide ? -1 : 0; });
  }
  new MutationObserver(syncNavFocus).observe(btn, { attributes: true, attributeFilter: ["aria-expanded"] });
  mq.addEventListener("change", syncNavFocus);
  syncNavFocus();

  /* ---------- Header state + active link ---------- */
  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window) {
    var navLinks = {};
    nav.querySelectorAll("a").forEach(function (a) { navLinks[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && navLinks[en.target.id]) {
          Object.keys(navLinks).forEach(function (k) { navLinks[k].classList.remove("is-active"); });
          navLinks[en.target.id].classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(navLinks).forEach(function (id) { var s = doc.getElementById(id); if (s) spy.observe(s); });

    /* ---------- Reveal ---------- */
    var rev = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); rev.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    doc.querySelectorAll(".reveal, .process, .service").forEach(function (n) {
      if (!n.classList.contains("reveal") && n.classList.contains("service")) n.classList.add("reveal");
      rev.observe(n);
    });
  } else {
    doc.querySelectorAll(".reveal").forEach(function (n) { n.classList.add("is-in"); });
    doc.querySelectorAll(".process").forEach(function (n) { n.classList.add("is-in"); });
  }

  /* ---------- Contact form ---------- */
  var form = $("#contactForm"), status = $("#formStatus"), submit = $("#submitBtn");

  function setErr(input, msg) {
    var field = input.closest(".field");
    field.classList.toggle("has-error", !!msg);
    field.querySelector(".field__err").textContent = msg || "";
    input.setAttribute("aria-invalid", msg ? "true" : "false");
  }
  function validate() {
    var ok = true, first = null;
    var name = form.elements.name, mail = form.elements.email, msg = form.elements.message;
    var checks = [
      [name, name.value.trim().length < 2, "Enter your name."],
      [mail, !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail.value.trim()), "Enter a valid email address."],
      [msg, msg.value.trim().length < 10, "Write a message of at least 10 characters."]
    ];
    checks.forEach(function (c) {
      setErr(c[0], c[1] ? c[2] : "");
      if (c[1]) { ok = false; if (!first) first = c[0]; }
    });
    if (first) first.focus();
    return ok;
  }
  function say(cls, text) { status.className = "form__status " + cls; status.textContent = text; }

  ["name", "email", "message"].forEach(function (n) {
    form.elements[n].addEventListener("input", function () { setErr(form.elements[n], ""); });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    say("", "");
    if (form.elements._gotcha.value) return; // bot
    if (!validate()) return;

    var endpoint = ((SITE.form || {}).endpoint || "").trim();
    if (!endpoint) {
      status.className = "form__status is-info";
      status.textContent = "";
      status.appendChild(doc.createTextNode("Form delivery is not set up yet, so this message was not sent."));
      if (email) {
        status.appendChild(doc.createTextNode(" Please email "));
        var a = el("a", null, email); a.href = "mailto:" + email;
        status.appendChild(a);
        status.appendChild(doc.createTextNode(" instead."));
      }
      return;
    }

    submit.disabled = true;
    submit.textContent = "Sending…";
    fetch(endpoint, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        message: form.elements.message.value.trim()
      })
    }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      form.reset();
      say("is-ok", "Thanks, your message has been sent. I'll reply by email.");
    }).catch(function () {
      say("is-err", "Your message could not be sent. Check your connection and try again" + (email ? ", or email " + email + " directly." : "."));
    }).then(function () {
      submit.disabled = false;
      submit.textContent = "Send message";
    });
  });
})();
