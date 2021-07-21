/**
 * 更灵活的 flex 布局
 * @param 
 * [align] <String> 子项的对齐方式，默认 center。可选 flex-start | flex-end 等
 * @eg
 * <FlexLayout>
      <FlexItem>
        test
      </FlexItem>
      <FlexItem flex={ 1 }>
        test2
      </FlexItem>
    </FlexLayout>
 */
import React, { PureComponent } from 'react';
import FlexLayout from '../components/flex-layout';

const { FlexItem } = FlexLayout;

export default class TestFlexLayout extends PureComponent {

  render() {
    const left = <div style={{backgroundColor: '#ddd'}}>use props 'flex={ 1 }'</div>;
    const right = <div style={{backgroundColor: '#40a9ff', width: '250px'}}>width: 250px</div>;

    return (
	  <FlexLayout>
      <FlexItem flex={ 1 }>
        { left }
      </FlexItem>
      <FlexItem>
        { right }
      </FlexItem>
	  </FlexLayout>
    );
  }
}
