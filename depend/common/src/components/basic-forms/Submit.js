import React from 'react';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';

const FormItem = Form.Item;

const defaultLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 6 },
  },
};

export default ({ className, layout, pre, extra, ...rest }) => {
  const theLayout = layout ? layout : defaultLayout;
  return (
    <FormItem {...theLayout}>
      {
        pre ? pre : ''
      }
      <Button type="primary" htmlType="submit" {...rest} />
      {
        extra ? extra : ''
      }
    </FormItem>
  );
};
