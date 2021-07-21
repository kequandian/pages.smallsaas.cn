import { upload } from 'kqd-utils/lib/services';

export default function(param){
  upload( '/api/fs/uploadfile',{ file: param.file } )
  .then( ({ data }) => {
    if(data){
      param.success({
        url: data.url,
        // meta: {
        //   id: 'xxx',
        //   title: 'xxx',
        //   alt: 'xxx',
        //   loop: true, // 指定音视频是否循环播放
        //   autoPlay: true, // 指定音视频是否自动播放
        //   controls: true, // 指定音视频是否显示控制栏
        //   poster: 'http://xxx/xx.png', // 指定视频播放器的封面
        // }
      })
    }
  } )
  .catch( (error) => {
    console.warn(error);
    param.error({
      msg: error,
    })
  })
}