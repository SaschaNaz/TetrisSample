declare var content: HTMLDivElement;
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
        case "ArrowLeft":
            center.currentControllingBlock.moveLeft();
            break;
        case "ArrowRight":
            center.currentControllingBlock.moveRight();
            break;
        case "ArrowDown":
            moveDown();
            clearInterval(timer);
            timer = setInterval(moveDown, 1000);
            break;
        case "ArrowUp":
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
