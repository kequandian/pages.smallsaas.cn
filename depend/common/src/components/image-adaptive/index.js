import React from 'react';
import './index.css';

/**
 * @author LLH
 * @editor 
 * @updated 2018年8月21日
 * @desc 展示一张预期大小的图片。若图片过大，那么则会裁剪展示中间部分
 * @eg
      <ImageAdaptive
        data={{
            width: '80px',
            height: '80px',
            url: 'http://www.a.com/img.jpg',
            alt: '商品图片',
            margin: '0.5rem'
        }}
      />
 */
export default (props) => {
  const { data } = props;
  const { width = '80px', height = '80px' , margin = '0 auto'} = data;
  const style = {
    width,
    height,
    backgroundImage: `url(${data.url})`,
    margin,
  }
  return (
    <div className='kc-image-adaptive' style={ style }></div>
  );
}