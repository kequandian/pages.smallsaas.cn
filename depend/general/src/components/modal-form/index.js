/**
    * @author
    * @editor
    * @updated
    * @desc     弹出Modal模块框，填写相应数据提交功能
    * @eg
    <ModalForm>
      intl = ''
      cancelText = 'Cancel'    //取消按钮文本
      submitText = 'Submit'   //确定按钮文本
      onCancel = null
      dispatch = null
      modelName = null
      grid
      API = ''
      title = ''     //modal模块框的标题
      width = 520     //modal框默认宽度520px
      modalVisible = false    //控制modal的出现和隐藏
    </ModalForm>
 */

import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';

import Form from 'antd/lib/form';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import GeneralForm from '../general-form';
import UniformForm from '../uniform-form';
import GridForm from '../grid-form';
import { getIntl } from '../../utils/utils';

@injectIntl
export default class ModalForm extends PureComponent {

  constructor(props) {
    super(props);
    const intl = props.intl;
    this.state = {
      type: 'create',
      cancelText: this.props.cancelText || getIntl(intl, 'general.form.btn.cancel'),
      submitText: this.props.submitText || getIntl(intl, 'general.form.btn.submit'),
    }
  }

  handleCancel = () => {
    const { onCancel = null, dispatch = null, modelName = null, } = this.props;
    if (onCancel) {
      onCancel();
    }
    if (modelName && dispatch) {
      dispatch({ type: `${modelName}/hideModal` })
    }
  }

  renderForm = (modalVisible, formProps) => {
    if (modalVisible) {
      if (this.props.grid) {
        return <GridForm {...formProps} />
      }
      return this.props.API ? <UniformForm {...formProps} /> : <GeneralForm {...formProps} />
    }
  }

  render() {
    const { cancelText, submitText } = this.state;
    const { title = '', modelName = null, width = 520 } = this.props;
    const { modalVisible } = modelName ? this.props[modelName] : this.props;

    // demo form modal
    const modalProps = {
      title,
      visible: modalVisible,
      width,
      footer: null,
      onCancel: this.handleCancel
    }
    const formProps = {
      ...this.props,
      submitForm: <Row type="flex" justify="end">
        <Col>
          <Button type='primary' htmlType='submit'>{submitText}</Button>
          <Button style={{ marginLeft: 8}} onClick={this.handleCancel}>{cancelText}</Button>
        </Col>
      </Row>
    }

    return (
      <Modal {...modalProps}>
        {this.renderForm(modalVisible, formProps)}
      </Modal>
    );
  }
}
