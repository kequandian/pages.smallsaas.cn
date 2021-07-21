
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from 'antd/lib/form';

const innerDefaultFormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

const itemStyle = {
  // alignItems: 'center',
  // display: 'flex'
}


export default function generator({ defaultProps, defaultRules, defaultLayout, defaultLabel, defaultName }) {
  return (WrappedComponent) => {
    return class BasicComponent extends Component {
      static contextTypes = {
        form: PropTypes.object,
        updateActive: PropTypes.func,
      };
      constructor(props) {
        super(props);
        this.state = {
          count: 0,
        };
      }
      componentDidMount() {
        if (this.context.updateActive) {
          this.context.updateActive(this.props.name);
        }
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }

      render() {
        const { getFieldDecorator } = this.context.form;
        const options = {};
        let otherProps = {};
        const { onChange, defaultValue, rules, name, layout, label, valuePropName, getValueFromEvent, isPlain = false, ...restProps } = this.props;
        const { count } = this.state;
        options.rules = rules || defaultRules;
        if (onChange) {
          options.onChange = onChange;
        }
        if (defaultValue) {
          options.initialValue = defaultValue;
        }
        if (valuePropName) {
          options.valuePropName = valuePropName;
        }
        if (getValueFromEvent) {
          options.getValueFromEvent = getValueFromEvent;
        }
        otherProps = restProps || otherProps;
        const formItemLayout = layout || defaultLayout || innerDefaultFormItemLayout;
        const labelName = label || defaultLabel;
        const fieldName = name || defaultName;

        //console.log("generator: options = ", options);

        return (
          <Form.Item {...formItemLayout} label={labelName} style={ itemStyle }>
            {isPlain ?
              <span>{defaultValue}</span>
            : getFieldDecorator(fieldName, options)(
              <WrappedComponent {...defaultProps} {...otherProps} />
            )}
          </Form.Item>
        );
      }
    };
  };
}
