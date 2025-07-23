document.addEventListener("DOMContentLoaded", function () {
  // Zoek de toolbar met de bestaande iconen
  const toolbar = document.querySelector('.bd-header-buttons, .button-container, nav[role="navigation"]');

  if (!toolbar) return;

  // Zoek de edit- of GitHub-link om de basislink af te leiden
  const editLink = toolbar.querySelector('a[href*="github.com"][href*="/blob/"]');
  if (!editLink || !editLink.href.endsWith('.md')) return;

  const editHref = editLink.href;
  const colabHref = editHref.replace(".md", ".ipynb");
  const colabUrl = "https://colab.research.google.com/" + colabHref.split("github.com/")[1];

  // Maak de Colab-knop
  const colabBtn = document.createElement("a");
  colabBtn.href = colabUrl;
  colabBtn.target = "_blank";
  colabBtn.title = "Open in Colab";

  // Gebruik Colab-icoon of badge
  const img = document.createElement("img");
  img.src = "https://colab.research.google.com/assets/colab-badge.svg";
  img.alt = "Open in Colab";
  img.style.height = "1.5em";
  img.style.verticalAlign = "middle";

  colabBtn.appendChild(img);
  colabBtn.style.marginLeft = "0.5em";

  // Voeg de knop toe aan de toolbar
  toolbar.appendChild(colabBtn);
});
