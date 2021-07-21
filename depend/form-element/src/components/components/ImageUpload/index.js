/**
    * @author
    * @editor
    * @updated
    * @desc     默认以小图的方式显示接收到的 URL value，点击可在 modal 里面上传新的图片
    * @eg
    <ImageUpload>
      defaultValue = ''    //传入默认上传图片按钮的地址
      value = ''           //传入上传图片按钮的地址
      onChange = {(data) => {}}   //点击modal模块框的确认，将上传的图片地址导出
    </ImageUpload>
 */

import React, { Component } from 'react';
import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';
import Upload from 'antd/lib/upload';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';
import { getToken } from 'kqd-utils/lib/token';

import './style.css';

/**
 * 默认以小图的方式显示接收到的 URL value，点击可在 modal 里面上传新的图片
 */
export default class ImageUpload extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: props.defaultValue || props.value,
      showUploadModal: false,
      loading: false,
      url: undefined, // 上传后返回的 url
    }
  }

  uploadProps = {
    name: 'file',
    action: '/api/fs/uploadfile',
    headers: {
      authorization: `Bearer ${getToken()}`,
    },
  }
  handleSwitch = () => {
    this.setState({
      showUploadModal: !this.state.showUploadModal,
      url: undefined,
    });
  }
  handleChange = (info) => {
    const { loading } = this.state;
    if ( info.file.status === 'uploading' && !loading) {
      this.setState({
        loading: true,
      });
      return false;
    }
    if (info.file.status === 'done') {
      this.setState({
        loading: false,
        url: info.file.response.data.url
      });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败，请稍后再试。`);
    }
  }
  handleOk = () => {
    if(this.props.onChange){
      this.props.onChange(this.state.url);
    }
    this.handleSwitch();
  }

  render() {
    const { value, url, showUploadModal, loading } = this.state;
    return <div className="ImageUploadBox" onClick={ this.handleSwitch }>
      { value ? (
        <div>
          <img src={ value } alt="点击上传新图片" />
        </div>
      ) : '点击上传' }
      <Modal
        visible={ showUploadModal }
        onChange={ this.handleSwitch }
        okButtonProps={ loading }
        onOk={ this.handleOk }
      >
        <Upload { ...this.uploadProps }>
          <Button icon="upload">
            点击上传
          </Button>
        </Upload>
        <Divider />
        <img src={ url || value } alt="" />
      </Modal>
    </div>;
  }
}
