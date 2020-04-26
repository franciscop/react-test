import "prismjs";
import $ from "umbrellajs";

$("a").on("click", e => {
  const href = $(e.currentTarget).attr("href");

  // Only for relative links
  if (!/^#/.test(href)) return;

  e.preventDefault();

  if (href === "#top") {
    history.replaceState(null, null, "/");
    $("body").scroll();
  } else {
    history.replaceState(null, null, href);
    $(href).scroll();
  }
  $(e.currentTarget)
    .closest(".entry")
    .addClass("active");
});

// Show more/less when clicking the chevron
$("aside .more").handle("click", e => {
  $(e.currentTarget)
    .closest(".entry")
    .toggleClass("active");
});

// Timeout to direct the attention here
setTimeout(() => {
  // Show the first one
  $("aside .more")
    .first()
    .click();

  // Show the menu of the one in the URL (if any)
  const hash = window.location.hash;
  if (hash) {
    const link = $("aside a").filter(node => $(node).attr("href") === hash);
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
