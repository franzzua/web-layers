import {ValueEvent} from "@so/ui";

const templateHtml = `
<style>
    *{
    user-select: none;
    }
    .range{
        cursor: pointer;
        min-height: 1em;
        background: rgba(200,0,0,.1);
        position: absolute;
        height: 100%;
        width: 100%;
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
<!--<div class="range">-->
    <div class="thumb"></div>
<!--</div>-->
`;
const template = document.createElement('template') as HTMLTemplateElement;
template.innerHTML = templateHtml;
document.head.appendChild(template);

export class RangeSlider extends HTMLElement {
    // private root: ShadowRoot;
    private thumb: HTMLElement;

    constructor() {
        super();
        // this.root = this.attachShadow({
        //     mode: "open"
        // });
        this.appendChild(template.content.cloneNode(true));
        this.style.display = 'block';
        this.thumb = this.querySelector('.thumb');
        this.addListeners();
        this.observeAttributes();
        this.setValue();
    }

    private setValue() {
        const size = this.getBoundingClientRect();
        this.thumb.style.left = `${(+this.getAttribute("value")) * size.width}px`;
    }

    private observeAttributes() {

        new MutationObserver(mutationsList => {
            for (var mutation of mutationsList) {
                if (mutation.type == 'attributes' && mutation.attributeName == "value") {
                    this.setValue();
                }
            }
        }).observe(this, {attributeFilter: ['value']});
    }

    private addListeners() {
        this.thumb.addEventListener('mousedown', () => {
            const stopMoving = () => {
                document.removeEventListener('mousemove', this.thumbMover);
                document.removeEventListener('mouseup', stopMoving);
                document.removeEventListener('mouseleave', stopMoving);
            };
            document.addEventListener('mousemove', this.thumbMover);
            document.addEventListener('mouseup', stopMoving);
            document.addEventListener('mouseleave', stopMoving);
        });
        this.addEventListener('click', this.thumbMover)
        this.addEventListener('mousewheel', (event: MouseWheelEvent) => {
            console.log(event)
            requestAnimationFrame(() => {
                const current = this.getAttribute("value");
                this.dispatchEvent(new ValueEvent(`change`, +current - (+event.deltaY / 5000)));
            });
        });
    }

    private thumbMover = (event: MouseEvent) => {
        requestAnimationFrame(() => {
            const size = this.getBoundingClientRect();
            const position = event.clientX - size.left;
            // thumb.style.left = `${position}px`;
            const value = (position / size.width);
            this.setAttribute("value", value.toString());
            this.dispatchEvent(new ValueEvent(`change`, value));
        });
    };
}


customElements.define('so-slider', RangeSlider);