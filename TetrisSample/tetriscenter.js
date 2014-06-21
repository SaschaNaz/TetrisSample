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
            var coordinate = coordinates[i];
        }
    };
    return TetrisCenter;
})();
//# sourceMappingURL=tetriscenter.js.map
