class TetrisBlock {
    structure: Matrix<boolean>;
    blockType: string;
    parentCenter: TetrisCenter;
    _coordinate: number[];
    get coordinate() {
        return this._coordinate.slice();
    }

    getPositionReferencePoint(): number[] {
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
    private _moveBy(relativeCoordinate: number[]) {
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

    private _isSpaceAvailable(coordinate: number[]) {
        var map = this.parentCenter.cellMatrix;
        var mapSize = map.size;
        return this._getComputedCellCoordinates(coordinate).every(
            (cellCoordinate) => cellCoordinate.every((n, i) => n >= 1 && n <= mapSize[i])
                && !map.get(cellCoordinate).dataset.tetrisCellType);
    }

    rotate() {
        var base = this.structure;
        var rotated = new Matrix<boolean>(base.size.slice().reverse());
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

    private _disappear() {
        var filled = this._getComputedCellCoordinates(this.coordinate);
        filled.forEach((cellCoordinate) => {
            this.parentCenter.cellMatrix.get(cellCoordinate).removeAttribute("data-tetris-cell-type");
        });
    }
    private _appear(coordinate: number[]) {
        var targetCellCoordinates = this._getComputedCellCoordinates(coordinate);
        targetCellCoordinates.forEach((cellCoordinate) => {
            this.parentCenter.cellMatrix.get(cellCoordinate).setAttribute("data-tetris-cell-type", this.blockType);
        });
        this._coordinate = coordinate;
    }
    /**
    Get cell coordinates inside the map if we assume that the block is in the specified coordinate.
    */
    private _getComputedCellCoordinates(coordinate: number[]) {
        var cellCoordinates: number[][] = [];
        var reference = this.getPositionReferencePoint();

        this.structure.forEach((item, structuralCoordinate) => {
            if (item) {
                var cellCoordinate = structuralCoordinate.map((n, i) => n + (coordinate[i] - 1) - (reference[i] - 1));
                if (cellCoordinate[0] >= 1)
                    cellCoordinates.push(cellCoordinate);
            }
        });

        return cellCoordinates;
    }
}

class TetrisBlockTypes {
    static Madoka = "madoka";
    static Homura = "homura";
    static Sayaka = "sayaka";
    static Kyouko = "kyouko";
    static Mami = "mami";
    static Nagisa = "nagisa";
    static Kyubey = "kyubey"
}

class MadokaBlock extends TetrisBlock {
    structure = new Matrix([1, 4], [
        true, true, true, true
    ]);
    blockType = TetrisBlockTypes.Madoka;
    getPositionReferencePoint() {
        var size = this.structure.size;
        if (size[0] == 1) // horizontal
            return [1, 2];
        else // vertical
            return [2, 1];
    }
}

class HomuraBlock extends TetrisBlock {
    structure = new Matrix([2, 2], [
        true, true,
        true, true
    ]);
    blockType = TetrisBlockTypes.Homura;
    getPositionReferencePoint() {
        return [1, 1];
    }
}

class SayakaBlock extends TetrisBlock {
    structure = new Matrix([3, 3], [
        false, false, false,
        true, true, true,
        false, false, true
    ]);
    blockType = TetrisBlockTypes.Sayaka;
    getPositionReferencePoint() {
        return [1, 1];
    }
}

class KyoukoBlock extends TetrisBlock {
    structure = new Matrix([3, 3], [
        false, false, false,
        true, true, true,
        true, false, false
    ]);
    blockType = TetrisBlockTypes.Kyouko;
    getPositionReferencePoint() {
        return [1, 1];
    }
}

class MamiBlock extends TetrisBlock {
    structure = new Matrix([2, 3], [
        false, true, true,
        true, true, false
    ]);
    blockType = TetrisBlockTypes.Mami;
    getPositionReferencePoint() {
        var size = this.structure.size;
        if (size[0] == 2)
            return [2, 3];
        else
            return [3, 2];
    }
}

class NagisaBlock extends TetrisBlock {
    structure = new Matrix([2, 3], [
        true, true, false,
        false, true, true
    ]);
    blockType = TetrisBlockTypes.Nagisa;
    getPositionReferencePoint() {
        var size = this.structure.size;
        if (size[0] == 2)
            return [2, 3];
        else
            return [3, 2];
    }
}

class KyubeyBlock extends TetrisBlock {
    structure = new Matrix([3, 3], [
        false, false, false,
        true, true, true,
        false, true, false
    ]);
    blockType = TetrisBlockTypes.Kyubey;
    getPositionReferencePoint() {
        return [1, 1];
    }
}