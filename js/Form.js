class Form {
    /**
     *
     * @param {InputField[]} inputList
     * @param {string} actionName
     * @param {CallableFunction} onSubmitCallback
     */
    constructor (inputList, actionName = 'Применить', onSubmitCallback) {
        this.inputList = inputList;
        this.actionName = actionName;
        this.form = null;
        this.callback = onSubmitCallback;
        this.disabled = false;
        this.inputElements = [];
    }


    create () {
        const formEl = document.createElement('form');
        formEl.classList.add('popup__form');
        formEl.setAttribute('name', 'new');
        this.inputList.forEach(input => {
            const el = input.create();
            el.oninput = () => this.checkValidity();
            this.inputElements.push(el);
            formEl.appendChild(el);
        });
        const submitBtn = document.createElement('button');
        submitBtn.classList.add('button', 'popup__button');
        submitBtn.textContent = this.actionName;
        formEl.appendChild(submitBtn);
        formEl.onsubmit = (e) => this.onSubmit(e);

        this.form = formEl;
        return this.form;
    }

    checkValidity () {
        if (this.inputList.some(input => !input.checkValidity())) {
            this.form.querySelector(".popup__button").classList.remove("popup__button_enable");
            return false
        } else {
            this.form.querySelector(".popup__button").classList.add("popup__button_enable");
            return true
        }
    }

    onSubmit (e) {
        e.preventDefault();
        if (!this.checkValidity()) return;
        const data = {};
        this.inputElements.forEach((el) => data[el.firstElementChild.name] = el.firstElementChild.value);
        this.callback(data);
        this.form.reset();
    }
}

export default Form;
