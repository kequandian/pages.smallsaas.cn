import React,{ Fragment } from 'react';
import ImageAdaptive from '../image-adaptive';
import Modal from 'antd/lib/modal';
import Icon from 'antd/lib/icon';
import './index.css';

/**
 * @author LLH
 * @editor 
 * @updated 2018年8月23日
 * @desc 展示一张图片。点击图片可在 模态框 查看大图
 * @eg
      <ImageView
        data={{
            url: 'http://www.a.com/img.jpg',
            alt: '商品图片',
        }}
      />
 */
export default class ImageView extends React.Component {
  state = {
    previewVisible: false,
  };
  handleSwitch = () => {
    this.setState({
      previewVisible: !this.state.previewVisible,
    });
  }
  render(){
    const { data } = this.props;
    const { previewVisible } = this.state;
    const style = {
      ...this.props.style,
    }
    return (
      <Fragment>
        <div className='kc-image-view' style={ style } onClick={ this.handleSwitch }>
          <div className='kc-image-view-cover'>
            <Icon type="eye-o" />
          </div>
          <ImageAdaptive data={ data } />
        </div>
        <Modal visible={ previewVisible } footer={ null } onCancel={ this.handleSwitch }>
          <img alt={ data.alt || 'image' } style={{ width: '100%' }} src={ data.url } />
        </Modal>
      </Fragment>
    );
  }
}