function createEnemie(x,y,dmg,hp,spd,currSprite,name) {
  let thisEnemie = {};
  thisEnemie.x = x;
  thisEnemie.y = y;
  thisEnemie.dmg = dmg;
  thisEnemie.spd = spd;
  thisEnemie.hp = hp;
  thisEnemie.currSprite =  currSprite;
  thisEnemie.name = name;
  thisEnemie.touch = false;
  thisEnemie.side = -1;
  return thisEnemie;
}
function updateEnemies(level,player){
  if(level.enemies.length==0){
    restart = true;
  }
  level.enemies.forEach((enemie,i) => {
    if(enemie.hp<=0){
      level.enemies.splice(i,1);
    }
    ctx.save();
    ctx.scale(2 * enemie.side, 2);
        ctx.drawImage(
            level.spriteSheet,
            level.prefabs[enemie.name].sprite[enemie.currSprite][0],
            level.prefabs[enemie.name].sprite[enemie.currSprite][1],
            level.prefabs[enemie.name].sprite[enemie.currSprite][2],
            level.prefabs[enemie.name].sprite[enemie.currSprite][3],
            enemie.side==-1 ? -16-enemie.x : enemie.x,
            enemie.y,
            16,
            16
        );
    //alert((Math.abs(enemie.x-Math.ceil(enemie.x/16)*16)<deltaTime));
    if(enemie.x%16==0 && enemie.y%16==0){
      //console.log('buaaa');
      enemie.x = Math.ceil(enemie.x/16)*16
      enemie.y = Math.ceil(enemie.y/16)*16
      enemie.dir = findPath(player,level,enemie);
    }
     if(enemie.dir==LEFT){
      enemie.x-=enemie.spd;
       enemie.side = -1;
    }
    else if(enemie.dir==RIGHT){
      enemie.x+=enemie.spd;
      enemie.side = 1;
    }
    else if(enemie.dir==UP){
      enemie.y-=enemie.spd;
    }
     else if(enemie.dir==DOWN){
      enemie.y+=enemie.spd;
    } else {
       
    }
  if(aabb_collision(player.x,player.y,16,16,enemie.x,enemie.y,16,16) && frame%15==0){
    	player.knockbackAngle = Math.atan2((enemie.y-player.y),(enemie.x-player.x));
    console.log( enemie.x,mouse.x)
    if(!enemie.touch){
      player.hp-=enemie.dmg;
      enemie.touch = true;
    }
      player.knockbackAlreadyDid = 0;
  } else {
    enemie.touch=false;
  }
        ctx.restore();
  });
  return level.enemies;
}