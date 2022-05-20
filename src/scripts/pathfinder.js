const RIGHT = 1, LEFT = 2, UP = 3, DOWN = 4 ; 
function createNode(discovered, father){
  let thisNode = {};
  thisNode.discovered = discovered;
  thisNode.father = father;
  return thisNode;
}
function createNodes(level,player){
  let nodes = Array.from({length: 11}, e => Array.from({length:20}, e2 => createNode(false,0)));
  level.tiles.forEach((tile) => {
    nodes[tile.y/16][tile.x/16] = createNode(false,0);
    
  })
  nodes[Math.floor(player.y/16)][Math.floor(player.x/16)] = createNode(true,0,false);
  return nodes
}
function forAllValidNodes(nodes,layer1, callback){
  nodes.forEach((row,y) => {
    row.forEach((node,x) => {
      if(node.discovered && (!level.prefabs.hasOwnProperty(layer1[y].split('#')[x]) || level.prefabs[layer1[y].split('#')[x]].type!='tile')){
        callback(node,x,y);
      }
    });
  });
}

function findPath(player,level,enemie){
  let nodes = createNodes(level,player);
  let limit = 0;
  let layer1 = level.layers[1];
  while(!nodes[Math.floor(enemie.y/16)][Math.floor(enemie.x/16)].discovered && limit<50){
  forAllValidNodes(nodes,layer1, (node,x,y) => {
    if(x  < nodes[0].length-1 && !nodes[y][x+1].discovered ){
      nodes[y][x+1].father = LEFT;
      nodes[y][x+1].discovered = true;
    }
    if(x > 0 && !nodes[y][x - 1].discovered ){
      nodes[y][x - 1].father = RIGHT;
      nodes[y][x - 1].discovered = true;
    }
    if(y < nodes.length-1 && !nodes[y + 1][x].discovered ){
      nodes[y + 1][x].father = UP;
      nodes[y + 1][x].discovered = true;
    }
    if(y > 0 && !nodes[y-1][x].discovered ){
      nodes[y-1][x].father = DOWN;
      nodes[y-1][x].discovered = true;
    }
  })
      limit++;
  }
    return nodes[Math.floor(enemie.y/16)][Math.floor(enemie.x/16)].father;
}