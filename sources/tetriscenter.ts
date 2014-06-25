class TetrisCenter {
    morphedDiv: HTMLDivElement;
    cellMatrix: Matrix<TetrisCell>;
    currentControllingBlock: TetrisBlock;

    createBlock(charType: "madoka"): MadokaBlock
    createBlock(charType: "homura"): HomuraBlock
    createBlock(charType: "sayaka"): SayakaBlock
    createBlock(charType: "kyouko"): KyoukoBlock
    createBlock(charType: "mami"): MamiBlock
    createBlock(charType: "nagisa"): NagisaBlock
    createBlock(charType: "kyubey"): KyubeyBlock
    createBlock(charType: string): TetrisBlock
    createBlock(charType: string) {
        var blockTypeOf = ((): typeof TetrisBlock => {
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
        this.currentControllingBlock = block;
        return block;
    }
    createRandomBlock() {
        var types = ["madoka", "homura", "sayaka", "kyouko", "mami", "nagisa", "kyubey"];
        return this.createBlock(types[Math.floor(Math.random() * types.length)]);
    }

    isAvailable(...coordinates: number[][]) {
        for (var i = 0; i < coordinates.length; i++) {
            var coordinate = coordinates[i].slice().reverse();
            if (!this.cellMatrix.get([coordinate[0], coordinate[1]]).dataset.tetrisCellType)
                return false;
        }
        return true;
    }
} 