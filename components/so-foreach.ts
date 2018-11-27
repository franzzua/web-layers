export class SoForeach extends HTMLTemplateElement {
    constructor() {
        super();
        this.parentElement.removeChild(this);
    }

}

customElements.define('so-foreach', SoForeach, {
    extends: 'template'
});