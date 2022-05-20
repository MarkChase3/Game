function createPlayer(x, y, campaign) {
    // create an empty object
    let thisPlayer = {};

    thisPlayer.x = x;
    thisPlayer.y = y;
    thisPlayer.preX = x;
    thisPlayer.preY = y;
    thisPlayer.side = 1;
    thisPlayer.knockbackAlreadyDid = 20;
    thisPlayer.knockbackAngle = 0;
    thisPlayer.hp = campaign['settings']['player']['hp'];
    console.log(campaign);
    thisPlayer.spd = campaign['settings']['player']['speed'];
    /// set the current image for the first frame
    thisPlayer.currFrame = 0;
    // set all the frames
    thisPlayer.spriteSheet = loadImage(campaign['settings']['player']['sprites']['spriteSheet'], processImage);
    thisPlayer.frames = [campaign['settings']['player']['sprites']['idle']];
 
    console.log(thisPlayer);
    return thisPlayer;
}

function updatePlayer(player, level, ctx) {
    // save the context, scale it, draw the current player frame and restore
  let areColliding = Array(level.tiles.length).fill(false);
  ctx.save();
        ctx.scale(2 * player.side, 2);
    ctx.drawImage(player.spriteSheet,
        player.frames[player.currFrame][0],
        player.frames[player.currFrame][1],
        player.frames[player.currFrame][2],
        player.frames[player.currFrame][3],
        player.side==-1 ? -16-player.x : player.x,player.y,
        player.frames[player.currFrame][2],
        player.frames[player.currFrame][3]);
    ctx.restore();
    player.preX = player.x;
    player.preY = player.y;
    if (keys['w'] ) {
        player.y -= player.spd;
    }
    if (keys['s'] ) {
        player.y += player.spd;
    }
    if(player.knockbackAlreadyDid<20){
      player.y -= Math.sin(player.knockbackAngle) * 10;
      player.knockbackAlreadyDid += Math.abs(Math.sin(player.knockbackAngle)) * 10;
    }
    level.tiles.forEach( (cell,i) => {
      if(aabb_collision(cell.x,cell.y,16,16,player.x,player.y,16,16)){
        cell.collide = true;
        areColliding[i] = true;
        if(cell.layer == 1){
          if(player.knockbackAlreadyDid<20){
            player.y += Math.sin(player.knockbackAngle) * 10;
            player.x -= Math.sin(player.knockbackAngle) * 10;
            player.knockbackAlreadyDid -= Math.abs(Math.sin(player.knockbackAngle)) * 10;
          }
          player.y = player.preY;
        }
      } else {
        cell.collide = false;
      }
    });
    if (keys['a']) {
        player.x -= player.spd;
        player.side = -1;
    }
    if (keys['d']) {
        player.x += player.spd;
        player.side = 1;
    }
    if(player.knockbackAlreadyDid<20){
      player.x -= Math.cos(player.knockbackAngle) * 10;
      player.knockbackAlreadyDid += Math.abs(Math.cos(player.knockbackAngle)) * 10;
    }
    level.tiles.forEach( cell => {
      if(aabb_collision(cell.x,cell.y,16,16,player.x,player.y,16,16)){
        if(cell.dangerous){
          player.knockbackAngle = Math.atan2((cell.y-player.y),(cell.x-player.x));
      player.knockbackAlreadyDid = 0;
    if(!cell.touch){
      player.hp--;
    }
        }
        cell.collide = true;
        if(cell.layer == 1){
          player.x = player.preX;
        }
      } else if(!areColliding) {
        cell.collide = false;
      }
    });
    return player;
}