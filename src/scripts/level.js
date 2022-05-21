function loadLevel(campaign, stageIndex) {
    let stage = campaign['stages'][stageIndex];
    let currLevel = stage[Math.floor(Math.random() * stage.length)]
    let level = {
        tiles: [],
        enemies: [],
        layers: currLevel,
        prefabs: campaign.settings.prefabs.reduce((obj,curr) => obj[curr.name] = curr),
        spriteSheet: loadImage(
            campaign['settings']['spriteSheet'],
            processImage
        ),
    };
  console.log(level.prefabs)
    // console.log(stage + '\n');
    currLevel.forEach((layer, layerIndex) => {
        layer.forEach((line, lineIndex) => {
            let cells = line.split('#');
            cells.forEach((cell, pos) => {
                if (cell !== 'NOT') {
                    if (!level.prefabs[cell]) {
                        level.prefabs[
                            cell
                        ] = campaign.settings.prefabs.find(
                            (prefab) => {
                                return prefab.name === cell;
                            }
                        );
                    }
                if(level.prefabs[cell].type == "enemie"){
                  level.enemies.push(createEnemie(pos * 16,lineIndex * 16,1,2,0,0.5,cell))
                } else if(level.prefabs[cell].type == "tile"){
                    level.tiles.push({
                        x: pos * 16,
                        y: lineIndex * 16,
                        layer: layerIndex,
                        name: cell,
                        currSprite: 0,
                        eachs: [],
                        collide: false,
                        touch: false,
                        dangerous: (level.prefabs[cell].hasOwnProperty('dangerous') ? level.prefabs[cell].dangerous : false),
                        hitted: false
                    });
                    if(level.prefabs[level.tiles[level.tiles.length-1]['name']]['events']!=null && level.prefabs[level.tiles[level.tiles.length-1]['name']]['events']['start']){
                    
                    event(level.prefabs[level.tiles[level.tiles.length-1]['name']]['events']['start'],level.tiles[level.tiles.length-1],null,null);
                }
                }
                }
            });
        });
    });
    console.log(level);
    return level;
}
function updateLevel(level, ctx) {
    let prefabs = level.prefabs;
    ctx.save();
    ctx.scale(2, 2);
    level.tiles.forEach((cell) => {
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
    if(cell.collide && !cell.touch){
      cell.touch = true;
      if(level.prefabs[cell['name']]['events'] != null && level.prefabs[cell['name']]['events']['touch']){
      console.log('jkodbuidgni');
      event(level.prefabs[cell['name']]['events']['touch'],cell,player,null);
    }
    }
    if(!cell.collide){
      cell.touch = false;
    }
  if(level.prefabs[cell['name']]['events']!=null && level.prefabs[cell['name']]['events']['collide'] && cell.collide){

            console.log('jksfbhskgjkghbjkjhkjdfhgdfklhgkldfhhgfkhbfkhjlfghlf10000');
          event(level.prefabs[cell['name']]['events']['collide'],cell,player,null);
  }
    });
      ctx.restore();
  return level;
}
