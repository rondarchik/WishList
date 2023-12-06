export const createElement = (tagName, attribute) => {
    const elem = document.createElement(tagName);
    Object.assign(elem, attribute);

    return elem;
}

export const pluralizeYears = (age) => {
    let years = age % 100;
    
    if (years >= 11 && years <= 19) {
        return 'лет';
    } else {
        let lastDigit = years % 10;
        
        if (lastDigit === 1) {
            return 'год';
        } else if (lastDigit >= 2 && lastDigit <= 4) {
            return 'года';
        } 
        return 'лет';
    }
}

export const pluralizeMonth = (month) => {
    const monthsNominative = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
    const monthsGenitive = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    return monthsGenitive[monthsNominative.indexOf(month)];
}

export const handleImageFileSelection = (inputFile, image, inputHidden) => {
    const handleFileInputCHange = event => {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                image.src = reader.result;

                if (inputHidden) {
                    inputHidden.value = reader.result;
                }
            });

            reader.readAsDataURL(file);
        }
    };

    inputFile.addEventListener('change', handleFileInputCHange);
}

export const createSelectDate = (selectDay, selectMonth, selectYear, birthDate) => {
    for (let day = 0; day <= 31; day++) {
        const option = document.createElement('option');
        option.value = day ? day : '';
        option.text = day ? day : '';
        selectDay.append(option);
    }

    const month = ['', 'Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
    for (let i = 0; i < month.length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = month[i];
        selectMonth.append(option);
    }

    const currentYear = new Date().getFullYear();

    const optionYear = document.createElement('option');
    optionYear.value = '';
    optionYear.text = '';
    selectYear.append(optionYear);

    for (let year = currentYear; year >= currentYear - 100; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.text = year;
        selectYear.append(option);
    }

    if (birthDate) {
        const [month, day, year] = birthDate.split('/');
        selectDay.value = day;
        selectMonth.value = month;
        selectYear.value = year;
    }

    [selectDay, selectMonth, selectYear].forEach(dateSelect => {
        dateSelect.addEventListener('change', ({currentTarget}) => {
            currentTarget.blur();
        });
    });
}

export const createOptionsCurrency = (select, currency) => {
    const currencies = ['BYN', 'USD', 'EUR'];

    for (let i = 0; i < currencies.length; i++) {
        const option = createElement('option', {
            value: currencies[i],
            text: currencies[i],
        });

        select.append(option);
    }

    select.value = currency ?? currencies[0];
}