import React, { PureComponent } from 'react';
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
import { getToken } from 'kqd-utils/lib/token';
import { getEndpoint } from 'kqd-utils/lib/endpoint';
import './index.css';

export default class FileUpload extends PureComponent {

  constructor(props) {
    super(props);
    let propsFileList = props.value || [];
    try {
      if (typeof (propsFileList) === 'string') {
        propsFileList = JSON.parse(propsFileList);
      }
    } catch (e) {
      propsFileList = [propsFileList];
    }
    propsFileList.length > 0 && propsFileList.map((item, index) => {
      propsFileList[index] = {
        ...item,
        uid: index,
        status: 'done',
      }
    })

    this.state = {
      fileList: props.value ? propsFileList : [],
      loading: false,
    }
  }

  handleChange = (info) => {
    console.log("handleChange: info = ", info);

    const { fileList } = info;
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
    const doneImageList = fileList.filter(file => file.status === 'done');
    const saveimageList = doneImageList.map(file => ({
      url: file.response ? file.response.data.url : file.url,
      name: file.response ? file.response.data.originalFileName : file.name,
      size: file.response ? file.response.data.size : file.size,
     }));
    this.props.onChange(saveimageList);
  }

  render() {
    const { fileList } = this.state;
    const { API = '/api/fs/uploadfile', maxNumber = 9  } = this.props;

    const uploadProps = {
      name: 'file',
      action: `${getEndpoint()}${API}`,
      listType: 'text',
      fileList: fileList,
      showUploadList: true,
      headers: {
        authorization: `Bearer ${getToken()}`,
      },
      onChange: this.handleChange
    }

    const uploadButton = (
      <div>
        <div className="kqd-upload-text">
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          点击上传
        </div>
      </div>
    );

    return (
      <div className="clearfix">
        <Upload
          {...uploadProps}
        >
          {fileList.length >= maxNumber ? '' : uploadButton}
        </Upload>
      </div>
    )
  }
}
