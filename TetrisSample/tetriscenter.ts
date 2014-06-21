class TetrisCenter {
    morphedDiv: HTMLDivElement;

    createCharacter(charType: "madoka"): MadokaBlock
    createCharacter(charType: "homura"): HomuraBlock
    createCharacter(charType: "sayaka"): SayakaBlock
    createCharacter(charType: "kyouko"): KyoukoBlock
    createCharacter(charType: "mami"): MamiBlock
    createCharacter(charType: "nagisa"): NagisaBlock
    createCharacter(charType: "kyubey"): KyubeyBlock
    createCharacter(charType: string): TetrisBlock
    createCharacter(charType: string) {
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
        block.parentMap = this.morphedDiv;
        return block;
    }

    isAvailable(...coordinates: number[][]) {
        for (var i = 0; i < coordinates.length; i++) {
            var coordinate = coordinates[i];
            
        }
    }
} 