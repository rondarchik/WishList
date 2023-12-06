import { API_URL, ROUTE_NEW_WISH } from "./const.js";
import { createElement, createOptionsCurrency, handleImageFileSelection } from "./helper.js";
import { deleteWish, getWish, sendDataWish, updateDataWish } from "./serviceAPI.js";

export const createEditWish = async (id) => {
    const wishData = id !== ROUTE_NEW_WISH && (await getWish(id));

    const sectionEditWish = createElement('section', {
        className: 'edit edit_wish',
    });
    
    const container = createElement('div', {
        className: 'container',
    });    
    
    const formWish = createElement('form', {
        className: 'edit__form',
    });

    formWish.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        if (!wishData) {
            await sendDataWish(data);
        } else {
            await updateDataWish(id, data);
        }

        history.back();
    });

    const editWish = createElement('fieldset', {
        className: 'edit__wish',
    });

    const labelTitle = createElement('label', {
        className: 'edit__label',
    });

    const labelTextTitle = createElement('span', {
        className: 'edit__label-text',
        textContent: 'Описание:',
    });

    const inputTitle = createElement('input', {
        className: 'edit__input', 
        name: 'title', 
        type: 'text',
        value: wishData.title ?? '',
    });

    labelTitle.append(labelTextTitle, inputTitle);

    const labelCategory = createElement('label', {
        className: 'edit__label',
    });

    const labelTextCategory = createElement('span', {
        className: 'edit__label-text',
        textContent: 'Категория:',
    });

    const inputCategory = createElement('input', {
        className: 'edit__input', 
        name: 'category', 
        type: 'text',
        value: wishData.category ?? '',
    });

    labelCategory.append(labelTextCategory, inputCategory);

    const priceWrapper = createElement('div', {
        className: 'edit__label edit__wish-price',
    });

    const labelPrice = createElement('label', {
        className: 'edit__label edit__label_price',
    });

    const labelTextPrice = createElement('span', {
        className: 'edit__label-text',
        textContent: 'Цена:',
    });

    const inputPrice = createElement('input', {
        className: 'edit__input', 
        name: 'price', 
        type: 'number',
        value: wishData.price ?? '',
    });

    labelPrice.append(labelTextPrice, inputPrice);

    const labelCurrency = createElement('label', {
        className: 'edit__label edit__label_select edit__label_price',
    });

    const selectCurrency = createElement('select', {
        className: 'edit__select edit__select_currency', 
        name: 'currency', 
    });

    createOptionsCurrency(selectCurrency, wishData.currency);

    labelCurrency.append(selectCurrency);
    priceWrapper.append(labelPrice, labelCurrency);

    const labelLink = createElement('label', {
        className: 'edit__label',
    });

    const labelTextLink = createElement('span', {
        className: 'edit__label-text',
        textContent: 'Ссылка:',
    });

    const inputLink = createElement('input', {
        className: 'edit__input', 
        name: 'link', 
        type: 'text',
        value: wishData.link ?? '',
    });

    labelLink.append(labelTextLink, inputLink);

    editWish.append(
        labelTitle, 
        labelCategory, 
        priceWrapper, 
        labelLink
    );

    const editWishPhoto = createElement('fieldset', {
        className: 'edit__wish-photo',
    });

    const labelPhoto = createElement('label', {
        className: 'edit__label-photo',
    });

    const photo = createElement('img', {
        className: 'edit__wish-image',
        src: wishData.image ? `${API_URL}/${wishData.image}` : 'img/no-photo.jpg',
        alt: `Добавить изображение`,
    });

    const inputPhoto = createElement('input', {
        type: 'file', 
        className: "edit__input-file edit__input-file_wish",
        accept: "image/jpeg, image/png",
    });

    labelPhoto.append(photo, inputPhoto);

    const btnPhotoDelete = createElement('button', {
        className: 'edit__wish-delete',
        type: 'button',
        innerHTML: `
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.8961 18.6875C20.5999 18.4115 20.2081 18.2612 19.8033 18.2684C19.3985 18.2755 19.0123 18.4395 18.726 18.7258C18.4398 19.0121 18.2758 19.3983 18.2686 19.8031C18.2615 20.2079 18.4117 20.5996 18.6877 20.8958L22.7919 25L18.6877 29.1042C18.5342 29.2472 18.4111 29.4197 18.3257 29.6114C18.2403 29.803 18.1944 30.0099 18.1907 30.2197C18.187 30.4295 18.2256 30.6379 18.3042 30.8325C18.3827 31.027 18.4997 31.2038 18.6481 31.3522C18.7964 31.5005 18.9732 31.6175 19.1677 31.6961C19.3623 31.7747 19.5707 31.8133 19.7805 31.8096C19.9903 31.8059 20.1972 31.7599 20.3889 31.6745C20.5805 31.5891 20.753 31.466 20.8961 31.3125L25.0002 27.2083L29.1044 31.3125C29.4006 31.5885 29.7924 31.7388 30.1972 31.7316C30.602 31.7245 30.9882 31.5605 31.2745 31.2742C31.5607 30.9879 31.7247 30.6017 31.7319 30.1969C31.739 29.7921 31.5887 29.4004 31.3127 29.1042L27.2086 25L31.3127 20.8958C31.4663 20.7528 31.5894 20.5803 31.6748 20.3886C31.7602 20.197 31.8061 19.99 31.8098 19.7802C31.8135 19.5705 31.7749 19.3621 31.6963 19.1675C31.6177 18.9729 31.5008 18.7962 31.3524 18.6478C31.204 18.4995 31.0273 18.3825 30.8327 18.3039C30.6382 18.2253 30.4298 18.1867 30.22 18.1904C30.0102 18.1941 29.8033 18.2401 29.6116 18.3255C29.42 18.4109 29.2475 18.534 29.1044 18.6875L25.0002 22.7917L20.8961 18.6875Z" fill="#365ABA"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M25.1191 2.60419H24.8816C20.0712 2.60419 16.3024 2.60419 13.3607 3.00002C10.3524 3.40419 7.97741 4.25002 6.11283 6.11252C4.24824 7.9771 3.40449 10.3521 3.00033 13.3625C2.60449 16.3021 2.60449 20.0709 2.60449 24.8813V25.1188C2.60449 29.9292 2.60449 33.6979 3.00033 36.6396C3.40449 39.6479 4.25033 42.0229 6.11283 43.8875C7.97741 45.7521 10.3524 46.5959 13.3628 47C16.3024 47.3959 20.0712 47.3959 24.8816 47.3959H25.1191C29.9295 47.3959 33.6982 47.3959 36.6399 47C39.6482 46.5959 42.0232 45.75 43.8878 43.8875C45.7524 42.0229 46.5962 39.6479 47.0003 36.6375C47.3962 33.6979 47.3962 29.9292 47.3962 25.1188V24.8813C47.3962 20.0709 47.3962 16.3021 47.0003 13.3604C46.5962 10.3521 45.7503 7.9771 43.8878 6.11252C42.0232 4.24794 39.6482 3.40419 36.6378 3.00002C33.6982 2.60419 29.9295 2.60419 25.1191 2.60419ZM8.32324 8.32294C9.51074 7.13544 11.1149 6.45419 13.7795 6.09585C16.4878 5.73335 20.0462 5.72919 25.0003 5.72919C29.9545 5.72919 33.5128 5.73335 36.2212 6.09585C38.8857 6.45419 40.492 7.13752 41.6795 8.32294C42.8649 9.51044 43.5462 11.1146 43.9045 13.7792C44.267 16.4875 44.2712 20.0459 44.2712 25C44.2712 29.9542 44.267 33.5125 43.9045 36.2209C43.5462 38.8854 42.8628 40.4917 41.6774 41.6792C40.4899 42.8646 38.8857 43.5459 36.2212 43.9042C33.5128 44.2667 29.9545 44.2709 25.0003 44.2709C20.0462 44.2709 16.4878 44.2667 13.7795 43.9042C11.1149 43.5459 9.50866 42.8625 8.32116 41.6771C7.13574 40.4896 6.45449 38.8854 6.09616 36.2209C5.73366 33.5125 5.72949 29.9542 5.72949 25C5.72949 20.0459 5.73366 16.4875 6.09616 13.7792C6.45449 11.1146 7.13783 9.51044 8.32324 8.32294Z" fill="#365ABA"/>
            </svg> `,
        style: photo.src.includes(API_URL) && !photo.src.includes('empty') || 'display: none;',
    });

    const editHiddenInput = createElement('input', {
        type: 'hidden',
        name: 'image',
        value: wishData.image ? `${API_URL}/${wishData.image}` : '',
    });

    inputPhoto.addEventListener('change', () =>{
        btnPhotoDelete.style.display = 'block';
    });

    btnPhotoDelete.addEventListener('click', () => {
        photo.src =`img/no-photo.jpg`,
        editHiddenInput.value = '';
        inputPhoto.value = '';
        btnPhotoDelete.style.display = 'none';
    });

    handleImageFileSelection(inputPhoto, photo, editHiddenInput);

    editWishPhoto.append(labelPhoto, btnPhotoDelete);

    const editSubmitWrapper = createElement('div', {
        className: 'edit__submit-wrapper',
    });

    const btnSaveWish = createElement('button', {
        className: 'edit__submit-btn btn',
        textContent: 'Сохранить изменения',
        type: 'submit',
    });

    editSubmitWrapper.append(btnSaveWish);

    if (wishData) {
        const btnDeleteWish = createElement('button', {
            className: 'edit__delete-btn btn',
            textContent: 'Удалить желание',
            type: 'button',
        });
    
        btnDeleteWish.addEventListener('click', async () => {
            await deleteWish(id);
            history.back();
        });

        editSubmitWrapper.append(btnDeleteWish);
    }

    formWish.append(editWish, editWishPhoto, editSubmitWrapper);

    container.append(formWish);
    sectionEditWish.append(container);

    return { sectionEditWish, formWish };
}
