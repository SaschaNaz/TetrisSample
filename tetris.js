document.addEventListener("DOMContentLoaded", function () {
    TetrisMatrixSetter.morph(content, [15, 10]);
});
var Multidimension = (function () {
    function Multidimension() {
    }
    Multidimension.forEach = function (size, callbackfn) {
        var stack = [size];

        var indices = [];
        var currentIndex = 0;

        var dimension = size.length;
        while (stack.length > 0) {
            if (currentIndex < size[indices.length]) {
                if (stack.length == dimension) {
                    callbackfn(indices.concat(currentIndex));
                    currentIndex++;
                } else {
                    stack.unshift(stack[0][currentIndex]);
                    indices.push(currentIndex);
                    currentIndex = 0;
                }
            } else {
                stack.shift();
                currentIndex = indices.pop() + 1;
            }
        }
    };
    return Multidimension;
})();
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TetrisBlockTypes = (function () {
    function TetrisBlockTypes() {
    }
    TetrisBlockTypes.Madoka = "madoka";
    TetrisBlockTypes.Homura = "homura";
    TetrisBlockTypes.Sayaka = "sayaka";
    TetrisBlockTypes.Kyouko = "kyouko";
    TetrisBlockTypes.Mami = "mami";
    TetrisBlockTypes.Nagisa = "nagisa";
    TetrisBlockTypes.Kyubey = "kyubey";
    return TetrisBlockTypes;
})();

var MadokaBlock = (function (_super) {
    __extends(MadokaBlock, _super);
    function MadokaBlock() {
        _super.apply(this, arguments);
        this.structure = new Matrix([1, 4], [
            true, true, true, true
        ]);
        this.blockType = TetrisBlockTypes.Madoka;
    }
    return MadokaBlock;
})(TetrisBlock);

var HomuraBlock = (function (_super) {
    __extends(HomuraBlock, _super);
    function HomuraBlock() {
        _super.apply(this, arguments);
        this.structure = new Matrix([2, 2], [
            true, true,
            true, true
        ]);
        this.color = TetrisBlockTypes.Homura;
    }
    return HomuraBlock;
})(TetrisBlock);

var SayakaBlock = (function (_super) {
    __extends(SayakaBlock, _super);
    function SayakaBlock() {
        _super.apply(this, arguments);
        this.structure = new Matrix([2, 3], [
            true, true, true,
            false, false, true
        ]);
        this.color = TetrisBlockTypes.Sayaka;
    }
    return SayakaBlock;
})(TetrisBlock);

var KyoukoBlock = (function (_super) {
    __extends(KyoukoBlock, _super);
    function KyoukoBlock() {
        _super.apply(this, arguments);
        this.structure = new Matrix([2, 3], [
            true, true, true,
            true, false, false
        ]);
        this.color = TetrisBlockTypes.Kyouko;
    }
    return KyoukoBlock;
})(TetrisBlock);

var MamiBlock = (function (_super) {
    __extends(MamiBlock, _super);
    function MamiBlock() {
        _super.apply(this, arguments);
        this.structure = new Matrix([2, 3], [
            false, true, true,
            true, true, false
        ]);
        this.color = TetrisBlockTypes.Mami;
    }
    return MamiBlock;
})(TetrisBlock);

var NagisaBlock = (function (_super) {
    __extends(NagisaBlock, _super);
    function NagisaBlock() {
        _super.apply(this, arguments);
        this.structure = new Matrix([2, 3], [
            true, true, false,
            false, true, true
        ]);
        this.color = TetrisBlockTypes.Nagisa;
    }
    return NagisaBlock;
})(TetrisBlock);

var KyubeyBlock = (function (_super) {
    __extends(KyubeyBlock, _super);
    function KyubeyBlock() {
        _super.apply(this, arguments);
        this.structure = new Matrix([2, 3], [
            true, true, true,
            false, true, false
        ]);
        this.color = TetrisBlockTypes.Kyubey;
    }
    return KyubeyBlock;
})(TetrisBlock);

var TetrisBlock = (function () {
    function TetrisBlock() {
    }
    TetrisBlock.prototype.moveBy = function (relativeCoordinate) {
        Assert.assertArray(relativeCoordinate, 2);
    };

    TetrisBlock.prototype.rotate = function () {
        var base = this.structure;
        var size = base.size;
        var rotated = new Matrix(base.size.slice().reverse());

        base.forEach(function (item, coordinate) {
            var newCoordinate = [];
            newCoordinate[0] = coordinate[1];
            newCoordinate[1] = size[1] - coordinate[0] + 1;
        });

        this._disappear();
        this.structure = rotated;

        //
        this._appear([this.coordinate[0] + size[0], this.coordinate[1]]);
    };

    TetrisBlock.prototype._disappear = function () {
    };
    TetrisBlock.prototype._appear = function (coordinate) {
    };
    return TetrisBlock;
})();
var TetrisCenter = (function () {
    function TetrisCenter() {
    }
    TetrisCenter.prototype.createCharacter = function (charType) {
        var blockTypeOf = (function () {
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
        block.parentMap = this.morphedDiv;
        return block;
    };

    TetrisCenter.prototype.isAvailable = function () {
        var coordinates = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            coordinates[_i] = arguments[_i + 0];
        }
        for (var i = 0; i < coordinates.length; i++) {
            var coordinate = coordinates[i].slice().reverse();
            if (!this.cellMatrix.get([coordinate[0], coordinate[1]]).dataset.tetrisCellType)
                return false;
        }
        return true;
    };
    return TetrisCenter;
})();
var Assert = (function () {
    function Assert() {
    }
    Assert.assertArray = function (array, length) {
        if (!Array.isArray(array) || array.length != length)
            throw new Error("Invalid parameter, expected " + length + "-dimensional array.");
    };
    return Assert;
})();

var TetrisMatrixSetter = (function () {
    function TetrisMatrixSetter() {
    }
    TetrisMatrixSetter.morph = function (div, size) {
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
    };
    TetrisMatrixSetter.release = function (div) {
        div.style.display = "";
        while (div.firstChild)
            div.removeChild(div.firstChild);
    };
    TetrisMatrixSetter._appendCells = function (div, size) {
        var _this = this;
        var cellMatrix = new Matrix(size);

        Multidimension.forEach(size, function (coordinate) {
            var cell = _this._createCell(coordinate);
            cellMatrix.set(coordinate.map(function (n) {
                return n - 1;
            }), cell);
            div.appendChild(cell);
        });
        cellMatrix.push(cellRow);

        return cellMatrix;
    };
    TetrisMatrixSetter._createCell = function (coordinate) {
        Assert.assertArray(coordinate, 2);
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
//# sourceMappingURL=tetris.js.map
