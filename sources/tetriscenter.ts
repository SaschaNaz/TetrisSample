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

    removeFullLines() {
        var topRow = this.currentControllingBlock.getTopLeftCoordinate()[0];
        var rowLength = this.currentControllingBlock.structure.size[0];

    }

    isLineFull(row: number) {
        //var columnLength = this.cellMatrix.size[1];
        //for (var i = 1; i <= columnLength; i++) {
        //    if (!this.cellMatrix.get([row, i]).dataset.tetrisCellType)

        //}
    }

    isSpaceAvailable(coordinates: number[][]) {
        var map = this.cellMatrix;
        var mapSize = map.size;
        return coordinates.every(
            (cellCoordinate) => cellCoordinate.every((n, i) => n >= 1 && n <= mapSize[i])
                && !map.get(cellCoordinate).dataset.tetrisCellType);
    }
} 