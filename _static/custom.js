document.addEventListener("DOMContentLoaded", function () {
  const editLink = document.querySelector('a[href*="github.com"][href*="/blob/"]');

  if (editLink && editLink.href.endsWith(".md")) {
    const editHref = editLink.href;
    const colabHref = editHref.replace(".md", ".ipynb");
    const colabUrl = "https://colab.research.google.com/" + colabHref.split("github.com/")[1];

    const colabBtn = document.createElement("a");
    colabBtn.href = colabUrl;
    colabBtn.target = "_blank";
    colabBtn.title = "Open in Colab";

    // Stijl of badge
    const img = document.createElement("img");
    img.src = "https://colab.research.google.com/assets/colab-badge.svg";
    img.alt = "Open in Colab";
    img.style.verticalAlign = "middle";

    colabBtn.appendChild(img);
    colabBtn.style.marginLeft = "10px";

    // Voeg toe naast de edit-knop
    editLink.parentElement.appendChild(colabBtn);
  }
});
