class Assert {
    static assertArray(array: number[], length: number) {
        if (!Array.isArray(array) || array.length != length)
            throw new Error("Invalid parameter, expected "+length+"-dimensional array.");
    }
}

class TetrisMatrixSetter {
    static morph(div: HTMLDivElement, size: number[]) {
        if (div.__proto__ !== HTMLDivElement.prototype)
            throw new Error("'div' should be HTMLDivElement");
        Assert.assertArray(size, 2);
        div.style.display = "-ms-grid";
        div.style.msGridRows = this._generateGridPartitionString(size[0]);
        div.style.msGridColumns = this._generateGridPartitionString(size[1]);
        this._appendCells(div, size);

        var tetrisCenter = new TetrisCenter();
        tetrisCenter.morphedDiv = div;
        return tetrisCenter;
    }
    static release(div: HTMLDivElement) {
        div.style.display = "";
        while (div.firstChild)
            div.removeChild(div.firstChild);
    }
    private static _appendCells(div: HTMLDivElement, size: number[]) {
        Multidimension.forEach(size, (coordinate) => {
            div.appendChild(this._createCell(coordinate));
        });
    }
    private static _createCell(coordinate: number[]) {
        Assert.assertArray(coordinate, 2);
        var cell = document.createElement("div");
        cell.style.msGridRow = coordinate[0] + 1;
        cell.style.msGridColumn = coordinate[1] + 1;
        return cell;
    }
    private static _generateGridPartitionString(partitions: number) {
        var result: string[] = [];
        for (var i = 0; i < partitions; i++)
            result.push('1fr');
        return result.join(' ');
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

class TetrisBlock {
    structure: boolean[][];
    blockType: string;
    parentMap: HTMLDivElement;

    moveBy(relativeCoordinate: number[]) {
        Assert.assertArray(relativeCoordinate, 2);


    }
}

class MadokaBlock extends TetrisBlock {
    structure = [
        [true, true, true, true]
    ];
    blockType = TetrisBlockTypes.Madoka;
}


class HomuraBlock extends TetrisBlock {
    structure = [
        [true, true],
        [true, true]
    ];
    color = TetrisBlockTypes.Homura;
}

class SayakaBlock extends TetrisBlock {
    structure = [
        [true, true, true],
        [false, false, true]
    ];
    color = TetrisBlockTypes.Sayaka
}

class KyoukoBlock extends TetrisBlock  {
    structure = [
        [true, true, true],
        [true, false, false]
    ];
    color = TetrisBlockTypes.Kyouko;
}

class MamiBlock extends TetrisBlock  {
    structure = [
        [false, true, true],
        [true, true, false]
    ];
    color = TetrisBlockTypes.Mami;
}

class NagisaBlock extends TetrisBlock {
    structure = [
        [true, true, false],
        [false, true, true]
    ];
    color = TetrisBlockTypes.Nagisa;
}

class KyubeyBlock extends TetrisBlock {
    structure = [
        [true, true, true],
        [false, true, false]
    ];
    color = TetrisBlockTypes.Kyubey;
}