

/**
 * 用于从 样式对象的列表里 读取样式
 *
 * @export
 * @param {*} styleArray
 * @returns
 */
export default function readStyle(styleArray = []){
  return function safety(index){
    return styleArray[index] || {};
  }
}