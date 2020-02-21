
u('aside a').on('click', e => {
  e.preventDefault();
  const href = u(e.currentTarget).attr('href');
  u(href).scroll();
});
