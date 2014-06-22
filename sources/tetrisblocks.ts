﻿class TetrisBlock {
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

    moveBy(relativeCoordinate: number[]) {
        Assert.assertArray(relativeCoordinate, 2);


    }

    initialize() {
        var reference = this.getPositionReferencePoint();
        var size = this.structure.size;
        this._appear([
            1 - (size[0] - 1) + (reference[0] - 1),
            1 + Math.floor((this.parentCenter.cellMatrix.size[1] - size[1]) / 2) + (reference[1] - 1)
        ]);
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

        //
        this._appear(this.coordinate);
    }

    private _disappear() {
        var filled = this._getValidCellCoordinates(this.coordinate);
        filled.forEach((cellCoordinate) => {
            this.parentCenter.cellMatrix.get(cellCoordinate).removeAttribute("data-tetris-cell-type");
        });
    }
    private _appear(coordinate: number[]) {
        var targetCellCoordinates = this._getValidCellCoordinates(coordinate);
        targetCellCoordinates.forEach((cellCoordinate) => {
            this.parentCenter.cellMatrix.get(cellCoordinate).setAttribute("data-tetris-cell-type", this.blockType);
        });
        this._coordinate = coordinate;
    }
    private _getValidCellCoordinates(coordinate: number[]) {
        var cellCoordinates: number[][] = [];
        var reference = this.getPositionReferencePoint();
        var mapSize = this.parentCenter.cellMatrix.size;

        this.structure.forEach((item, structuralCoordinate) => {
            if (item) {
                var cellCoordinate = structuralCoordinate.map((n, i) => n + (coordinate[i] - 1) - (reference[i] - 1));
                if (cellCoordinate.every((n, i) => n >= 1 && n <= mapSize[i]))
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