/**
    * @author
    * @editor
    * @updated
    * @desc    产品价格的 计算、修改
    * @eg
    <productPrice>
      isfirsttimeinit = 'true'
    </productPrice>
 */


import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

/**
 * 产品价格的 计算、修改
 */
export default class productPrice extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static contextTypes = {
    modelState: PropTypes.object,
  }

  componentDidMount() {
    if(this.props.isfirsttimeinit === 'true'){
      console.log('------modelState',this.context);
    }
  }

  render() {
    const { tableDataSource } = this.state;

    return (
      <Fragment>
        <div>
          test
        </div>
      </Fragment>
    )
  }
}
