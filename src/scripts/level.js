function loadLevel(campaign, stageIndex) {
    let stage = campaign['stages'][stageIndex];
    let level = stage[Math.floor(Math.random() * stage.length)];
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
                        x: pos * 16,
                        y: lineIndex * 16,
                        layer: layerIndex,
                        name: cell,
                        currSprite: 0,
                        eachs: [],
                        collide: false,
                        touch: false
                    });
                    if(tiles.tilesPrefabs[tiles.tilesObjects[tiles.tilesObjects.length-1]['name']]['events']!=null && tiles.tilesPrefabs[tiles.tilesObjects[tiles.tilesObjects.length-1]['name']]['events']['start']){
                      console.log(tiles.tilesPrefabs[tiles.tilesObjects[tiles.tilesObjects.length-1]['name']])
                    event(tiles.tilesPrefabs[tiles.tilesObjects[tiles.tilesObjects.length-1]['name']]['events']['start'],tiles.tilesObjects[tiles.tilesObjects.length-1],null,null);
                }
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
            prefabs[cell.name].sprite[cell.currSprite][0],
            prefabs[cell.name].sprite[cell.currSprite][1],
            prefabs[cell.name].sprite[cell.currSprite][2],
            prefabs[cell.name].sprite[cell.currSprite][3],
            cell.x,
            cell.y,
            16,
            16
        );
    if(level.tilesPrefabs[cell['name']]['events'] != null && level.tilesPrefabs[cell['name']]['events']['touch'] && cell.collide && !cell.touch){
      cell.touch = true;
      console.log('jkodbuidgni');
      event(level.tilesPrefabs[cell['name']]['events']['touch'],cell,player,null);
    }
    if(!cell.collide){
      cell.touch = false;
    }
  if(level.tilesPrefabs[cell['name']]['events']!=null && level.tilesPrefabs[cell['name']]['events']['collide'] && cell.collide){

            console.log('jksfbhskgjkghbjkjhkjdfhgdfklhgkldfhhgfkhbfkhjlfghlf10000');
          event(level.tilesPrefabs[cell['name']]['events']['collide'],cell,player,null);
  }
    });
      ctx.restore();
  return level;
}
