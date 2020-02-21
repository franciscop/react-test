u("aside a").on("click", e => {
  e.preventDefault();
  const href = u(e.currentTarget).attr("href");
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

u("aside .more")
  .first()
  .click();
