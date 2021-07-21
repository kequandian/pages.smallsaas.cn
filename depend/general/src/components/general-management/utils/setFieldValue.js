export default function setFieldValue(config = {},dataPool){
  if(Object.keys(config).length > 0){
    Object.keys(config).forEach( key => {
      if(config[key] !== null){
        console.log(`保存 初始配置 ${key} 的值 ${config[key]} 到 dataPool`);
        dataPool.addToTemp({ [key]: config[key] });
      }else{
        console.log(`开始从 modelStatus.currentItem 中监听 ${key} 的值`);
      }
    } );
  }
  return {
    check(modelStatus){
      const fetchOneKey = dataPool.getToRedirect('fetchOne') || 'currentItem';
      if( modelStatus[fetchOneKey] && Object.keys(modelStatus[fetchOneKey]).length > 0 ){
        Object.keys(modelStatus[fetchOneKey]).forEach( key => {
          if( config.hasOwnProperty(key) ){
            console.log(`保存 model 中 ${key} 的值 ${modelStatus[fetchOneKey][key]} 到 dataPool Temp`);
            dataPool.addToTemp({ [key]: modelStatus[fetchOneKey][key] });
          }
        } );
      }
      const recordData = dataPool.getToRecordAll();
      if( recordData && Object.keys(recordData).length > 0 ){
        Object.keys(recordData).forEach( key => {
          if( config.hasOwnProperty(key) ){
            console.log(`保存 recordData 中 ${key} 的值 ${recordData[key]} 到 dataPool Form`);
            dataPool.addToTemp({ [key]: recordData[key] });
          }
        } );
      }
    },
  };
}