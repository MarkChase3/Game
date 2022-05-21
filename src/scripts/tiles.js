function applyConfigs(object,configs){
  if(configs['set']){
    for(const configName in configs['set']){
      object[configName] = configs['set'][configName];
    }
  }
  if(configs['add']){
    for(const configName in configs['add']){
      object[configName] += configs['add'][configName];
    }
  }
}
function event(config,tile,player,enemy){
  applyConfigs(tile,config['tile']);
  if(player!=null){
    applyConfigs(player,config['player']);
  }
  if(enemy!=null){
    applyConfigs(enemy,config['enemy']);
  }
  if(config['each']){
    let curr = tile.eachs.length;
    tile.eachs.push({
      'interval': window.setInterval(() => {
      if(tile.eachs[curr].times>=config['each']['numberOfTimes']){
        window.clearInterval(tile.eachs[curr]['interval'])
      } else {
        tile.eachs[curr].times++;
      }
      event(config['each']['action'],tile,player,enemy);
    },config['each']['time']),
      'times':0
    })
}
  if(config['timeOut']){
    window.setTimeout(() => {event(config['timeOut']['action'],tile,player,enemy)},config['timeOut']['time'])
  }
}
