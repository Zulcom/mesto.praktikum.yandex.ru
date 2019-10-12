class Card {
    /**
     * Card constructor
     * @param {string} name
     * @param {string} url
     */
    constructor (name, url) {
        this.name = name;
        this.url = url;
        this.card = null;
    }

    /**
     * Отмечает карточку лайком
     */
    like () {
        if (!this.card) {
            throw new Error('Attempt to like unmounted card')
        }
        this.card.querySelector('.place-card__like-icon').classList.toggle("place-card__like-icon_liked");
    }

    /**
     * Удаляет карточку
     */
    remove () {
        if (!this.card) {
            throw new Error('Attempt to delete unmounted card')
        }
        this.card.remove();
    }

    /**
     * Создёт DOM-элемент карточки
     * @returns {HTMLDivElement}
     */
    create () {
        //формируем все элементы
        const oneCard = document.createElement("div");
        oneCard.classList.add("place-card");

        const imgCard = document.createElement("div");
        imgCard.classList.add("place-card__image");
        imgCard.style.backgroundImage = `url(${this.url})`;
        imgCard.onclick = () => oneCard.dispatchEvent(new CustomEvent('clickOnImage',
            { detail: { image: this.url }, bubbles: true }
        ));

        const btnImgCard = document.createElement("button");
        btnImgCard.classList.add("place-card__delete-icon");
        btnImgCard.onclick = () => this.remove();
        const descCard = document.createElement("div");
        descCard.classList.add("place-card__description");

        const h3Card = document.createElement("h3");
        h3Card.classList.add("place-card__name");
        h3Card.textContent = this.name;

        const btnLike = document.createElement("button");
        btnLike.classList.add("place-card__like-icon");
        btnLike.onclick = () => this.like();
        //сливаем их в один
        oneCard.appendChild(imgCard);
        imgCard.appendChild(btnImgCard);
        oneCard.appendChild(descCard);
        descCard.appendChild(h3Card);
        descCard.appendChild(btnLike);
        this.card = oneCard;
        return this.card;
    }


}

export default Card;
