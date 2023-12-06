import { JWT_TOKEN_KEY } from "./const.js";
import { createEditProfile } from "./createEditProfile.js";
import { createEditWish } from "./createEditWish.js";
import { createHero } from "./createHero.js";
import { createWishlist } from "./createWishlist.js";
import { renderNavigation } from "./renderNavigation.js";
import { getLogin } from "./serviceAPI.js";

export const router = Router();

const token = localStorage.getItem(JWT_TOKEN_KEY);
export const auth = token ? await getLogin(token) : {};
if (!auth.login) {
    localStorage.removeItem(JWT_TOKEN_KEY);
}

let isMainPage = true;

const app = document.querySelector('.app');


const handleHomePage = () => {
    isMainPage = false;
    app.textContent = '';
    renderNavigation();
    const section = createHero();
    app.append(section);
};

const handleEditPageRoute = async (id) => {
    isMainPage = false;
    app.textContent = '';
    const { sectionEditWish, formWish } = await createEditWish(id);
    renderNavigation('profile', formWish);
    app.append(sectionEditWish);
};

const handleEditProfileRoute = async (login) => {
    isMainPage = false;
    app.textContent = '';
    const { sectionEditProfile, formProfile } = await createEditProfile(login);
    renderNavigation('profile', formProfile);
    app.append(sectionEditProfile);
};

const handleUserRoute = async (login) => {
    isMainPage = false;
    app.textContent = '';
    renderNavigation();
    app.append(await createWishlist(login));
};

const init = () => {
    router.on('/', handleHomePage);
    router.on('/editwish/:id', handleEditPageRoute);
    router.on('/editprofile/:login', handleEditProfileRoute);
    router.on('/user/:login', handleUserRoute);

    router.init();

    if (isMainPage) {
        if (auth.login) {
            router.setRoute(`/user/${auth.login}`);
        } else {
            router.setRoute('/');
        }
    }
};

init();
