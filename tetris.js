﻿var center;
document.addEventListener("DOMContentLoaded", function () {
    center = TetrisMatrixSetter.morph(content, [15, 10]);
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
                return n + 1;
            }), cell);
            div.appendChild(cell);
        });

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
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TetrisBlock = (function () {
    function TetrisBlock() {
    }
    Object.defineProperty(TetrisBlock.prototype, "coordinate", {
        get: function () {
            return this._coordinate.slice();
        },
        enumerable: true,
        configurable: true
    });

    TetrisBlock.prototype.getPositionReferencePoint = function () {
        return [];
    };

    TetrisBlock.prototype.initialize = function () {
        var reference = this.getPositionReferencePoint();
        var size = this.structure.size;
        this._appear([
            1 - (size[0] - 1) + (reference[0] - 1),
            1 + Math.floor((this.parentCenter.cellMatrix.size[1] - size[1]) / 2) + (reference[1] - 1)
        ]);
    };

    TetrisBlock.prototype.moveLeft = function () {
        return this._moveBy([0, -1]);
    };
    TetrisBlock.prototype.moveRight = function () {
        return this._moveBy([0, 1]);
    };
    TetrisBlock.prototype.moveDown = function () {
        return this._moveBy([1, 0]);
    };

    /**
    @return Whether the movement succeeded or not.
    */
    TetrisBlock.prototype._moveBy = function (relativeCoordinate) {
        Assert.assertArray(relativeCoordinate, 2);

        var resultCoordinate = this.coordinate.map(function (n, i) {
            return n + relativeCoordinate[i];
        });
        this._disappear();
        if (this._isSpaceAvailable(resultCoordinate)) {
            this._appear(resultCoordinate);
            return true;
        } else {
            this._appear(this.coordinate);
            return false;
        }
    };

    TetrisBlock.prototype._isSpaceAvailable = function (coordinate) {
        var map = this.parentCenter.cellMatrix;
        var mapSize = map.size;
        return this._getComputedCellCoordinates(coordinate).every(function (cellCoordinate) {
            return cellCoordinate.every(function (n, i) {
                return n >= 1 && n <= mapSize[i];
            }) && !map.get(cellCoordinate).dataset.tetrisCellType;
        });
    };

    TetrisBlock.prototype.rotate = function () {
        var base = this.structure;
        var rotated = new Matrix(base.size.slice().reverse());
        var rotatedSize = rotated.size;

        base.forEach(function (item, coordinate) {
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
    };

    TetrisBlock.prototype._disappear = function () {
        var _this = this;
        var filled = this._getComputedCellCoordinates(this.coordinate);
        filled.forEach(function (cellCoordinate) {
            _this.parentCenter.cellMatrix.get(cellCoordinate).removeAttribute("data-tetris-cell-type");
        });
    };
    TetrisBlock.prototype._appear = function (coordinate) {
        var _this = this;
        var targetCellCoordinates = this._getComputedCellCoordinates(coordinate);
        targetCellCoordinates.forEach(function (cellCoordinate) {
            _this.parentCenter.cellMatrix.get(cellCoordinate).setAttribute("data-tetris-cell-type", _this.blockType);
        });
        this._coordinate = coordinate;
    };

    /**
    Get cell coordinates inside the map if we assume that the block is in the specified coordinate.
    */
    TetrisBlock.prototype._getComputedCellCoordinates = function (coordinate) {
        var cellCoordinates = [];
        var reference = this.getPositionReferencePoint();

        this.structure.forEach(function (item, structuralCoordinate) {
            if (item) {
                var cellCoordinate = structuralCoordinate.map(function (n, i) {
                    return n + (coordinate[i] - 1) - (reference[i] - 1);
                });
                if (cellCoordinate[0] >= 1)
                    cellCoordinates.push(cellCoordinate);
            }
        });

        return cellCoordinates;
    };
    return TetrisBlock;
})();

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
    MadokaBlock.prototype.getPositionReferencePoint = function () {
        var size = this.structure.size;
        if (size[0] == 1)
            return [1, 2];
        else
            return [2, 1];
    };
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
        this.blockType = TetrisBlockTypes.Homura;
    }
    HomuraBlock.prototype.getPositionReferencePoint = function () {
        return [1, 1];
    };
    return HomuraBlock;
})(TetrisBlock);

var SayakaBlock = (function (_super) {
    __extends(SayakaBlock, _super);
    function SayakaBlock() {
        _super.apply(this, arguments);
        this.structure = new Matrix([3, 3], [
            false, false, false,
            true, true, true,
            false, false, true
        ]);
        this.blockType = TetrisBlockTypes.Sayaka;
    }
    SayakaBlock.prototype.getPositionReferencePoint = function () {
        return [1, 1];
    };
    return SayakaBlock;
})(TetrisBlock);

var KyoukoBlock = (function (_super) {
    __extends(KyoukoBlock, _super);
    function KyoukoBlock() {
        _super.apply(this, arguments);
        this.structure = new Matrix([3, 3], [
            false, false, false,
            true, true, true,
            true, false, false
        ]);
        this.blockType = TetrisBlockTypes.Kyouko;
    }
    KyoukoBlock.prototype.getPositionReferencePoint = function () {
        return [1, 1];
    };
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
        this.blockType = TetrisBlockTypes.Mami;
    }
    MamiBlock.prototype.getPositionReferencePoint = function () {
        var size = this.structure.size;
        if (size[0] == 2)
            return [2, 3];
        else
            return [3, 2];
    };
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
        this.blockType = TetrisBlockTypes.Nagisa;
    }
    NagisaBlock.prototype.getPositionReferencePoint = function () {
        var size = this.structure.size;
        if (size[0] == 2)
            return [2, 3];
        else
            return [3, 2];
    };
    return NagisaBlock;
})(TetrisBlock);

var KyubeyBlock = (function (_super) {
    __extends(KyubeyBlock, _super);
    function KyubeyBlock() {
        _super.apply(this, arguments);
        this.structure = new Matrix([3, 3], [
            false, false, false,
            true, true, true,
            false, true, false
        ]);
        this.blockType = TetrisBlockTypes.Kyubey;
    }
    KyubeyBlock.prototype.getPositionReferencePoint = function () {
        return [1, 1];
    };
    return KyubeyBlock;
})(TetrisBlock);
var TetrisCenter = (function () {
    function TetrisCenter() {
    }
    TetrisCenter.prototype.createBlock = function (charType) {
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
        block.parentCenter = this;
        block.initialize();
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
//# sourceMappingURL=tetris.js.map
