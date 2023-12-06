import { createElement } from "./helper.js"

export const createBurgerMenu = (nav, classActive, selectorClose) => {
    const burger = createElement('button', {
        className: 'header__burger burger',
        innerHTML: '<span class="burger__line"></span>',
    });

    burger.addEventListener('click', () => {
        burger.classList.toggle('burger_active');
        nav.classList.toggle(classActive);
    });

    nav.addEventListener('click', (e) => {
        if (e.target.closest(selectorClose)) {
            burger.classList.remove('burger_active');
            nav.classList.remove(classActive);
        };
    });

    nav.before(burger);
}