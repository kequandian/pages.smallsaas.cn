/**
    * @author
    * @editor
    * @updated
    * @desc  图片上传功能，迻上传9张,上传的图片可查看
    * @eg
    <AvatarUpload>
      onChange = {(data) =>{}}
    </AvatarUpload>
 */

import React, { PureComponent } from 'react';
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import { getToken } from 'kqd-utils/lib/token';

export default class AvatarUpload extends PureComponent {

  static valuePropName = 'fileList';
  static getValueFromEvent(e) {
     //console.log('Upload event:', e);
     if (e.file.status === 'done') {
       return e.file.response.data.url;
     }
  }

  constructor(props) {
    super(props);
    this.state = {
		previewVisible: false,
		previewImage: '',
		fileList: [],
		loading: false,
		imageUrl: null,
    }
  }

	handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

  handleChange = (info) => {
    this.props.onChange(info);
	  const {fileList} = info;
    this.setState({ fileList });
    if (info.file.status !== 'done' && fileList.length > 0) {
      this.setState({
        loading: true,
      })
    }
    if (info.file.status === 'done') {
		this.setState({
			loading: false,
			imageUrl: info.file.response.url
		})
    }
  }

  render() {
	const { previewVisible, previewImage, fileList } = this.state;

    const uploadProps = {
      name: 'file',
      action: '/api/fs/uploadfile',
      listType: 'picture-card',
	    fileList: fileList,
      showUploadList: true,
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
	    onPreview: this.handlePreview,
      onChange: this.handleChange
    }

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传</div>
      </div>
    );

    return (
		<div className="clearfix" style={{marginTop: '0.5em'}}>
			<Upload
			  { ...uploadProps }
				>
				{fileList.length >= 9 ? null : uploadButton}
			</Upload>
			<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
				<img alt="avatar" style={{ width: '100%' }} src={previewImage} />
			</Modal>
		</div>
    )
  }
}
