import { Missile } from './missile.js'

export class Spaceship {
    missiles = [];
    #modifier = 5;
    #leftArrow = false;
    #rightArrow = false;
    #upArrow = false;
    #downArrow = false;
    #spacebar = false;
    #burstShootingInterval = null;
    #burstFlag = false;
    
    constructor(element, container) {
        this.element = element;
        this.container = container;
    }

    init() {
        this.#setPosition()
        this.#eventListeners();
        this.#gameLoop();
    }

    #setPosition = () => {
        this.element.style.bottom = '50px';
        this.element.style.left = `${window.innerWidth / 2 - this.#getPositionHorizontal()}px`;
    }

    #getPositionHorizontal = () => {
        return this.element.offsetLeft +
            this.element.offsetWidth / 2;
    }

    #getPositionVertical = () => {
        return this.element.offsetTop +
            this.element.offsetHeight / 2;
    }

    #eventListeners = () => {
        window.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 32:
                    this.#spacebar = true;
                    break;
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
        window.addEventListener('keyup', (e) => {
            switch (e.keyCode) {
                case 32:
                    this.#spacebar = false;   
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

    #whatKey = () => {
        if (this.#leftArrow && this.#getPositionHorizontal() > 12) {
            this.element.style.left = `${parseInt(this.element.style.left, 10) - this.#modifier}px`;
        }
        if (this.#rightArrow && this.#getPositionHorizontal() + 12 < window.innerWidth) {
            this.element.style.left = `${parseInt(this.element.style.left, 10) + this.#modifier}px`;
        }

        if (this.#upArrow && this.#getPositionVertical() > 32) {
            this.element.style.bottom = `${parseInt(this.element.style.bottom, 10) + this.#modifier}px`;
        }
        if (this.#downArrow && this.#getPositionVertical() + 12 < window.innerHeight) {
            this.element.style.bottom = `${parseInt(this.element.style.bottom, 10) - this.#modifier}px`;
        }
        if(this.#spacebar){
            if(this.#burstFlag){
                this.#burstFlag = this.#burstShooting();
            }
        }
         else if(!this.#spacebar){
            this.#burstFlag = this.#stopBurst(); 
        }  
    }

    #shot = () => {
        const missile = new Missile(
            this.#getPositionHorizontal(),
            this.element.offsetTop,
            this.container);

        missile.init();
        this.missiles.push(missile);
    }

    #burstShooting = () =>{
        this.#shot();
        this.#burstShootingInterval = setInterval(() => this.#shot(), 200);
        return false;
    }

    #stopBurst = () =>{
        clearInterval(this.#burstShootingInterval);
        return true;
    }
}