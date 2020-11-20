var center;
var timer;
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
});
var moveDown = () => {
    if (!center.currentControllingBlock.moveDown()) {
        center.removeFullLines();
        center.createRandomBlock();
    }
};
class Multidimension {
    static forEach(size, callbackfn) {
        var stack = [size];
        var indices = [];
        var currentIndex = 0;
        var dimension = size.length; // always 2 here
        while (stack.length > 0) {
            if (currentIndex < size[indices.length]) {
                if (stack.length == dimension) {
                    callbackfn(indices.concat(currentIndex));
                    currentIndex++;
                }
                else {
                    stack.unshift(stack[0][currentIndex]);
                    indices.push(currentIndex);
                    currentIndex = 0;
                }
            }
            else {
                stack.shift();
                currentIndex = indices.pop() + 1;
            }
        }
    }
}
class TetrisBlock {
    get coordinate() {
        return this._coordinate.slice();
    }
    getPositionReferencePoint() {
        return [];
    }
    initialize() {
        var reference = this.getPositionReferencePoint();
        var size = this.structure.size;
        this._appear([
            1 - (size[0] - 1) + (reference[0] - 1),
            1 + Math.floor((this.parentCenter.cellMatrix.size[1] - size[1]) / 2) + (reference[1] - 1)
        ]);
    }
    moveLeft() {
        return this._moveBy([0, -1]);
    }
    moveRight() {
        return this._moveBy([0, 1]);
    }
    moveDown() {
        return this._moveBy([1, 0]);
    }
    /**
    @return Whether the movement succeeded or not.
    */
    _moveBy(relativeCoordinate) {
        Assert.assertArray(relativeCoordinate, 2);
        var resultCoordinate = this.coordinate.map((n, i) => n + relativeCoordinate[i]);
        this._disappear();
        if (this._isSpaceAvailable(resultCoordinate)) {
            this._appear(resultCoordinate);
            return true;
        }
        else {
            this._appear(this.coordinate);
            return false;
        }
    }
    _isSpaceAvailable(coordinate) {
        var mapped = this._getMappedComponents(coordinate);
        if (!this._isEveryCoordinateValid(mapped))
            return false;
        else
            return this.parentCenter.isSpaceAvailable(this._filterVisibleCoordinates(this._getMappedComponents(coordinate)));
    }
    rotate() {
        var base = this.structure;
        var rotated = new Matrix(base.size.slice().reverse());
        var rotatedSize = rotated.size;
        base.forEach((item, coordinate) => {
            rotated.set([
                coordinate[1],
                rotatedSize[1] - coordinate[0] + 1
            ], item);
        });
        this._disappear();
        this.structure = rotated;
        var isAvailable = this._isSpaceAvailable(this.coordinate);
        if (!isAvailable)
            this.structure = base; // rollback
        this._appear(this.coordinate);
        return isAvailable;
    }
    _disappear() {
        var filled = this._filterVisibleCoordinates(this._getMappedComponents(this.coordinate));
        filled.forEach((cellCoordinate) => {
            this.parentCenter.cellMatrix.get(cellCoordinate).removeAttribute("data-tetris-cell-type");
        });
    }
    _appear(coordinate) {
        var targetCellCoordinates = this._filterVisibleCoordinates(this._getMappedComponents(coordinate));
        targetCellCoordinates.forEach((cellCoordinate) => {
            this.parentCenter.cellMatrix.get(cellCoordinate).setAttribute("data-tetris-cell-type", this.blockType);
        });
        this._coordinate = coordinate;
    }
    /**
    Get cell coordinates inside the map if we assume that the block is in the specified coordinate.
    */
    _getMappedComponents(coordinate) {
        var blockComponents = [];
        this.structure.forEach((item, componentCoordinate) => {
            if (item)
                blockComponents.push(componentCoordinate);
        });
        return this._mapCells(coordinate, blockComponents);
    }
    _mapCells(blockCoordinate, blockComponents) {
        var reference = this.getPositionReferencePoint();
        return blockComponents.map((component) => component.map((n, i) => n + (blockCoordinate[i] - 1) - (reference[i] - 1)));
    }
    _isEveryCoordinateValid(coordinates) {
        var mapSize = this.parentCenter.cellMatrix.size;
        return coordinates.every((coordinate) => coordinate[1] >= 1 && coordinate[1] <= mapSize[1]);
    }
    _filterVisibleCoordinates(coordinates) {
        return coordinates.filter((coordinate) => coordinate[0] >= 1);
    }
    getTopLeftCoordinate() {
        return this._mapCells(this.coordinate, [[1, 1]])[0];
    }
}
class TetrisBlockTypes {
}
TetrisBlockTypes.Madoka = "madoka";
TetrisBlockTypes.Homura = "homura";
TetrisBlockTypes.Sayaka = "sayaka";
TetrisBlockTypes.Kyouko = "kyouko";
TetrisBlockTypes.Mami = "mami";
TetrisBlockTypes.Nagisa = "nagisa";
TetrisBlockTypes.Kyubey = "kyubey";
class MadokaBlock extends TetrisBlock {
    constructor() {
        super(...arguments);
        this.structure = new Matrix([1, 4], [
            true, true, true, true
        ]);
        this.blockType = TetrisBlockTypes.Madoka;
    }
    getPositionReferencePoint() {
        var size = this.structure.size;
        if (size[0] == 1) // horizontal
            return [1, 2];
        else // vertical
            return [2, 1];
    }
}
class HomuraBlock extends TetrisBlock {
    constructor() {
        super(...arguments);
        this.structure = new Matrix([2, 2], [
            true, true,
            true, true
        ]);
        this.blockType = TetrisBlockTypes.Homura;
    }
    getPositionReferencePoint() {
        return [1, 1];
    }
}
class SayakaBlock extends TetrisBlock {
    constructor() {
        super(...arguments);
        this.structure = new Matrix([3, 3], [
            false, false, false,
            true, true, true,
            false, false, true
        ]);
        this.blockType = TetrisBlockTypes.Sayaka;
    }
    getPositionReferencePoint() {
        return [1, 1];
    }
}
class KyoukoBlock extends TetrisBlock {
    constructor() {
        super(...arguments);
        this.structure = new Matrix([3, 3], [
            false, false, false,
            true, true, true,
            true, false, false
        ]);
        this.blockType = TetrisBlockTypes.Kyouko;
    }
    getPositionReferencePoint() {
        return [1, 1];
    }
}
class MamiBlock extends TetrisBlock {
    constructor() {
        super(...arguments);
        this.structure = new Matrix([2, 3], [
            false, true, true,
            true, true, false
        ]);
        this.blockType = TetrisBlockTypes.Mami;
    }
    getPositionReferencePoint() {
        var size = this.structure.size;
        if (size[0] == 2)
            return [2, 3];
        else
            return [3, 2];
    }
}
class NagisaBlock extends TetrisBlock {
    constructor() {
        super(...arguments);
        this.structure = new Matrix([2, 3], [
            true, true, false,
            false, true, true
        ]);
        this.blockType = TetrisBlockTypes.Nagisa;
    }
    getPositionReferencePoint() {
        var size = this.structure.size;
        if (size[0] == 2)
            return [2, 3];
        else
            return [3, 2];
    }
}
class KyubeyBlock extends TetrisBlock {
    constructor() {
        super(...arguments);
        this.structure = new Matrix([3, 3], [
            false, false, false,
            true, true, true,
            false, true, false
        ]);
        this.blockType = TetrisBlockTypes.Kyubey;
    }
    getPositionReferencePoint() {
        return [1, 1];
    }
}
class TetrisCenter {
    createBlock(charType) {
        var blockTypeOf = (() => {
            switch (charType) {
                case "madoka":
                    return MadokaBlock;
                case "homura":
                    return HomuraBlock;
                case "sayaka":
                    return SayakaBlock;
                case "kyouko":
                    return KyoukoBlock;
                case "mami":
                    return MamiBlock;
                case "nagisa":
                    return NagisaBlock;
                case "kyubey":
                    return KyubeyBlock;
            }
        })();
        var block = new blockTypeOf();
        block.parentCenter = this;
        block.initialize();
        this.currentControllingBlock = block;
        return block;
    }
    createRandomBlock() {
        var types = ["madoka", "homura", "sayaka", "kyouko", "mami", "nagisa", "kyubey"];
        return this.createBlock(types[Math.floor(Math.random() * types.length)]);
    }
    removeFullLines() {
        var topRow = this.currentControllingBlock.getTopLeftCoordinate()[0];
        var rowLength = this.currentControllingBlock.structure.size[0];
        for (var row = topRow; row <= topRow + (rowLength - 1); row++) {
            var rowCells = this.getRowCells(row);
            if (this.isSpaceFull(rowCells)) {
                rowCells.forEach((cellCoordinate) => this.cellMatrix.get(cellCoordinate).removeAttribute("data-tetris-cell-type"));
                this._shiftRowsDown(row - 1);
            }
        }
    }
    _shiftRowsDown(targetBottomRow) {
        for (var row = targetBottomRow; row >= 1; row--) {
            this.cellMatrix.submatrix([row, 1], [row, undefined]).forEach((item, coordinate) => {
                var type = item.dataset.tetrisCellType;
                item.removeAttribute("data-tetris-cell-type");
                var shiftedCoordinate = coordinate.slice();
                shiftedCoordinate[0] += (row - 1) + 1;
                if (type)
                    this.cellMatrix.get(shiftedCoordinate).setAttribute("data-tetris-cell-type", type);
            });
        }
    }
    getRowCells(row) {
        var columnLength = this.cellMatrix.size[1];
        var rowCells = [];
        for (var column = 1; column <= columnLength; column++)
            rowCells.push([row, column]);
        return rowCells;
    }
    isSpaceFull(coordinates) {
        var map = this.cellMatrix;
        var mapSize = map.size;
        return coordinates.every((cellCoordinate) => cellCoordinate.every((n, i) => n >= 1 && n <= mapSize[i])
            && !!map.get(cellCoordinate).dataset.tetrisCellType);
    }
    isSpaceAvailable(coordinates) {
        var map = this.cellMatrix;
        var mapSize = map.size;
        return coordinates.every((cellCoordinate) => cellCoordinate.every((n, i) => n >= 1 && n <= mapSize[i])
            && !map.get(cellCoordinate).dataset.tetrisCellType);
    }
}
class Assert {
    static assertArray(array, length) {
        if (!Array.isArray(array) || array.length != length)
            throw new Error("Invalid parameter, expected " + length + "-dimensional array.");
    }
}
class TetrisMatrixSetter {
    static morph(div, size) {
        Assert.assertArray(size, 2);
        div.style.display = "grid";
        div.style.gridTemplateRows = `repeat(${size[0].toFixed(0)}, 1fr)`;
        div.style.gridTemplateColumns = `repeat(${size[1].toFixed(0)}, 1fr)`;
        var tetrisCenter = new TetrisCenter();
        tetrisCenter.morphedDiv = div;
        tetrisCenter.cellMatrix = this._appendCells(div, size);
        return tetrisCenter;
    }
    static release(div) {
        div.style.display = "";
        while (div.firstChild)
            div.removeChild(div.firstChild);
    }
    static _appendCells(div, size) {
        var cellMatrix = new Matrix(size);
        Multidimension.forEach(size, (coordinate) => {
            var cell = this._createCell(coordinate);
            cellMatrix.set(coordinate.map((n) => n + 1), cell);
            div.appendChild(cell);
        });
        return cellMatrix;
    }
    static _createCell(coordinate) {
        Assert.assertArray(coordinate, 2);
        var cell = document.createElement("div");
        cell.style.gridRow = String(coordinate[0] + 1);
        cell.style.gridColumn = String(coordinate[1] + 1);
        return cell;
    }
}
//# sourceMappingURL=tetris.js.map