import React, { PureComponent } from 'react';
import { connect } from 'dva';

@connect(({ login }) => ({
  login
}))
export default class Logout extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    this.props.dispatch({
      type: 'login/logout'
    });
  }

  render() {

    return (
      <div>
        正在退出...
      </div>
    );
  }
}
