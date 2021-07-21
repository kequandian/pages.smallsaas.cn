/**
    * @author
    * @editor
    * @updated
    * @desc     图片上传组件，默认最大上传9张
    * @eg
    <AvatarUpload>
      value = []                   //初始值
      onChange = { (data) => {} }   //fileList 值发生变化触发的回调函数
      maxNumber = 9           //默认上传9张图片
    </AvatarUpload>
 */

import React, { PureComponent } from 'react';
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';
import { getToken } from 'kqd-utils/lib/token';
import { getEndpoint } from 'kqd-utils/lib/endpoint';

export default class AvatarUpload extends PureComponent {

  constructor(props) {
    super(props);
    let propsFileList = props.value || [];
    try{
      if( typeof(propsFileList) === 'string' ){
        propsFileList = JSON.parse(propsFileList);
      }
    }catch(e){
      propsFileList = [ propsFileList ];
    }
    propsFileList.length > 0 && propsFileList.map((item,index) => {
      propsFileList[index] = {
        ...item,
        uid: index,
        status: 'done',
      }
    })

    this.state = {
		previewVisible: false,
		previewImage: '',
		fileList: props.value ? propsFileList : [],
		loading: false,
    }
  }

	handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
    });
  }

  handleChange = (info) => {
    console.log("handleChange: info = ", info);

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
      });
    }
    const doneImageList = fileList.filter( file => file.status === 'done' );
    const saveimageList = doneImageList.map( file => ({ url: file.response ? file.response.data.url : file.url }) );
    this.props.onChange(saveimageList);
  }

  render() {
    const { previewVisible, previewImage, fileList  } = this.state;
    const { maxNumber = 9 } = this.props;

    const uploadProps = {
      name: 'file',
      action: `${getEndpoint()}/api/fs/uploadfile`,
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
        <div className="ant-upload-text">点击上传</div>
      </div>
    );

    return (
		<div className="clearfix" style={{marginTop: '0.5em'}}>
			<Upload
			  { ...uploadProps }
				>
				{ fileList.length >= maxNumber ? '' : uploadButton }
			</Upload>
			<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
				<img alt="avatar" style={{ width: '100%' }} src={previewImage} />
			</Modal>
		</div>
    )
  }
}
