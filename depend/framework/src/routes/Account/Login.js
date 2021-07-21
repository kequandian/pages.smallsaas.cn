import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import Checkbox from 'antd/lib/checkbox';
import Alert from 'antd/lib/alert';
import Icon from 'antd/lib/icon';

import Login from '../../components/Login';
import './Login.css';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  }

  onTabChange = (type) => {
    this.setState({ type });
  }

  handleSubmit = (err, values) => {
    const { type, autoLogin } = this.state;
    if (!err) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          ...values,
          type,
          autoLogin,
        },
      });
    }
  }

  changeAutoLogin = (e) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  }

  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div className='login-main'>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
        >
          <Tab key="account" tab="账户密码登录">
            <UserName name="account" />
            <Password name="password" />
          </Tab>
          {/* <Tab key="mobile" tab="手机号登录">
            {
              login.status === 'error' &&
              login.type === 'mobile' &&
              !login.submitting &&
              this.renderMessage('验证码错误')
            }
            <Mobile name="mobile" />
            <Captcha name="captcha" />
          </Tab> */}
          <div>
            <Checkbox checked={this.state.autoLogin} onChange={this.changeAutoLogin}>自动登录</Checkbox>
            <a style={{ float: 'right' }} href="">忘记密码</a>
          </div>
          <Submit loading={submitting}>登录</Submit>
          {/* <div className='login-other'>
            <Link className='login-register' to="/oauth/register">注册账户</Link>
          </div> */}
        </Login>
      </div>
    );
  }
}
