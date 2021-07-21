/**
 * 压缩base64格式图片
 * @param source - base64 图片
 * @param maxWidth - 压缩后宽度， 默认1024
 */
export default function compress({ source, maxWidth = 1024 }) {
  var promise = new Promise(function(resolve, reject) {
    var img = new Image();
    img.src = source;
    img.onload = function() {
        //默认按比例压缩
        var w = this.width,
            h = this.height;
        var quality = 0.7; // 默认图片质量为0.7

        if (img.width > img.height) {
          w = Math.min(maxWidth, img.width);
          h = img.height * (w / img.width);
        }
        else {
          h = Math.min(maxWidth, img.height);
          w = img.width * (h / img.height);
        }

        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        if(ctx){
          // 创建属性节点
          canvas.setAttribute("width", w);
          canvas.setAttribute("height", h);

          ctx.drawImage(this, 0, 0, w, h);
          // ctx.rotate(90 * Math.PI / 180);
          // quality值越小，所绘制出的图像越模糊
          let ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
          let base64 = canvas.toDataURL("image/"+ext);
          // 回调函数返回base64的值
          resolve(base64);
        }else{
          console.log('ctx 异常');
          reject();
        }
    }
  });

  return promise;
}
