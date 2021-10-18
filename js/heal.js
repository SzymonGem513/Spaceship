export class Heal{
    constructor(container, intervalTime, healValue = 1) {
        this.container = container;
        this.element = document.createElement('div');
        this.interval = null;
        this.intervalTime = intervalTime;
        this.healValue = healValue;
        this.healAnim = 'heal';
        this.healClass = 'healing-object';

    }

    init(){
        this.#setHeal();
        this.#updatePosition();
    }

    #setHeal = () => {
        this.element.classList.add(this.healClass);
        this.container.appendChild(this.element);
        this.element.style.top = '-64px';
        this.element.style.left = `${this.#randomPosition()}px`;
    }

    #randomPosition = () => {
        return Math.floor(Math.random() * window.innerWidth - this.element.offsetWidth);
    }

    #updatePosition = () => {
        this.interval = setInterval(() => this.#setNewPosition(), this.intervalTime);
    }

    #setNewPosition = () => {
        this.element.style.top = `${this.element.offsetTop + 1}px`;
    }

    vanish = () => {
        this.element.classList.remove(this.healClass);
        this.element.classList.add(this.healAnim);
        clearInterval(this.interval);
        const aniamtionTime = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--explosions-animation-time'), 10)
        setTimeout(() => this.element.remove(), aniamtionTime)
    }


    remove() {
        clearInterval(this.interval);
        this.element.remove();
    }









}