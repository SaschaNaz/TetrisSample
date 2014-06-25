declare var content: HTMLDivElement;
interface Element {
    __proto__: any;
}
interface HTMLDivElement {
    __proto__: HTMLDivElement;
}
var center: TetrisCenter;
document.addEventListener("DOMContentLoaded", () => {
    center = TetrisMatrixSetter.morph(content, [15, 10]);
    center.createRandomBlock();
});
document.addEventListener("keydown", (ev) => {
    if (!center.currentControllingBlock)
        return;
    switch (ev.key) {
        case "Left":
            center.currentControllingBlock.moveLeft();
            break;
        case "Right":
            center.currentControllingBlock.moveRight();
            break;
        case "Down":
            if (!center.currentControllingBlock.moveDown())
                center.createRandomBlock();
            break;
        case "Up":
            center.currentControllingBlock.rotate();
            break;
    }
})