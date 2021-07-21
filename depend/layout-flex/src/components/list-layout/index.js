/**
    * @author
    * @editor
    * @updated
    * @desc
    * @eg
    <ListLayout>
        children    //传入子组件
    </ListLayout>
 */

import React, { PureComponent } from 'react';

export default class Index extends PureComponent {

  render() {
    const { children } = this.props;
    return (
      <div>
      {
        [...children]
      }
      </div>
    )
  }
}
