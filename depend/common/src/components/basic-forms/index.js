import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Form from 'antd/lib/form';
import Input from 'antd/lib/input';

import generator from './generator';
import Submit from './Submit';

@Form.create()
class BasicForm extends Component {

  static defaultProps = {
    className: '',
    defaultActiveKey: '',
    onSubmit: () => { },
  };

  static propTypes = {
    className: PropTypes.string,
    defaultActiveKey: PropTypes.string,
    onSubmit: PropTypes.func,
  };

  static childContextTypes = {
    form: PropTypes.object,
    updateActive: PropTypes.func,
  };

  state = {
    type: this.props.defaultActiveKey,
    active: {},
  };

  componentDidMount() {
    if (this.props.onRef) {
      this.props.onRef(this);
    }
  }

  getChildContext() {
    return {
      form: this.props.form,
      updateActive: (activeItem) => {
        const { type, active } = this.state;
        if (active[type]) {
          active[type].push(activeItem);
        } else {
          active[type] = [activeItem];
        }
        this.setState({
          active,
        });
      },
    };
  }

  onSwitch = (type) => {
    this.setState({
      type,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { enterNotSubmit = false } = this.props;
    if (enterNotSubmit && this.enterKeyDown) {
      this.enterKeyDown = false;
      return false;
    }

    const { active, type } = this.state;
    const activeFileds = active[type];
    this.props.form.validateFields(activeFileds, { force: true },
      (err, values) => {
        this.props.onSubmit(err, values);
      }
    );
  }
  handleEnterKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.enterKeyDown = true;
    }
  }

  render() {
    const { className, children, layout = 'horizontal' } = this.props;
    const { type } = this.state;
    const otherChildren = [];
    React.Children.forEach(children, (item) => {
      if (!item) {
        return;
      }
      otherChildren.push(item);
    });
    return (
      <div>
        <Form
          onSubmit={this.handleSubmit}
          layout={layout}
          onKeyDown={this.handleEnterKeyDown}
        >
          {
            [...children]
          }
        </Form>
      </div>
    );
  }
}

// for export
BasicForm.Submit = Submit;

BasicForm.generate = (map) => {
  const items = {};
  Object.keys(map).forEach((item) => {
    items[item] = generator({
      defaultProps: map[item].props,
      defaultRules: map[item].rules,
      defaultLayout: map[item].layout,
      defaultLabel: map[item].label,
      defaultName: map[item].name,
    })(map[item].component ? map[item].component : Input);
  });
  return items;
}

export default BasicForm;
