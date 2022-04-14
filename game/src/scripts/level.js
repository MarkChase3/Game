function loadLevel(campaign, stageIndex) {
    let stage = campaign['stages'][stageIndex];
    let level = stage[Math.floor(Math.random()*6478178)%stage.length];
    let tiles = {
        tilesObjects: [],
        tilesPrefabs: {},
        spritesheet: loadImage(campaign['settings']['tiles']['spriteSheet'])
    };
    // console.log(stage + '\n');
    level.forEach((layer) => {
        layer.forEach((line, lineIndex) => {
            let cells = line.split('#');
            cells.forEach((cell, pos) => {
                if (!tiles.tilesPrefabs[cell]) {
                    tiles.tilesPrefabs[
                        cell
                    ] = campaign.settings.tiles.tilesPrefabs.find((prefab) => {
                        return prefab.name === cell;
                    });
                }
                tiles.tilesObjects.push({
                    type: cell,
                    x: pos * 16,
                    y: lineIndex * 16,
                });
            });
        });
    });
    console.log(tiles);
    return tiles;
}
function updateLevel(level,ctx){
    let prefabs = level.tilesPrefabs;
    level.tilesObjects.forEach( cell => {
            ctx.drawImage(prefabs[cell.type].sprite
        })
    })
}