// SI disclosure: written with the help of Claude (AI).

// ----- Robot cards -----
function renderCards(zone) {
  const list = document.getElementById("cards");
  list.innerHTML = "";
  hardware
    .filter(function (h) { return zone === "All" || h.zone === zone; })
    .forEach(function (h) {
      const card = document.createElement("article");
      card.className = "card";
      const statusText = h.status === "talking" ? "Still talking to Earth" : "Silent now";
      card.innerHTML =
        '<div class="icon">' + h.icon + '</div>' +
        '<h3>' + h.name + '</h3>' +
        '<span class="badge ' + h.status + '">' + statusText + '</span>' +
        '<p class="meta">' + h.where + '<br>' + h.when + '</p>' +
        '<p class="voice">"' + h.voice + '"</p>' +
        '<p><span class="label">Science it made possible:</span> ' + h.science + '</p>' +
        '<p><span class="label">Fun fact:</span> ' + h.fact + '</p>';
      list.appendChild(card);
    });
}

document.querySelectorAll(".filter").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".filter").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    renderCards(btn.dataset.zone);
  });
});

renderCards("All");

// ----- Quiz -----
let qi = 0;
let score = 0;

function showQuestion() {
  const box = document.getElementById("quiz-box");

  if (qi >= quiz.length) {
    box.innerHTML = "<h3>You scored " + score + " out of " + quiz.length + "!</h3>" +
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