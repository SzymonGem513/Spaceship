import { Missile } from './missile.js'

export class Spaceship {
    missiles = [];
    #modifier = 10;
    #leftArrow = false;
    #rightArrow = false;
    #upArrow = false;
    #downArrow = false;

    constructor(element, container) {
        this.element = element;
        this.container = container;
    }

    init() {
        this.#setPosition()
        this.#eventListeners();
        this.#gameLoop();
    }

    #setPosition() {
        this.element.style.bottom = '50px';
        this.element.style.left = `${window.innerWidth / 2 -
            this.#getPosition()
            }px`;
    }

    #getPosition() {
        return this.element.offsetLeft +
            this.element.offsetWidth / 2;
    }

    #eventListeners() {
        window.addEventListener('keydown', ({ keyCode }) => {
            switch (keyCode) {
                case 37:
                    this.#leftArrow = true;
                    break;
                case 39:
                    this.#rightArrow = true;
                    break;
                case 38:
                    this.#upArrow = true;
                    break;
                case 40:
                    this.#downArrow = true;
                    break;
            }
        })
        window.addEventListener('keyup', ({ keyCode }) => {
            switch (keyCode) {
                case 32:
                    this.#shot();
                    break;
                case 37:
                    this.#leftArrow = false;
                    break;
                case 39:
                    this.#rightArrow = false;
                    break;
                case 38:
                    this.#upArrow = false;
                    break;
                case 40:
                    this.#downArrow = false;
                    break;
            }
        })
    }

    #gameLoop = () => {
        this.#whatKey();
        requestAnimationFrame(this.#gameLoop);
    }

    #whatKey() {
        if (this.#leftArrow && this.#getPosition() > 12) {
            this.element.style.left = `${parseInt(this.element.style.left, 10) - this.#modifier}px`;
        }
        if (this.#rightArrow && this.#getPosition() + 12 < window.innerWidth) {
            this.element.style.left = `${parseInt(this.element.style.left, 10) + this.#modifier}px`;
        }

        if (this.#upArrow && this.#getPosition() + 12 < window.innerHeight) {
            console.log('up');
            this.element.style.bottom = `${parseInt(this.element.style.bottom, 10) + this.#modifier}px`;
        }
        if (this.#downArrow && this.#getPosition() + 12 < window.innerHeight) {
            console.log('down');
            this.element.style.bottom = `${parseInt(this.element.style.bottom, 10) - this.#modifier}px`;
        }
    }

    #shot() {
        const missile = new Missile(
            this.#getPosition(),
            this.element.offsetTop,
            this.container);

        missile.init();
        this.missiles.push(missile);
    }
}