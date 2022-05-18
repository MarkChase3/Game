function loadLevel(campaign, stageIndex) {
    let stage = campaign['stages'][stageIndex];
    let level = stage[Math.floor(Math.random() * 6478178) % stage.length];
    let tiles = {
        tilesObjects: [],
        tilesPrefabs: {},
        spriteSheet: loadImage(
            campaign['settings']['tiles']['spriteSheet'],
            processImage
        ),
    };
    // console.log(stage + '\n');
    level.forEach((layer, layerIndex) => {
        layer.forEach((line, lineIndex) => {
            let cells = line.split('#');
            cells.forEach((cell, pos) => {
                if (cell !== 'NOT') {
                    if (!tiles.tilesPrefabs[cell]) {
                        tiles.tilesPrefabs[
                            cell
                        ] = campaign.settings.tiles.tilesPrefabs.find(
                            (prefab) => {
                                return prefab.name === cell;
                            }
                        );
                    }
                    tiles.tilesObjects.push({
                        type: cell,
                        x: pos * 16,
                        y: lineIndex * 16,
                        layer: layerIndex,
                        name: cell,
                      currSprite: 0,
                      eachs: []
                    });
                }
            });
        });
    });
    console.log(tiles);
    return tiles;
}
function updateLevel(level, ctx) {
    let prefabs = level.tilesPrefabs;
    ctx.save();
    ctx.scale(2, 2);
    level.tilesObjects.forEach((cell) => {
        ctx.drawImage(
            level.spriteSheet,
            prefabs[cell.type].sprite[cell.currSprite][0],
            prefabs[cell.type].sprite[cell.currSprite][1],
            prefabs[cell.type].sprite[cell.currSprite][2],
            prefabs[cell.type].sprite[cell.currSprite][3],
            cell.x,
            cell.y,
            16,
            16
        );
    });
    ctx.restore();
    return level;
}
