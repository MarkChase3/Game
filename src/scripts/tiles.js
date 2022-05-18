function applyConfigs(object,configs){
  for(const configName in configs){
    object[configName] = configs[configName];
    console.log(configName,configs[configName])
  }
}
function event(config,tile,player,enemy){
  console.log('sdijhnkdfl')
  applyConfigs(tile,config['tile']);
  if(player!=null){
    console.log('aijfgsdykuhifsdzg');
    applyConfigs(player,config['player']);
  } else if(enemy!=null){
    applyConfigs(enemy,config['enemy']);
  }
  if(config['timeOut']){
    window.setTimeout(() => {event(config['timeOut']['action'],tile,player,enemy);console.log('klsgjndsjkngiusld')},config['timeOut']['time'])
  }
}
