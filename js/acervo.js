/**
 * Acervo interno · Check-in
 * - Atualiza os contadores de cada categoria automaticamente.
 * - Filtra os arquivos pela busca (ignora acentos e maiúsculas).
 * - Atalho "/" foca a busca; "Esc" limpa.
 *
 * Melhoria progressiva: sem este script a página continua funcionando,
 * apenas sem busca e sem contadores.
 */
(() => {
  "use strict";

  const input = document.querySelector("#busca");
  const status = document.querySelector(".results-status");
  const emptyState = document.querySelector(".empty-state");
  const resetButton = document.querySelector(".empty-state__reset");
  const categories = [...document.querySelectorAll(".category")];

  const normalize = (text) =>
    text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();

  const plural = (n) => `${n} ${n === 1 ? "arquivo" : "arquivos"}`;

  // Pré-calcula o texto pesquisável de cada card (título + tipo).
  const index = categories.map((section) => ({
    section,
    counter: section.querySelector("[data-count]"),
    cards: [...section.querySelectorAll(".file-card")].map((card) => ({
      card,
      text: normalize(`${card.textContent} ${card.dataset.type ?? ""}`),
    })),
  }));

  const total = index.reduce((sum, { cards }) => sum + cards.length, 0);

  function filter(query) {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    let visible = 0;

    for (const { section, counter, cards } of index) {
      let shown = 0;

      for (const { card, text } of cards) {
        const match = terms.every((term) => text.includes(term));
        card.hidden = !match;
        if (match) shown++;
      }

      section.hidden = shown === 0;
      counter.textContent = terms.length ? `${shown} de ${plural(cards.length)}` : plural(cards.length);
      visible += shown;
    }

    emptyState.hidden = visible > 0;
    status.textContent = terms.length ? `Mostrando ${visible} de ${plural(total)}` : "";
  }

  function clear() {
    input.value = "";
    filter("");
    input.focus();
  }

  input.addEventListener("input", () => filter(input.value));

  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && input.value) {
      event.preventDefault();
      clear();
    }
  });

  resetButton.addEventListener("click", clear);

  document.addEventListener("keydown", (event) => {
    const typing = event.target.closest("input, textarea, [contenteditable]");
    if (event.key === "/" && !typing && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      input.focus();
    }
  });

  filter(input.value); // respeita valor restaurado pelo navegador ao voltar
})();
