import defaultConfig from './config';

function deepClone(source){
  if(!source || typeof source !== 'object'){
    throw new Error('error arguments', 'shallowClone');
  }
  var targetObj = source.constructor === Array ? [] : {};
  for(var keys in source){
     if(source.hasOwnProperty(keys)){
        if(source[keys] && typeof source[keys] === 'object'){
          targetObj[keys] = source[keys].constructor === Array ? [] : {};
          targetObj[keys] = deepClone(source[keys]);
        }else{
          targetObj[keys] = source[keys];
        }
     } 
  }
  return targetObj;
}
export default function getConfig(configSource = {}){
  configSource = Object.keys(configSource).length > 0 ? configSource : defaultConfig;
  console.log('使用配置文件：',configSource);
  return (configTrace, defaultValue) => {
    let configItem = configSource;
    configTrace = configTrace.split('.') || [];

    const rst = configTrace.some( (key) => {
      if( !configItem[key] ){
        return true;
      }else{
        configItem = configItem[key];
        return false;
      }
    } );
    // console.log('配置项:',configTrace.join('/'),configItem,rst);
    const configItemClone =  typeof(configItem) === 'object' ? deepClone(configItem) : configItem;
    // configItem = JSON.parse(JSON.stringify(configItem));
    let configRst = rst ? (defaultValue && !defaultValue.DATAPOOL && defaultValue) || [] : configItemClone;
    if(defaultValue && defaultValue.DATAPOOL){
      configRst.length && configRst[0].type && configRst.forEach( field => {
        const v = defaultValue.getToTemp(field.field);
        if(v !== undefined){
          console.log('覆盖默认值：',field,v);
          field.value = v;
        }
      });
    }
    return configRst;
  };
}