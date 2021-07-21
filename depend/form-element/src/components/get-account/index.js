/**
    * @author
    * @editor
    * @updated
    * @desc    暂且只是返回当前登陆用户
    * @eg
    <GetAccount>
      value = ''
    </GetAccount>
 */

import React, { PureComponent } from 'react';
// import { FormattedMessage } from 'react-intl';
// import Input from 'antd/lib/input';
// import message from 'antd/lib/message';

// import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';
import { getAccount, getUserId } from 'kqd-utils/lib/token';

/**
 * 暂且只是返回当前登陆用户
 */
export default class GetAccount extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || getAccount(),
      originValue: null,
    };
  }
  componentDidMount() {
    this.checkChange();
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.originValue) {
      return {
        originValue: nextProps.value,
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { originValue } = this.state;
    if (originValue !== prevState.originValue) {
      this.setState({
        value: this.props.value || getAccount(),
      });
      this.checkChange();
    }
  }
  checkChange = () => {
    const { onChange } = this.props;
    onChange(getAccount());
  }

  render() {
    const { value } = this.state;
    return (
      <div>{value}</div>
    )
  }
}
