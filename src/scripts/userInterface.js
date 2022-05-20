function createUI(){
  let thisUI = {};
  thisUI.tileset = loadImage('../src/images/UITileset.png',processImage)
  thisUI.images = [[1,1,16,16]];
  return thisUI;
}
function updateUI(UI, player){
  for(let i=0; i<player.hp;i++){
    ctx.drawImage(UI.tileset,UI.images[0][0],UI.images[0][1],UI.images[0][2],UI.images[0][3],i*18+5,5,16,16);
  }
  return UI;
}