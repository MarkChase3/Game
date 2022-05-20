// start
function start() {
    //verify if all jsons were loaded
    if (nJSONs === nJSONsLoaded) {
        //create the player
        player = createPlayer(50, 50, campaign);

        //load the map
        level = loadLevel(campaign,0);

        UI = createUI();
      
        //sinalize the game can start because all was loaded and created
        started = true;
    } else {
        // if some jsons were not loaded, call the start function in the next frame
        window.requestAnimationFrame(start);
    }
}
start();

function update() {
    // if all the images that was tried to load were loaded sucessfully, do the update
    if (nImages === nImagesLoaded && started) {
        // clear the main canvas
        ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        // update the map tiles 
        level = updateLevel(level,ctx);
        // update the player
        player = updatePlayer(player, level, ctx);
        // update the enemies
        level.enemies = updateEnemies(level,player);

        UI = updateUI(UI,player)
    }
    window.requestAnimationFrame(update);
}
window.requestAnimationFrame(update);