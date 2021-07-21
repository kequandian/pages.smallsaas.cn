/**
    * @author
    * @editor
    * @updated
    * @desc    图片显示组件，点击图片可在modal中查看大图
    * @eg
    <ImageBox>
      value = ''     //图片地址
    </ImageBox>
 */

import React, { Component, Fragment } from 'react';
import Modal from 'antd/lib/modal';

import './style.css';

/**
 * 简单的图片显示组件。点击可在 modal 中查看大图。
 */
export default class ImageBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
    }
  }

  handleSwitch = () => {
    this.setState({
      visible: !this.state.visible,
    });
  }
  render() {
    const { visible } = this.state;
    const { value } = this.props;
    return <Fragment>
      <div className="imageBox" onClick={ this.handleSwitch }><img src={ value } /></div>
      <Modal visible={visible} footer={null} onCancel={this.handleSwitch}>
        <img alt="" style={{ width: '100%' }} src={ value } />
      </Modal>
    </Fragment>;
  }
}
