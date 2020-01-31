/** Class representing a Mondrian painting. */
class Mondrian {
    /**
     * Initialize a mondrian.
     * @param {string} element - The target element.
     * @param {object} options - Options object for configuring Mondrian.
     */
    constructor(element, options = {}) {
        this.element = element;
        this.size = options.size || 'medium';
        this.theme = options.theme || 'default';
        this.themes = {
            default: {
                colors: [
                    'black',
                    'red',
                    'blue',
                    'yellow',
                    'white',
                    'white',
                    'white'
                ]
            },
            blue: {
                colors: [
                    'black',
                    'blue',
                    'blue',
                    'white',
                    'white',
                    'white',
                    'white',
                    'white'
                ]
            },
        };
    }

    /**
     * Create a mondrian.
     * @return {undefined}
     */
    draw() {
        const targetElement = document.getElementById(this.element);
        const painting = `<div class="mondrian mondrian--${this.size}">${this._generateBlocks(this.size)}</div>`;

        targetElement.insertAdjacentHTML('beforeend', painting);
    }

    /**
     * Remove the mondrian and create a new one.
     * @return {undefined}
     */
    redraw() {
        const element = document.querySelector('.mondrian');
        element.parentNode.removeChild(element);

        this.draw();
    }

    /**
     * Set size option
     * @return {undefined}
     */
    setSize(size) {
        const sizes = ['small', 'medium', 'large'];
        if (sizes.includes(size)) {
            this.size = size;
        }
    }

    /**
     * Set theme option
     * @return {undefined}
     */
    setTheme(theme) {
        const themes = ['default', 'blue'];
        if (themes.includes(theme)) {
            this.theme = theme;
        }
    }

    /**
     * Generate the colored dom elements for the Mondrian based on the theme colors.
     * TODO: add rows and columns to the options object.
     * @return {string} template string
     */
    _generateBlocks() {
        let blocks = ``;
        for (let i = 0; i < 50; i++) {
            let span = this._randInt(1, 5);
            let row = this._randInt(1, 5);
            let colorIndex = this._randInt(1, this.themes[this.theme].colors.length);
            blocks += `<div class="span-${span} row-${row} color-${this.themes[this.theme].colors[colorIndex]}"></div>`
        }

        return blocks;
    }

    /**
     * Get random int
     * @return {number}
     */
    _randInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}

/**
 * Initialize the Mondrian class in the document
 */
const options = {
    size: 'large',
    theme: 'default'
};

const mondrian = new Mondrian('mondrian-wrapper', options);
mondrian.draw();

/**
 * Event Listeners
 */
document.getElementById("js-redraw").addEventListener("click", () => {
    mondrian.redraw();
});

const sizeRadios = document.forms["size"].elements["size"];
for(let i = 0, max = sizeRadios.length; i < max; i++) {
    sizeRadios[i].addEventListener("click", (event) => {
        mondrian.setSize(event.target.value);
    });
}

const themeCheckbox = document.querySelector("input[name=theme-blue]");
themeCheckbox.addEventListener( 'change', function() {
    this.checked ? mondrian.setTheme(this.value) : mondrian.setTheme('default');
});