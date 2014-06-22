declare var content: HTMLDivElement;
interface Element {
    __proto__: any;
}
interface HTMLDivElement {
    __proto__: HTMLDivElement;
}
var center: TetrisCenter;
document.addEventListener("DOMContentLoaded", () => {
    center = TetrisMatrixSetter.morph(content, [15,10]);
});