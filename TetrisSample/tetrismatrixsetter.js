var TetrisMatrixSetter = (function () {
    function TetrisMatrixSetter() {
    }
    TetrisMatrixSetter._assert2DArray = function (array) {
        if (!Array.isArray(array) || array.length != 2)
            throw new Error("'size' should be two-dimensional size array.");
    };
    TetrisMatrixSetter.set = function (div, size) {
        if (div.__proto__ !== HTMLDivElement.prototype)
            throw new Error("'div' should be HTMLDivElement");
        this._assert2DArray(size);
        div.style.display = "-ms-grid";
        div.style.msGridRows = this._generateGridPartitionString(size[0]);
        div.style.msGridColumns = this._generateGridPartitionString(size[1]);
        this._appendCells(div, size);
    };
    TetrisMatrixSetter.release = function (div) {
        div.style.display = "";
        while (div.firstChild)
            div.removeChild(div.firstChild);
    };
    TetrisMatrixSetter._appendCells = function (div, size) {
        var _this = this;
        Multidimension.forEach(size, function (coordinate) {
            div.appendChild(_this._createCell(coordinate));
        });
    };
    TetrisMatrixSetter._createCell = function (coordinate) {
        this._assert2DArray(coordinate);
        var cell = document.createElement("div");
        cell.style.msGridRow = coordinate[0] + 1;
        cell.style.msGridColumn = coordinate[1] + 1;
        return cell;
    };
    TetrisMatrixSetter._generateGridPartitionString = function (partitions) {
        var result = [];
        for (var i = 0; i < partitions; i++)
            result.push('1fr');
        return result.join(' ');
    };
    return TetrisMatrixSetter;
})();
//# sourceMappingURL=tetrismatrixsetter.js.map
