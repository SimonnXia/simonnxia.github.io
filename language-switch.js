// Keep the reader at the corresponding section when changing language.
document.querySelectorAll('.language-switch').forEach(link => {
  const destination = new URL(link.href, location.href);
  function syncSection() {
    destination.hash = ['#home', '#work', '#about', '#approach', '#contact'].includes(location.hash) ? location.hash : '';
    link.href = destination.href;
  }
  syncSection();
  link.addEventListener('pointerenter', syncSection);
  link.addEventListener('focus', syncSection);
  link.addEventListener('click', syncSection);
  window.addEventListener('hashchange', syncSection);
});
