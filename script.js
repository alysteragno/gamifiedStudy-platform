const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');

menuButton.addEventListener('click', () => {
  if (mobileMenu.classList.contains('max-h-0')) {
    mobileMenu.classList.remove('max-h-0', 'opacity-0');
    mobileMenu.classList.add('max-h-screen', 'opacity-100');
  } else {
    mobileMenu.classList.add('max-h-0', 'opacity-0');
    mobileMenu.classList.remove('max-h-screen', 'opacity-100');
  }
});
