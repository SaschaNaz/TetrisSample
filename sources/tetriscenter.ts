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

        for (var row = topRow; row <= topRow + (rowLength - 1); row++) {
            var rowCells = this.getRowCells(row);
            if (this.isSpaceFull(rowCells)) {
                rowCells.forEach((cellCoordinate) => this.cellMatrix.get(cellCoordinate).removeAttribute("data-tetris-cell-type"));
                this._shiftRowsDown(row + 1);
            }
        }
    }

    _shiftRowsDown(targetBottomRow: number) {

    }

    getRowCells(row: number) {
        var columnLength = this.cellMatrix.size[1];
        var rowCells: number[][] = [];
        for (var column = 1; column <= columnLength; column++)
            rowCells.push([row, column]);
        return rowCells;
    }

    isSpaceFull(coordinates: number[][]) {
        var map = this.cellMatrix;
        var mapSize = map.size;
        return coordinates.every(
            (cellCoordinate) =>
                cellCoordinate.every((n, i) => n >= 1 && n <= mapSize[i])
                && !!map.get(cellCoordinate).dataset.tetrisCellType);
    }

    isSpaceAvailable(coordinates: number[][]) {
        var map = this.cellMatrix;
        var mapSize = map.size;
        return coordinates.every(
            (cellCoordinate) =>
                cellCoordinate.every((n, i) => n >= 1 && n <= mapSize[i])
                && !map.get(cellCoordinate).dataset.tetrisCellType);
    }
} 