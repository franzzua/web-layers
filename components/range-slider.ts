const template = `
<style>
    *{
    user-select: none;
    }
    .range{
        min-height: 1em;
        background: rgba(200,0,0,.1);
        position: relative;
    }
    .thumb{
        border-radius: 100%;
        width: 1em;
        height: 1em;
        background: indianred;
        position: absolute;
        top: 0;
        left: .5em;
        margin-left: -.5em;
        cursor: pointer;
    }
</style>
<div class="range">
    <div class="thumb"></div>
    <div class="thumb"></div>
</div>
`;


export class RangeSlider extends HTMLElement {
    private root: ShadowRoot;
    private thumbs: HTMLElement[];
    private thumbMovers: HTMLElement[];

    constructor() {
        super();
        this.root = this['createShadowRoot']();
        this.root.innerHTML = template;
        this.style.display = 'block';
        this.thumbs = [].slice.call(this.root.querySelectorAll('.thumb'));
        this.addListeners();
        this.observeAttributes();
        this.thumbs.forEach((thumb, i) => {
            const size = this.getBoundingClientRect();
            thumb.style.left = `${(+this.getAttribute(["from", "to"][i]))*size.width}px`;
        });
    }

    private observeAttributes(){

        new MutationObserver(mutationsList => {
            for (var mutation of mutationsList) {
                if (mutation.type == 'attributes') {
                    const index = ["from", "to"].indexOf(mutation.attributeName);
                    const thumb = this.thumbs[index];
                    const size = this.getBoundingClientRect();
                    thumb.style.left = `${(+this.getAttribute(mutation.attributeName))*size.width}px`;
                }
            }
        }).observe(this, {attributeFilter: ['from', 'to']});
    }

    private addListeners(){
        this.thumbs.forEach((thumb, i) => {
            const thumbMover = this.getThumbMover(thumb, ["from", "to"][i]);
            thumb.addEventListener('mousedown', () => {
                document.addEventListener('mousemove', thumbMover);
                document.addEventListener('mouseup', () => {
                    document.removeEventListener('mousemove', thumbMover);
                });
                document.addEventListener('mouseleave', () => {
                    document.removeEventListener('mousemove', thumbMover);
                });
            });
        });
    }

    private getThumbMover = (thumb, attr) => (event: MouseEvent) => {
        requestAnimationFrame(() => {
            const size = this.getBoundingClientRect();
            const position = event.clientX - size.left;
            // thumb.style.left = `${position}px`;
            const value = (position / size.width);
            this.setAttribute(attr, value.toString());
            this.dispatchEvent(new ValueEvent(`${attr}-changed`,value));
        });
    };
}

class ValueEvent extends Event{
    private value: any;
    constructor(type, value) {
        super(type, {bubbles: false, cancelable: false});
        this.value = value;
    }

}

customElements.define('range-slider', RangeSlider);