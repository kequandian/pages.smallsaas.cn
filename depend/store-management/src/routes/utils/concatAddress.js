export default function concatAddress(record){
  if(record.pcd){
    try {
      return `${JSON.parse(record.pcd).join('')}${record.address}`;
    } catch (error) {
      console.warn('后台返回的 pcd 字段非预期格式');
    }
  }else{
    return record.address;
  }
}