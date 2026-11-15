// SI disclosure: written with the help of Claude (AI).

// ----- Starfield background -----
(function () {
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let stars = [];

  function setup() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        v: Math.random() * 0.25 + 0.05
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    const t = Date.now() / 900;
    stars.forEach(function (s) {
      if (!reduce) {
        s.y += s.v;
        if (s.y > canvas.height) s.y = 0;
      }
      ctx.globalAlpha = 0.35 + 0.65 * Math.abs(Math.sin(t + s.x));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
    if (!reduce) requestAnimationFrame(draw);
  }

  window.addEventListener("resize", function () {
    setup();
    if (reduce) draw();
  });
  setup();
  draw();
})();

// ----- Typewriter opening -----
(function () {
  const lines = [
    "Somewhere out there, a robot is still waiting for a message.",
    "Others went quiet long ago.",
    "None of them are forgotten."
  ];
  const el = document.getElementById("typewriter");
  let li = 0;
  let ci = 0;

  function type() {
    if (li >= lines.length) return;
    const line = lines[li];
    if (ci <= line.length) {
      el.textContent = line.slice(0, ci);
      ci++;
      setTimeout(type, 45);
    } else {
      setTimeout(function () {
        li++;
        ci = 0;
        if (li < lines.length) type();
      }, 1400);
    }
  }
  type();
})();

// ----- Chapters with robot cards -----
function buildChapter(zone) {
  const info = chapterText[zone];
  const holder = document.getElementById(info.target);
  holder.innerHTML =
    '<div class="chapter-head reveal"><h2>' + info.title + "</h2><p>" + info.text + "</p></div>" +
    '<div class="cards"></div>';
  const cards = holder.querySelector(".cards");

  hardware
    .filter(function (h) { return h.zone === zone; })
    .forEach(function (h) {
      const card = document.createElement("article");
      card.className = "card reveal";
      const statusText = h.status === "talking" ? "Still talking to Earth" : "Silent now";
      card.innerHTML =
        '<div class="icon">' + h.icon + "</div>" +
        "<h3>" + h.name + "</h3>" +
        '<span class="badge ' + h.status + '">' + statusText + "</span>" +
        '<p class="meta">' + h.where + "<br>" + h.when + "</p>" +
        '<div class="bubble">' + h.voice + "</div>" +
        '<button class="more">What did I discover?</button>' +
        '<div class="extra">' +
        '<p><span class="label">Science it made possible:</span> ' + h.science + "</p>" +
        '<p><span class="label">Fun fact:</span> ' + h.fact + "</p>" +
        "</div>";
      const btn = card.querySelector(".more");
      btn.addEventListener("click", function () {
        card.classList.toggle("open");
        btn.textContent = card.classList.contains("open") ? "Hide" : "What did I discover?";
      });
      cards.appendChild(card);
    });
}
buildChapter("Moon");
buildChapter("Mars");
buildChapter("Deep Space");

// ----- Overachievers bars -----
const overList = document.getElementById("over-list");
overachievers.forEach(function (o) {
  const row = document.createElement("div");
  row.className = "over-row reveal";
  row.innerHTML =
    "<h3>" + o.name + "</h3>" +
    '<div class="bar-line"><span class="bar-label">Plan: ' + o.plan + '</span><div class="bar plan" style="--w:' + o.planPct + '%"></div></div>' +
    '<div class="bar-line"><span class="bar-label">Reality: ' + o.real + '</span><div class="bar real" style="--w:100%"></div></div>' +
    '<p class="times">' + o.times + "</p>";
  overList.appendChild(row);
});

// ----- Voyager 1 light-day countdown (NASA: Nov 18, 2026, 2:16:07 a.m. PST = 10:16:07 UTC) -----
(function () {
  const target = new Date("2026-11-18T10:16:07Z").getTime();
  const el = document.getElementById("countdown");

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      el.textContent = "Voyager 1 has reached one light-day from Earth!";
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.innerHTML =
      "<span><b>" + d + "</b>days</span>" +
      "<span><b>" + h + "</b>hours</span>" +
      "<span><b>" + m + "</b>minutes</span>" +
      "<span><b>" + s + "</b>seconds</span>";
    setTimeout(tick, 1000);
  }
  tick();
})();

// ----- "Say hello" signal delay -----
(function () {
  const buttons = document.getElementById("delay-buttons");
  const pulse = document.getElementById("pulse");
  const note = document.getElementById("delay-note");
  let timer = null;

  delays.forEach(function (d) {
    const b = document.createElement("button");
    b.className = "filter";
    b.textContent = "Say hello to " + d.label;
    b.addEventListener("click", function () {
      clearTimeout(timer);
      pulse.style.transition = "none";
      pulse.style.left = "0%";
      void pulse.offsetWidth;
      pulse.style.transition = "left " + d.seconds + "s linear";
      pulse.style.left = "96%";
      note.textContent = "Sending your message to " + d.label + "...";
      timer = setTimeout(function () { note.textContent = d.note; }, d.seconds * 1000);
    });
    buttons.appendChild(b);
  });
})();

// ----- Quiz -----
let qi = 0;
let score = 0;

function showQuestion() {
  const box = document.getElementById("quiz-box");

  if (qi >= quiz.length) {
    box.innerHTML =
      "<h3>You scored " + score + " out of " + quiz.length + "!</h3>" +
      '<button class="next" id="again">Play again</button>';
    document.getElementById("again").addEventListener("click", function () {
      qi = 0;
      score = 0;
      showQuestion();
    });
    return;
  }

  const q = quiz[qi];
  let html = "<h3>" + (qi + 1) + ". " + q.q + "</h3>";
  q.options.forEach(function (o, i) {
    html += '<button class="opt" data-i="' + i + '">' + o + "</button>";
  });
  html += '<p id="feedback"></p>';
  box.innerHTML = html;

  box.querySelectorAll(".opt").forEach(function (b) {
    b.addEventListener("click", function () { answer(Number(b.dataset.i)); });
  });
}

function answer(i) {
  const q = quiz[qi];
  const buttons = document.querySelectorAll(".opt");
  buttons.forEach(function (b) { b.disabled = true; });
  buttons[q.answer].classList.add("right");
  if (i === q.answer) {
    score++;
  } else {
    buttons[i].classList.add("wrong");
  }
  const fb = document.getElementById("feedback");
  fb.textContent = q.explain;
  const next = document.createElement("button");
  next.className = "next";
  next.textContent = qi === quiz.length - 1 ? "See my score" : "Next question";
  next.addEventListener("click", function () { qi++; showQuestion(); });
  fb.after(next);
}
showQuestion();

// ----- Progress bar and "now near" tracker -----
(function () {
  const fill = document.getElementById("progress-fill");
  const loc = document.getElementById("loc-name");
  const moon = document.getElementById("ch-moon");
  const mars = document.getElementById("ch-mars");
  const deep = document.getElementById("ch-deep");

  function update() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    fill.style.width = pct + "%";
    const mid = window.innerHeight / 2;
    let name = "Earth";
    if (moon.getBoundingClientRect().top < mid) name = "The Moon";
    if (mars.getBoundingClientRect().top < mid) name = "Mars";
    if (deep.getBoundingClientRect().top < mid) name = "Deep Space";
    loc.textContent = name;
  }
  window.addEventListener("scroll", update);
  window.addEventListener("resize", update);
  update();
})();

// ----- Fade-in when scrolling (keep this at the very end) -----
document.documentElement.classList.add("js");
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });