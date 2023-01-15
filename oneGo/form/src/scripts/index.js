import toggleMenu from './components/burger-menu.js';
import isFormValid from './components/validation.js';

document.querySelector('.burger-menu').onclick = toggleMenu;

document.querySelector('.form-name').addEventListener('input', isFormValid);
document.querySelector('.form-email').addEventListener('input', isFormValid);
document.querySelector('.form-textarea').addEventListener('input', isFormValid);
document.querySelector('.form-button').onclick = (e) => e.preventDefault();
