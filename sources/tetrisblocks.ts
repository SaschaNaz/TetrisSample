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
}


class HomuraBlock extends TetrisBlock {
    structure = new Matrix([2, 2], [
        true, true,
        true, true
    ]);

    color = TetrisBlockTypes.Homura;
}

class SayakaBlock extends TetrisBlock {
    structure = new Matrix([2, 3], [
        true, true, true,
        false, false, true
    ]);
    color = TetrisBlockTypes.Sayaka
}

class KyoukoBlock extends TetrisBlock {
    structure = new Matrix([2, 3], [
        true, true, true,
        true, false, false
    ]);
    color = TetrisBlockTypes.Kyouko;
}

class MamiBlock extends TetrisBlock {
    structure = new Matrix([2, 3], [
        false, true, true,
        true, true, false
    ]);
    color = TetrisBlockTypes.Mami;
}

class NagisaBlock extends TetrisBlock {
    structure = new Matrix([2, 3], [
        true, true, false,
        false, true, true
    ]);
    color = TetrisBlockTypes.Nagisa;
}

class KyubeyBlock extends TetrisBlock {
    structure = new Matrix([2, 3], [
        true, true, true,
        false, true, false
    ]);
    color = TetrisBlockTypes.Kyubey;
}

class TetrisBlock {
    structure: Matrix<boolean>;
    blockType: string;
    parentMap: HTMLDivElement;
    coordinate: number[];

    rotationReferencePoint: number[];
    positionReferencePoint: number[];

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
        this._appear([this.coordinate[0] + size[0], this.coordinate[1]]);
    }

    private _disappear() {
    }
    private _appear(coordinate: number[]) {
    }
}
