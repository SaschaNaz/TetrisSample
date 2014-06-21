declare var content: HTMLDivElement;
interface Element {
    __proto__: any;
}
interface HTMLDivElement {
    __proto__: HTMLDivElement;
}

document.addEventListener("DOMContentLoaded", () => {
    TetrisMatrixSetter.morph(content, [15,10]);
});