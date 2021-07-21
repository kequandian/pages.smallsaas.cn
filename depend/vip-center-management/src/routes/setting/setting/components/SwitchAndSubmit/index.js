import React,{ Fragment } from 'react';
import { LRLayout } from 'kqd-layout-flex';
import { Switch, Button } from 'antd';

export default (props) => {
  function bulkChange(checked){
    const { modelStatus, switchField, requester } = props;

    if(modelStatus.currentItem && modelStatus.currentItem.items){
      const [ ...data ] = modelStatus.currentItem.items || [];
      if(checked){
        data.forEach( item => {
          item[switchField] = 1;
        });
      }else{
        data.forEach( item => {
          item[switchField] = 0;
        });
      }
      requester.save({
          grades: {
          currentItem: {
            items: data,
          },
        }
      });
    }
  }
  function formatValue(){
    const { modelStatus, switchField } = props;
    if(modelStatus.currentItem && modelStatus.currentItem.items){
      const [ ...data ] = modelStatus.currentItem.items || [];
      return data.some( item => item[switchField] === 1 );
    }else{
      return 0;
    }
  }

  const { title } = props;
  return <Fragment>
  <LRLayout rightStyle={{textAlign: 'right'}}>
    <LRLayout span={[8,16]}>
      <span>{ title }</span>
      <Switch checked={ formatValue() } onChange={ bulkChange } />
    </LRLayout>
    <Button type="primary" htmlType="submit">保存修改</Button>
  </LRLayout>
  <br />
</Fragment>
}