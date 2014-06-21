var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
        this._appendCells(div, size);

        var tetrisCenter = new TetrisCenter();
        tetrisCenter.morphedDiv = div;
        return tetrisCenter;
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

var TetrisBlock = (function () {
    function TetrisBlock() {
    }
    TetrisBlock.prototype.moveBy = function (relativeCoordinate) {
        Assert.assertArray(relativeCoordinate, 2);
    };
    return TetrisBlock;
})();

var MadokaBlock = (function (_super) {
    __extends(MadokaBlock, _super);
    function MadokaBlock() {
        _super.apply(this, arguments);
        this.structure = [
            [true, true, true, true]
        ];
        this.blockType = TetrisBlockTypes.Madoka;
    }
    return MadokaBlock;
})(TetrisBlock);

var HomuraBlock = (function (_super) {
    __extends(HomuraBlock, _super);
    function HomuraBlock() {
        _super.apply(this, arguments);
        this.structure = [
            [true, true],
            [true, true]
        ];
        this.color = TetrisBlockTypes.Homura;
    }
    return HomuraBlock;
})(TetrisBlock);

var SayakaBlock = (function (_super) {
    __extends(SayakaBlock, _super);
    function SayakaBlock() {
        _super.apply(this, arguments);
        this.structure = [
            [true, true, true],
            [false, false, true]
        ];
        this.color = TetrisBlockTypes.Sayaka;
    }
    return SayakaBlock;
})(TetrisBlock);

var KyoukoBlock = (function (_super) {
    __extends(KyoukoBlock, _super);
    function KyoukoBlock() {
        _super.apply(this, arguments);
        this.structure = [
            [true, true, true],
            [true, false, false]
        ];
        this.color = TetrisBlockTypes.Kyouko;
    }
    return KyoukoBlock;
})(TetrisBlock);

var MamiBlock = (function (_super) {
    __extends(MamiBlock, _super);
    function MamiBlock() {
        _super.apply(this, arguments);
        this.structure = [
            [false, true, true],
            [true, true, false]
        ];
        this.color = TetrisBlockTypes.Mami;
    }
    return MamiBlock;
})(TetrisBlock);

var NagisaBlock = (function (_super) {
    __extends(NagisaBlock, _super);
    function NagisaBlock() {
        _super.apply(this, arguments);
        this.structure = [
            [true, true, false],
            [false, true, true]
        ];
        this.color = TetrisBlockTypes.Nagisa;
    }
    return NagisaBlock;
})(TetrisBlock);

var KyubeyBlock = (function (_super) {
    __extends(KyubeyBlock, _super);
    function KyubeyBlock() {
        _super.apply(this, arguments);
        this.structure = [
            [true, true, true],
            [false, true, false]
        ];
        this.color = TetrisBlockTypes.Kyubey;
    }
    return KyubeyBlock;
})(TetrisBlock);
//# sourceMappingURL=tetris.js.map
