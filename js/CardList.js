class CardList {
    /**
     * CardList constrictor
     * @param {Element} container
     * @param {Card[]} cardList
     */
    constructor (container, cardList) {
        this.container = container;
        this.cardList = cardList;
    }


    /**
     *
     * @param {Card} card
     */
    addCard (card) {
        this.cardList.push(card);
        this.container.appendChild(card.create())
    }

    /**
     * для отрисовки карточек при загрузке страницы
     */
    render () {
        this.cardList.forEach((card) => {
            this.container.appendChild(card.create())
        });
    }
}

export default CardList;
