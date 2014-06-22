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
//# sourceMappingURL=tetrisblocks.js.map
