function createPlayer(x, y, campaign) {
    // create an empty object
    let thisPlayer = {};

    thisPlayer.x = x;
    thisPlayer.y = y;
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

function updatePlayer(player, ctx) {
    // console.log(player.x);
    // save the context, scale it, draw the current player frame and restore
    ctx.save();
    ctx.scale(2, 2);
    ctx.drawImage(player.spriteSheet,
        player.frames[player.currFrame][0],
        player.frames[player.currFrame][1],
        player.frames[player.currFrame][2],
        player.frames[player.currFrame][3],
        player.x,player.y,
        player.frames[player.currFrame][2],
        player.frames[player.currFrame][3]);
    ctx.restore();
    // player.x += player.dx;
    // player.y += player.dy;
    // player movement
    if (keys['w'] && player.y>16+player.spd) {
        player.y -= player.spd;
    }
    if (keys['s'] && player.y+player.frames[player.currFrame][3]<ctx.canvas.height/2-(16+player.spd)) {
        player.y += player.spd;
    }
    if (keys['a'] && player.x>16+player.spd) {
        player.x -= player.spd;
    }
    if (keys['d'] && player.x+player.frames[player.currFrame][2]<ctx.canvas.width/2-(16+player.spd)) {
        player.x += player.spd;
    }
    // console.log('dlkjasrnggtreh');
    return player;
}