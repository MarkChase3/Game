function createPlayer(x, y, campaign) {
    // create an empty object
    let thisPlayer = {};

    thisPlayer.x = x;
    thisPlayer.y = y;
    thisPlayer.preX = x;
    thisPlayer.preY = y;
    thisPlayer.side = 1;
  thisPlayer.atk = 1;
    thisPlayer.knockbackAlreadyDid = 20;
    thisPlayer.knockbackAngle = 0;
    thisPlayer.arrows = [];
    thisPlayer.hp = campaign['settings']['player']['hp'];
    console.log(campaign);
    thisPlayer.spd = campaign['settings']['player']['speed'];
  thisPlayer.shoot = false;
    /// set the current image for the first frame
    thisPlayer.currFrame = 0;
    // set all the frames
    thisPlayer.spriteSheet = loadImage(campaign['settings']['player']['sprites']['spriteSheet'], processImage);
    thisPlayer.frames = [campaign['settings']['player']['sprites']['idle']];
 
    console.log(thisPlayer);
    return thisPlayer;
}

function updatePlayer(player, level, ctx, enemies) {
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
    if(keys['lmouse'] && !player.shoot){
      player.arrows.push({x:player.x,y:player.y,angle:(Math.atan2((player.y- mouse.y),(player.x-mouse.x)))})
    console.log(Math.atan2((mouse.y-player.y),(mouse.x-player.x)))
      player.shoot = true;
    }
  if(!keys['lmouse']){
      player.shoot = false;
    }
    player.arrows.forEach((el,i) => {
      el.x -= Math.cos(el.angle) * 1.5;
      el.y -= Math.sin(el.angle) * 1.5;
      enemies.forEach((enemie) => {
        if(aabb_collision(enemie.x,enemie.y,16,16,el.x,el.y,8,8)){
          player.arrows.splice(i,1);
          enemie.hp-=player.atk;
          //console.lo
        }
      })
      level.tiles.forEach( cell => {
      if(cell.layer==1 && aabb_collision(cell.x,cell.y,16,16,el.x,el.y,8,8)){
        player.arrows.splice(i,1);
      }
      });
      ctx.save();
      ctx.translate(el.x*2+16,el.y*2+16);
      ctx.rotate(el.angle);
      ctx.drawImage(player.spriteSheet,18,18,16,16,0,0,16,16);
      ctx.restore();
    });
    if (keys['w'] || keys['ArrowUp']) {
        player.y -= player.spd;
    }
    if (keys['s'] || keys['ArrowDown']) {
        player.y += player.spd;
    }
    if(player.knockbackAlreadyDid<20){
      player.y -= Math.sin(player.knockbackAngle) * 1.5;
      player.knockbackAlreadyDid += Math.abs(Math.sin(player.knockbackAngle)) * 1.5;
    }
    level.tiles.forEach( (cell,i) => {
      if(aabb_collision(cell.x,cell.y,16,16,player.x,player.y,16,16)){
        cell.collide = true;
        areColliding[i] = true;
        if(cell.layer == 1){
          player.y = player.preY;
        }
      } else {
        cell.collide = false;
      }
    });
    if (keys['a'] || keys['ArrowLeft']) {
        player.x -= player.spd;
        player.side = -1;
    }
    if (keys['d'] || keys['ArrowRight']) {
        player.x += player.spd;
        player.side = 1;
    }
    if(player.knockbackAlreadyDid<5){
      player.x -= Math.cos(player.knockbackAngle) * 1.5;
      player.knockbackAlreadyDid += Math.abs(Math.cos(player.knockbackAngle)) * 1.5;
    }
    level.tiles.forEach( cell => {
      if( aabb_collision(cell.x,cell.y,16,16,player.x,player.y,16,16)){
        if(cell.dangerous){
          if(!cell.hitted){
            player.hp--;
            cell.hitted = true;
            console.log('lkhgndg');
          }
          console.log('uuu')
        } else {
          cell.hitted = false;
        }
        cell.collide = true;
        if(cell.layer == 1){
          player.x = player.preX;
        }
      } else if(!areColliding) {
        cell.collide = false;
        cell.hitted = false;
      }
    });
  if(player.hp<=0){
    restart = true;
  }
    return player;
}