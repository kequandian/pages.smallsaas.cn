/**
 * 用于突出其中一项的文本。
 * @parameter
 *  data <Array> 文本数据源
 *  index <Number> 需要突出显示的文本的下标
 *  [align] <String> 文本的排布方式，可选："row","col"。默认值： "row"
 */
import React, { PureComponent } from 'react';
import { HighlightText } from '../index';

export default class TestLRBLayout extends PureComponent {

  render() {
    const data = [ "test-1", "test-2" ];

    return (
      <HighlightText data={data} index={1} />
    );
  }
}
