import Card from "./Card.js";
import CardList from "./CardList.js";
import Popup from "./Popup.js";
import Form from "./Form.js";
import InputField from "./InputField.js";

const cards = document.querySelector('.places-list');
const popupElement = document.querySelector('#popup');
const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
const formPopupTpl = document.querySelector("#form-popup");
const bigSizeImage = document.querySelector("#big-size-image");
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
        name: 'Нургуш',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
    },
    {
        name: 'Тулиновка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
    },
    {
        name: 'Остров Желтухина',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
    },
    {
        name: 'Владивосток',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
    }
];
const addCardFields = [{
    name: 'name',
    classList: ['popup__input', 'popup__input_type_name'],
    placeholder: 'Название',
    validator: (val) => validateLengthStr(val, 2, 30),
}, {
    name: 'link',
    classList: ['popup__input', 'popup__input_type_link-url'],
    placeholder: 'Ссылка на картинку',
    validator: validURL,
}];
const editProfileFields = () => [{
    name: "name",
    placeholder: 'Имя',
    validator: (val) => validateLengthStr(val, 2, 30),
    value: userInfoName.textContent
}, {
    name: 'job',
    placeholder: 'О себе',
    validator: (val) => validateLengthStr(val, 2, 30),
    value: userInfoJob.textContent,
}];

/**
 * Отображает Form в popup
 * @param {Popup} popup
 * @param {Form} form
 */
function showFormInPopup (popup, form) {
    const node = document.importNode(formPopupTpl.content, true);
    node.querySelector('.popup__content').appendChild(form.create());
    popup.open(node);
}

/**
 * Собирает флому из полей
 * @param {object} object поля формы
 * @param {string=} actionName
 * @param {CallableFunction} callback
 * @returns {Form}
 */
function formFactory (object, actionName, callback) {
    const elements = [];
    object.forEach(field => elements.push(new InputField(field)));
    return new Form(elements, actionName, callback)
}

/**
 * Проверяет длину строки
 * @param {string} str
 * @param {number} min
 * @param {number} max
 * @returns {string}
 */
function validateLengthStr (str, min, max) {
    if (str.length === 0)
        return "Это обязательное поле";
    if (str.length >= min && str.length <= max)
        return '';
    return `Должно быть от ${min} до ${max} символов`;
}

/**
 * Проверяет валидность URL,
 * но не понятно зачем имея встроенный input[type=url] пытаться гороить своё решение
 * http://🎣💰🎸🛴🍓🎉🐟⚡.🍕💩.ws абсолютно рабочая ссылка на яндекс, например.
 * @param {string} str
 * @returns {string}
 */
function validURL (str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                               '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                               '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                               '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                               '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                               '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str) ? '' : "Здесь должна быть ссылка";
}

(() => {
    const cardArray = [];
    initialCards.forEach((item) => cardArray.push(new Card(item.name, item.link)));
    const cardList = new CardList(cards, cardArray);
    cardList.render();
    const popup = new Popup(popupElement);
    cards.addEventListener('clickOnImage', (evt) => {
        bigSizeImage.content.querySelector('.popup__image').src = evt.detail.image;
        popup.open(document.importNode(bigSizeImage.content, true));
    });
    const addCardForm = formFactory(addCardFields, '+', (data) => cardList.addCard(new Card(data.name, data.link)));
    const editProfileForm = () => formFactory(editProfileFields(), 'Применить', (data) => {
        userInfoName.textContent = data.name;
        userInfoJob.textContent = data.job;
        popup.close();
    });
    // нажатие на кнопку +
    const button = document.querySelector(".user-info__button");
    button.addEventListener("click", () => showFormInPopup(popup, addCardForm));
    // нажатие на кнопку Edit
    const buttonEdit = document.querySelector(".button.user-info__edit");
    buttonEdit.addEventListener("click", () => showFormInPopup(popup, editProfileForm()));
})();
