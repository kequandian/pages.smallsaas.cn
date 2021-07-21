import React,{ Fragment, Component } from 'react';
import { Alert, Form, Radio, Button } from 'antd';

const FormItem = Form.Item;

const RadioGroup = Radio.Group;

class Empty extends Component{
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { modelStatus, requester } = this.props;
        const { ...rules } = modelStatus.rules;
        const index = rules.records.findIndex( item => item.ruleName === 'CREDIT_CLEAR_RULER' );
        requester.updateForm({
          API: `/api/vip/account/grade/rules/${rules.records[index].id}`,
          ...values,
        });
      }
    });
  }
  render(){
    const { form } = this.props;
    return <Fragment>
      <Alert message="按照自然年清零，最后一天清零，清零操作不可逆请注意。" type="info" showIcon />
      <Form onSubmit={ this.handleSubmit }>
        <FormItem label="积分清零">
          { form.getFieldDecorator('ruleOption', {
              initialValue: 'NEVER',
            })(<RadioGroup>
              <Radio value="NEVER">从不清空</Radio>
              <Radio value="YEAR">每年清空</Radio>
            </RadioGroup>)
          }
        </FormItem>
        <Button type="primary" htmlType="submit">保存</Button>
      </Form>
    </Fragment>;
  }
}

export default Form.create({
  // onFieldsChange(props, fields){
  //   const { modelStatus, requester } = props;
  //   const { ...rules } = modelStatus.rules;
  //   const index = rules.records.findIndex( item => item.ruleName === 'CREDIT_CLEAR_RULER' );
  //   rules.records[index].ruleOption = fields.ruleOption.value;
  //   requester.save({
  //     rules,
  //   });
  // },
  mapPropsToFields(props) {
    const { rules } = props.modelStatus;
    const temObj = {};
    if(rules && rules.records){
      rules.records.forEach( item => {
        if( item.ruleName === 'CREDIT_CLEAR_RULER' ){
          temObj['ruleOption'] = Form.createFormField({
            value: item.ruleOption,
          });
        }
      });
    }
      
    return temObj;
  }
})(Empty);