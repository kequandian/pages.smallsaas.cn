/**
 * 这是 replaceString 的副本，复制出来主要是为了新的修改不影响已有的引用
 * @param {object} dataPool 数据池
 * - {id} 从 dataPool.getToForm 中替换 id 的值
 * - [id] 从 dataPool.getToLocation 中替换 id 的值
 * - (id) 从 dataPool.getToRecord 中替换 id 的值
 */
export default function replaceKey(dataPool){
  return {
    format: function format(string) {
      if(!string) return {};
      if( typeof(string) === 'string' ){
        const keyList =  string.match(/\{\w+\}|\[\w+\]|\(\w+\)|\#\w+\#/g);
        keyList && keyList.forEach( key => {
          if( key.indexOf('{') >= 0 ){
            string = string.replace( key, dataPool.getToForm(key.replace(/\{|\}/g,'')) );
          }else if( key.indexOf('[') >= 0 ){
            string = string.replace( key,dataPool.getToLocation(key.replace(/\[|\]/g,'')) );
          }else if( key.indexOf('#') >= 0 ){
            string = string.replace( key,dataPool.getToTemp(key.replace(/\#|\#/g,'')) );
          }else{
            string = string.replace( key,dataPool.getToRecord(key.replace(/\(|\)/g,'')) );
          }
        } );
      }else{
        if( string.lenght !== undefined ){
          const [ ...ary ] = string;
          ary.forEach( (item,i) => ary[i] = format(item) );
          return ary;
        }else{
          const { ...obj } = string
          Object.keys(obj).forEach( key => {
            const rst = format(obj[key]);
            if( rst === 'undefined' || rst === undefined ){
              // 没有值的字段，直接去掉
              delete obj[key];
            }else{
              obj[key] = format(obj[key]);
            }
          });
          return obj;
        }
      }
      return string;
    }
  }
}