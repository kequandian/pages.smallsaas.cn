import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';
export default function(pcd,dataPool){
  const keyMap = [ 'address' ];
  keyMap.forEach( key => pcd.push( dataPool.getToForm(key) ) );
  if(pcd.length > 3 && pcd[0] && pcd[3]){
    query('/api/geocoding/address',{ name: pcd.join('') } ).then( ({ code, data, message }) => {
      if( code === 200 ){
        dataPool.addToForm({
          latitude: data.latitude,
          longitude: data.longitude,
        },true);
      }
    });
  }else{
    console.log('数据不足，无法获取经纬度！预期：省、市、区、地址',pcd);
  }
  
}