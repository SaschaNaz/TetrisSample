class Assert {
    static assertArray(array: number[], length: number) {
        if (!Array.isArray(array) || array.length != length)
            throw new Error("Invalid parameter, expected "+length+"-dimensional array.");
    }
}
interface TetrisCell extends HTMLDivElement {
    dataset: TetrisCellDataset;
}
interface TetrisCellDataset {
    tetrisCellType: string;
}

class TetrisMatrixSetter {
    static morph(div: HTMLDivElement, size: number[]) {
        if (div.__proto__ !== HTMLDivElement.prototype)
            throw new Error("'div' should be HTMLDivElement");
        Assert.assertArray(size, 2);
        div.style.display = "-ms-grid";
        div.style.msGridRows = this._generateGridPartitionString(size[0]);
        div.style.msGridColumns = this._generateGridPartitionString(size[1]);

        var tetrisCenter = new TetrisCenter();
        tetrisCenter.morphedDiv = div;
        tetrisCenter.cellMatrix = this._appendCells(div, size);
        return tetrisCenter;
    }
    static release(div: HTMLDivElement) {
        div.style.display = "";
        while (div.firstChild)
            div.removeChild(div.firstChild);
    }
    private static _appendCells(div: HTMLDivElement, size: number[]) {
        var cellMatrix = new Matrix<TetrisCell>(size);

        Multidimension.forEach(size, (coordinate) => {
            var cell = this._createCell(coordinate);
            cellMatrix.set(coordinate.map((n) => n - 1), cell);
            div.appendChild(cell);
        });

        return cellMatrix;
    }
    private static _createCell(coordinate: number[]) {
        Assert.assertArray(coordinate, 2);
        var cell = document.createElement("div");
        cell.style.msGridRow = coordinate[0] + 1;
        cell.style.msGridColumn = coordinate[1] + 1;
        return <TetrisCell>cell;
    }
    private static _generateGridPartitionString(partitions: number) {
        var result: string[] = [];
        for (var i = 0; i < partitions; i++)
            result.push('1fr');
        return result.join(' ');
    }
}