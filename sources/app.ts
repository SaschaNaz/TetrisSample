declare var content: HTMLDivElement;
interface Element {
    __proto__: any;
}
interface HTMLDivElement {
    __proto__: HTMLDivElement;
}
var center: TetrisCenter;
var timer: number;
document.addEventListener("DOMContentLoaded", () => {
    center = TetrisMatrixSetter.morph(content, [15, 10]);
    center.createRandomBlock();

    timer = setInterval(moveDown, 1000);
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
            moveDown();
            clearInterval(timer);
            timer = setInterval(moveDown, 1000);
            break;
        case "Up":
            center.currentControllingBlock.rotate();
            break;
    }
})
var moveDown = () => {
    if (!center.currentControllingBlock.moveDown()) {
        center.removeFullLines();
        center.createRandomBlock();
    }
}