class TetrisBlock {
    structure: Matrix<boolean>;
    blockType: string;
    parentMap: HTMLDivElement;
    coordinate: number[];

    getPositionReferencePoint(): number[] {
        return [];
    }

    moveBy(relativeCoordinate: number[]) {
        Assert.assertArray(relativeCoordinate, 2);


    }

    rotate() {
        var base = this.structure;
        var size = base.size;
        var rotated = new Matrix<boolean>(base.size.slice().reverse());

        base.forEach((item, coordinate) => {
            var newCoordinate: number[] = [];
            newCoordinate[0] = coordinate[1];
            newCoordinate[1] = size[1] - coordinate[0] + 1;
        });

        this._disappear();
        this.structure = rotated;

        //
        this._appear(this.coordinate);
    }

    private _disappear() {
        var filled = this._getFilledCellCoordinates();
    }
    private _appear(coordinate: number[]) {
    }
    private _getFilledCellCoordinates() {
        var cellCoordinates: number[][] = [];
        var blockCoordinate = this.coordinate;
        var positionReferencePoint = this.getPositionReferencePoint();

        this.structure.forEach((item, structuralCoordinate) => {
            if (item) {
                var cellCoordinate = structuralCoordinate.map((n, i) => n + (blockCoordinate[i] - 1) - (positionReferencePoint[i] - 1));
                if (cellCoordinate.every((n) => n >= 1))
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