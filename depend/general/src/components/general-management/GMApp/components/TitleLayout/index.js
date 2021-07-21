import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TitledHeader } from 'kqd-page-header';
import Button from 'antd/lib/button';
import renderControl from '../wrapped/renderControl';

class TitleLayout extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }
  render(){
    const { title, goBack = true, goBackText = '返回', children, extra = null } = this.props;
    const router = this.props.router || this.props.history || this.context.router;
    return <TitledHeader title={ title }
            extra={ goBack ? <Button onClick={ () => router.goBack() }>{ goBackText }</Button> : extra }
          >
          { children }
    </TitledHeader>
  }
}
export default renderControl(TitleLayout);