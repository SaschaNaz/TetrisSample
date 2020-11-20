class Assert {
    static assertArray(array: number[], length: number) {
        if (!Array.isArray(array) || array.length != length)
            throw new Error("Invalid parameter, expected "+length+"-dimensional array.");
    }
}
interface TetrisCell extends HTMLDivElement {
    dataset: DOMStringMap & TetrisCellDataset;
}
interface TetrisCellDataset {
    tetrisCellType: string;
}

class TetrisMatrixSetter {
    static morph(div: HTMLDivElement, size: number[]) {
        Assert.assertArray(size, 2);
        div.style.display = "grid";
        div.style.gridTemplateRows = `repeat(${size[0].toFixed(0)}, 1fr)`;
        div.style.gridTemplateColumns = `repeat(${size[1].toFixed(0)}, 1fr)`;

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
            cellMatrix.set(coordinate.map((n) => n + 1), cell);
            div.appendChild(cell);
        });

        return cellMatrix;
    }
    private static _createCell(coordinate: number[]) {
        Assert.assertArray(coordinate, 2);
        var cell = document.createElement("div");
        cell.style.gridRow = String(coordinate[0] + 1);
        cell.style.gridColumn = String(coordinate[1] + 1);
        return <TetrisCell>cell;
    }
}
