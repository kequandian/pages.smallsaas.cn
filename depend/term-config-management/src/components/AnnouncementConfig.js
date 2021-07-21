import React from 'react';

import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Spin from 'antd/lib/spin';
import BraftEditor, { EditorState } from 'braft-editor'
import 'braft-editor/dist/index.css'
import uploadFile from '../utils/uploadFile';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 10,
  },
};

class AnnouncementConfig extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      editorState:  EditorState.createFrom(props.data.content),
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    const htmlContent = nextProps.data.content;
    this.setState({
      editorState: EditorState.createFrom(htmlContent)
    })
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  handleOk = () => {
    const { data } = this.props;
    const { getFieldDecorator, validateFields, getFieldsValue, getFieldValue }  = this.props.form;
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data1 = { ...getFieldsValue(),
          id: data.id,
          content: this.state.editorState.toHTML(),
          type: data.type,
        };
      this.props.onSave(data1);
    });
  }


  render() {
    const { loading } = this.props;
    const { editorState } = this.state;
    const media = {
        image: true,
        video: false,
        audio: false,
        uploadFn: uploadFile,
        onInsert: _=> this.handleEditorChange()
    };
     return (
       <Spin spinning={loading}>
         <Form>
           <FormItem>
               <BraftEditor
                  value={ editorState }
                  onChange={ this.handleEditorChange }
                  media={ media }
                />
           </FormItem>
               <br/>
           <FormItem {...formItemLayout}>
             <Button type="primary" onClick={this.handleOk}>保存</Button>
           </FormItem>
         </Form>
       </Spin>
     )
  }
}


export default Form.create()(AnnouncementConfig);
