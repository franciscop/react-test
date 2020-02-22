u("a").on("click", e => {
  const href = u(e.currentTarget).attr("href");
  if (!/^#/.test(href)) return;

  e.preventDefault();

  history.replaceState(null, null, href);
  u(href).scroll();
  u(e.currentTarget)
    .closest(".entry")
    .addClass("active");
});

// Show more/less when clicking the chevron
u("aside .more").handle("click", e => {
  u(e.currentTarget)
    .closest(".entry")
    .toggleClass("active");
});

// Timeout to direct the attention here
setTimeout(() => {
  // Show the first one
  u("aside .more")
    .first()
    .click();

  // Show the menu of the one in the URL (if any)
  const hash = window.location.hash;
  if (hash) {
    const link = u("aside a").filter(node => u(node).attr("href") === hash);
    if (link.is(".primary")) {
      link.closest(".entry").addClass("active");
    } else {
      link
        .closest("section")
        .map(node => node.previousElementSibling)
        .addClass("active");
    }
  }
}, 1000);
