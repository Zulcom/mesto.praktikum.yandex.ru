class Popup {
    /**
     *
     * @param {Element} container
     */
    constructor (container) {
        this.container = container;
    }

    /**
     * {HTMLDivElement}
     * @param element
     */
    open (element) {
        this.container.appendChild(element);
        const closeBtn = this.container.querySelector('.popup__close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close(), { once: true, passive: true });
        }
        this.container.classList.add('popup_is-opened');
    }

    close () {
        this.container.firstElementChild.remove();
        this.container.classList.remove('popup_is-opened');
    }
}

export default Popup;
