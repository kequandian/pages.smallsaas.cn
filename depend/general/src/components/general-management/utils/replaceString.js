import queryString from 'query-string';

export default function replaceString(location = {} , record = {} ){
  const queryId = queryString.parse(location.search).id;
  let reserved = {
    'ID': record.id,
    'QueryId': queryId,
  };

  let stringMap  = { ...record, ...reserved };

  return {
    register: (dataObj) => {
      stringMap = { ...stringMap, ...dataObj };
    },
    format: function format(string) {
      if(!string) return {};
      if( typeof(string) === 'string' ){
        Object.keys(stringMap).forEach( key => string = string.replace(`{${key}}`,stringMap[key]) );
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
// export default function replaceString(stringMap){
//   // console.log('replaceString map: ',stringMap);
//   return function format(string) {
//     if( typeof(string) === 'string' ){
//       Object.keys(stringMap).forEach( key => string = string.replace(`{${key}}`,stringMap[key]) );
//     }else{
//       string.forEach( (item,i) => string[i] = format(item) );
//     }
//     return string;
//   };
// }