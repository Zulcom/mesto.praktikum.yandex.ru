class InputField {
    /**
     * @typedef {Object} InputFieldOptions
     * @property {string}='text' type
     * @property {string} name
     * @property {string[]}='popup__input' className - class name or list of class names for input
     * @property {string} placeholder
     * @property {string}= value
     * @property {CallableFunction}= validator - функция для валидации, должна возвращать текст ошибки. Если строка пуста считается, что ошибок нет
     */
    /**
     * Конструктор поля для ввода
     * @param {InputFieldOptions} options значения этого массива будут присвоены как атрибуты <input>
     */
    constructor (options) {
        const {
            type = 'text',
            name,
            className = 'popup__input',
            placeholder,
            validator = (val) => '',
            value = ''
        } = options;
        this.type = type;
        this.inputName = name;
        this.className = className;
        this.placeholder = placeholder;
        this.inputEl = null;
        this.value = value;
        this.validator = validator
    }

    /**
     * Создёт DOM-элемент input+error field
     * @returns {HTMLDivElement}
     */
    create () {
        const inputEl = document.createElement('input');
        inputEl.name = this.inputName;
        inputEl.type = this.type;
        inputEl.value = this.value;
        inputEl.placeholder = this.placeholder;
        inputEl.classList.add(this.className);
        const errEl = document.createElement('div');
        errEl.classList.add('popup__input-error');
        errEl.setAttribute('aria-live', 'polite');
        errEl.id = `error-${this.inputName}`;
        const container = document.createElement('div');
        container.appendChild(inputEl);
        container.appendChild(errEl);
        this.inputEl = container;
        return this.inputEl
    }

    /**
     * Проверяет валидность введёных данных
     * @returns {boolean}
     */
    checkValidity () {
        const result = this.validator(this.inputEl.querySelector('input').value);
        if (result.length) {
            this.inputEl.querySelector('.popup__input-error').textContent = result;
            return false;
        }
        this.inputEl.querySelector('.popup__input-error').textContent = '';
        return true;
    }

}

export default InputField;
